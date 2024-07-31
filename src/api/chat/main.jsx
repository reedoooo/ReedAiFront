import { createParser } from 'eventsource-parser';
import api from '@/lib/api';
import apiUtils from '@/lib/apiUtils';

export async function fetchMessageStream({
  sessionId,
  chatId,
  prompt,
  userId,
  clientApiKey,
  role = 'assistant',
  signal,
  file,
}) {
  let response;

  try {
    response = await api.post(
      'http://localhost:3001/api/chat/v1/stream',
      {
        sessionId,
        chatId,
        prompt,
        userId,
        clientApiKey,
        role,
        stream: true,
      },
      signal,
      file
    );
    // console.log('data', response.body);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Request aborted:', error.message);
    } else if (error instanceof Error) {
      console.error('Error reading stream data:', error.message);
    } else {
      console.error('An unexpected error occurred');
    }
    return;
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder('utf-8');

  if (response.statusText !== 'OK') {
    const err = await response.json();
    throw new Error(`Error reading stream data: ${err.error}`);
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
            controller.enqueue(text);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);
      console.log('Started reading stream');
      for await (const chunk of response.body) {
        parser.feed(decoder.decode(chunk, { stream: true }));
      }
    },
  });
}

export async function getWorkspaceByWorkspaceId(workspaceId) {
  const id = encodeURIComponent(workspaceId);
  try {
    return await apiUtils.post('/chat/workspaces/workspace', {
      workspaceId: id,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getChatSessionMessagesByMessagesIds = async messageIds => {
  try {
    return await apiUtils.post('/chat/chat/messages/session/messages', {
      messageIds,
    });
  } catch (error) {
    console.error('Error fetching messages data:', error);
    throw error;
  }
};

export const getChatSessionsByWorkspaceId = async workspaceId => {
  try {
    return await apiUtils.post('/chat/chatSessions', { workspaceId });
  } catch (error) {
    console.error(`Error fetching chat sessions: ${error.message}`);
    throw error;
  }
};

export const getChatSessionBySessionId = async sessionId => {
  try {
    return await apiUtils.post('/chat/chatSessions/session', { sessionId });
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
};

export const getChatSessionByUserId = async userId => {
  try {
    return await apiUtils.post('/chat/chatSessions/session/user', { userId });
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
};

export const getChatSessionMessagesBySessionId = async sessionId => {
  const id = encodeURIComponent(sessionId);
  try {
    return await apiUtils.post('/chat/chatSessions/session/messages', {
      sessionId: id,
    });
  } catch (error) {
    console.error('Error fetching messages data:', error);
    throw error;
  }
};

export const saveMessagesToSession = async (
  userId,
  workspaceId,
  sessionId,
  messages
) => {
  try {
    const updatedMessages = messages?.map(message => ({
      content: message.content,
      role: message.role,
    }));

    return await apiUtils.put(
      `/chat/chat_sessions/session/${encodeURIComponent(sessionId)}/messages/save`,
      {
        userId,
        workspaceId,
        sessionId,
        messages: updatedMessages,
      }
    );
  } catch (error) {
    console.error('Error saving messages:', error);
    throw error;
  }
};

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
