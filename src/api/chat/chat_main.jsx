import { createParser } from 'eventsource-parser';
import request from 'utils/request/axios';

export async function fetchMessageStream({
  sessionId,
  chatId,
  prompt,
  userId,
  clientApiKey,
  role = 'assistant',
  signal,
}) {
  let response;

  try {
    response = await fetch('http://localhost:3001/api/chat/v1/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        chatId,
        prompt,
        userId,
        clientApiKey,
        role,
        stream: true,
      }),
      signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Request aborted:', error.message);
    } else if (error instanceof Error) {
      console.error('Error reading stream response:', error.message);
    } else {
      console.error('An unexpected error occurred');
    }
    return;
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder('utf-8');

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Error reading stream response: ${err.error}`);
  }

  if (signal.aborted) {
    console.log('Request aborted');
    return; // Early return if the fetch was aborted
  }

  if (response.status !== 200) {
    const result = await response.text();
    throw new Error(`OpenAI API returned an error: ${result}`);
  }
  // let buffer = '';

  return new ReadableStream({
    async start(controller) {
      const onParse = event => {
        if (event.type === 'event') {
          const data = event.data;
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.content;
            console.log('Received text:', text);
            controller.enqueue(text);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);
      console.log('Started reading stream');
      for await (const chunk of response.body) {
        console.log('Received chunk:', decoder.decode(chunk));
        parser.feed(decoder.decode(chunk, { stream: true }));
      }
    },
  });
}
// export async function newEventSource({
//   sessionId,
//   chatId,
//   regenerate,
//   prompt,
//   userId,
//   clientApiKey,
//   role = 'assistant',
//   signal,
// }) {
//   const url = new URL('http://localhost:3001/api/chat/v1/stream');
//   const params = {
//     sessionId,
//     chatId,
//     regenerate,
//     prompt,
//     userId,
//     clientApiKey,
//     role,
//     signal,
//   };
//   Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
//   const eventSource = new EventSource(url.toString(), {
//     withCredentials: true,
//   });
//   return eventSource;
// }

export async function getWorkspaceByWorkspaceId(workspaceId) {
  const id = encodeURIComponent(workspaceId);
  try {
    const response = await fetch(
      `http://localhost:3001/api/chat/workspaces/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
