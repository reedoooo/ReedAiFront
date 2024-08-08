import axios from 'axios';
import { createParser } from 'eventsource-parser';
import api from '@/lib/api';

export const completions = {
  getStream: async function fetchMessageStream({
    sessionId,
    workspaceId,
    regenerate,
    prompt,
    userId,
    clientApiKey,
    role = 'assistant',
    signal,
    // filePath,
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
          workspaceId,
          regenerate,
          prompt,
          userId,
          clientApiKey,
          role,
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
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const text = json.content;
              const queue = encoder.encode(text);
              console.log('received queue', queue);
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
};
// let response;

// try {
//   response = await fetch(
//     'http://localhost:3001/api/chat/v1/stream',
//     {
//       sessionId,
//       chatId,
//       prompt,
//       userId,
//       clientApiKey,
//       role,
//       stream: true,
//     },
//     { signal }
//     // filePath,
//   );
//   console.log('data', response);
// } catch (error) {
//   if (error instanceof Error && error.name === 'AbortError') {
//     console.log('Request aborted:', error.message);
//   } else if (error instanceof Error) {
//     console.error('Error reading stream data:', error.message);
//   } else {
//     console.error('An unexpected error occurred');
//   }
//   return;
// }
// const encoder = new TextEncoder();
// const decoder = new TextDecoder('utf-8');

// if (response.statusText !== 'OK') {
//   const err = await response.json();
//   throw new Error(`Error reading stream data: ${err.error}`);
// }

// if (signal.aborted) {
//   console.log('Request aborted');
//   return; // Early return if the fetch was aborted
// }

// if (response.status !== 200) {
//   const result = await response.text();
//   throw new Error(`OpenAI API returned an error: ${result}`);
// }

// if (!response.data || typeof response.data.getReader !== 'function') {
//   throw new Error('Response body is not a valid ReadableStream');
// }
// return new ReadableStream({
//   async start(controller) {
//     const onParse = event => {
//       if (event.type === 'event') {
//         const data = event.data;
//         if (data === '[DONE]') {
//           controller.close();
//           return;
//         }
//         try {
//           const json = JSON.parse(data);
//           const text = json.content;
//           controller.enqueue(text);
//         } catch (e) {
//           controller.error(e);
//         }
//       }
//     };

//     const parser = createParser(onParse);
//     console.log('Started reading stream');
//     try {
//       for await (const chunk of stream) {
//         parser.feed(decoder.decode(chunk, { stream: true }));
//       }
//     } catch (e) {
//       controller.error(e);
//     }
//   },
// });
