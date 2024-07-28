import { createParser } from 'eventsource-parser';
import constants from 'config/constants';
import request from 'utils/request/axios';
import { fetchDefaultChatModel } from './chat_model';

const { API_URL, OPENAI_API_KEY } = constants;
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
            controller.enqueue(text);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);
      console.log('Started reading stream');
      for await (const chunk of response.body) {
        // console.log('Received chunk:', decoder.decode(chunk));
        parser.feed(decoder.decode(chunk, { stream: true }));
      }
    },
  });
}

export async function getWorkspaceByWorkspaceId(workspaceId) {
  const id = encodeURIComponent(workspaceId);
  try {
    const response = await fetch(
      `http://localhost:3001/api/chat/workspaces/workspace`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspaceId: id,
        }),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getChatSessionMessagesByMessagesIds = async messageIds => {
  try {
    const response = await fetch(
      `${API_URL}/chat/chat_messages/session/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageIds }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} message: ${response.statusText}`
      );
    }

    const messagesData = await response.json();
    return messagesData;
  } catch (error) {
    console.error('Error fetching messages data:', error);
    throw error;
  }
};
export const getChatSessionsByWorkspaceId = async workspaceId => {
  const response = await fetch(`${API_URL}/chat/chatSessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ workspaceId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (!data.chatSessions) {
    throw new Error(data.error);
  }

  return data.chatSessions;
};

export const getChatSessionBySessionId = async sessionId => {
  try {
    const response = await fetch(`${API_URL}/chat/chatSessions/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sessionData = await response.json();
    return sessionData;
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
};
export const getChatSessionByUserId = async sessionId => {
  try {
    const response = await fetch(`${API_URL}/chat/chatSessions/session/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sessionData = await response.json();
    return sessionData;
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
};
export const getChatSessionMessagesBySessionId = async sessionId => {
  const id = encodeURIComponent(sessionId);
  try {
    const response = await fetch(
      `${API_URL}/chat/chatSessions/session/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: id,
        }),
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(
        `HTTP error! status: ${response.status} message: ${response.statusText}`
      );
    }

    const messagesData = await response.json();
    return messagesData;
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
  console.log('ID', sessionId);
  const id = encodeURIComponent(sessionId);
  try {
    const updatedMessages = messages?.map(message => ({
      content: message.content,
      role: message.role,
    }));
    const body = {
      sessionId,
      messages,
      updatedMessages,
    };
    const response = await fetch(
      `/api/chat/chat_sessions/session/${id}/messages/save`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
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
