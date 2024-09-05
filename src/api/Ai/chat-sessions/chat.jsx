import { createParser } from 'eventsource-parser';
import { apiUtils } from '@/lib/apiUtils';

export const chatApi = {
  getStream: async function fetchMessageStream({
    sessionId,
    workspaceId,
    regenerate,
    prompt,
    userId,
    clientApiKey,
    role = 'assistant',
    signal,
    count,
    // filePath,
  }) {
    let response;

    try {
      response = await fetch('http://localhost:3001/api/chat/v1/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          sessionId,
          workspaceId,
          regenerate,
          prompt,
          userId,
          clientApiKey,
          role,
          count,
        }),
        signal,
      });
      // response = await fetch(
      //   'http://localhost:3001/api/chat/v1/stream',
      //   {
      //     sessionId,
      //     chatId,
      //     prompt,
      //     userId,
      //     clientApiKey,
      //     role,
      //     stream: true,
      //   },
      //   signal
      //   // filePath
      // );
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
              try {
                controller.close();
              } catch (error) {
                console.warn('Stream already closed:', error);
              }
              return;
            }
            try {
              const json = JSON.parse(data);
              const text = json.content;
              const queue = encoder.encode(text);
              // console.log('received queue', queue);
              controller.enqueue(queue);
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
  },

  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/sessions/users');
      return data;
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      throw error;
    }
  },

  getById: async sessionId => {
    try {
      console.log('FETCHING chat session with id ${sessionId}:', sessionId);
      const data = await apiUtils.get(`/chat/sessions/${sessionId}`);
      console.log('Chat session fetched:', data);
      return data;
    } catch (error) {
      console.error(`Error fetching chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  create: async sessionData => {
    try {
      const data = await apiUtils.post('/chat/sessions/create', sessionData);
      return data;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  },

  update: async (sessionId, sessionData) => {
    try {
      const data = await apiUtils.put(
        `/chat/sessions/${sessionId}`,
        sessionData,
        {
          'Content-Type': 'application/json',
        }
      );
      return data;
    } catch (error) {
      console.error(`Error updating chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  updateMessages: async (sessionId, sessionData) => {
    try {
      const data = await apiUtils.put(
        `/chat/sessions/${sessionId}/messages`,
        sessionData,
        {
          'Content-Type': 'application/json',
        }
      );
      return data;
    } catch (error) {
      console.error(`Error updating chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  getMessages: async props => {
    const { sessionId: id } = props;
    console.log('GIVEN ID:', id);
    try {
      const sessionId = JSON.parse(sessionStorage.getItem('sessionId'));
      console.log(
        'FETCHING messages for chat session with id ${newSessionId}:',
        sessionId
      );
      const data = await apiUtils.get(`/chat/sessions/${sessionId}/messages`);
      return data;
    } catch (error) {
      console.error(`Error fetching messages for chat session with id:`, error);
      throw error;
    }
  },

  delete: async sessionId => {
    try {
      const data = await apiUtils.delete(`/chat/sessions/${sessionId}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  rename: async (sessionId, name) => {
    try {
      const data = await apiUtils.put(
        `/chat/sessions/session/${sessionId}/topic`,
        { topic: name }
      );
      return data;
    } catch (error) {
      console.error(`Error renaming chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  saveMessage: async (sessionId, messages) => {
    try {
      const data = await apiUtils.post(
        `/chat/sessions/${sessionId}/messages/save`,
        {
          messages: messages.map(message => ({
            content: message.content,
            role: message.role,
          })),
        },
        {
          'Content-Type': 'application/json',
        }
      );
      return data;
    } catch (error) {
      console.error(
        `Error saving message for chat session with id ${sessionId}:`,
        error
      );
      throw error;
    }
  },

  clearMessages: async sessionId => {
    try {
      const data = await apiUtils.delete(
        `/chat/chat/messages/sessions/${sessionId}`
      );
      return data;
    } catch (error) {
      console.error(
        `Error clearing messages for chat session with id ${sessionId}:`,
        error
      );
      throw error;
    }
  },
};

export default chatApi;
