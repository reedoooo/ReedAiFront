import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useContentTypeCheck from '../util/useContentTypeCheck';

function parseCode(response) {
  const textCode = response.match(/```([\s\S]+?)```/g);
  if (!textCode) return response;

  return textCode
    .map(codeBlock => {
      // Remove the ``` and trim the content
      const cleanCode = codeBlock.replace(/```/g, '').trim();
      // Add proper indentation
      return cleanCode
        .split('\n')
        .map(line => `  ${line}`)
        .join('\n');
    })
    .join('\n\n');
}
export const useFetchChatStream = () => {
  const [data, setData] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { checkType } = useContentTypeCheck();
  const fetchChatStream = useCallback(
    async ({
      sessionId,
      chatId,
      regenerate,
      prompt,
      userId,
      clientApiKey,
      role,
    }) => {
      setLoading(true);
      setError(null);
      let partialMessage = '';
      const cleanText = text =>
        text.replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim();

      try {
        const response = await fetch('http://localhost:3001/api/chat/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            chatId,
            regenerate,
            prompt,
            userId,
            clientApiKey,
            role,
            content: prompt,
          }),
        });

        if (!response.body) {
          throw new Error('ReadableStream not yet supported in this browser.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const processText = async ({ done, value }) => {
          if (done) {
            setData(prevData => ({
              ...prevData,
              complete: true,
            }));
            setLoading(false);
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          console.log('chunk:', chunk);
          const lines = chunk.split('\n');
          // console.log('lines:', lines);
          for (const line of lines) {
            if (line.trim() && line.startsWith('data:')) {
              const jsonString = line.slice(5).trim();
              // console.log('jsonString:', jsonString);
              if (jsonString === '[DONE]') {
                setLoading(false);
                return;
              }

              // try {
              //   const data = JSON.parse(jsonString);
              //   console.log('data:', data);
              //   const content = data.choices?.[0]?.delta?.content.trim();
              //   partialMessage += content;

              //   setData(prevData => ({
              //     ...prevData,
              //     choices: [
              //       {
              //         delta: {
              //           contentType: checkType(partialMessage),
              //           content: partialMessage,
              //           role: 'assistant',
              //           id: uuidv4(), // Assign a unique id
              //           complete: false,
              //         },
              //       },
              //     ],
              //   }));
              try {
                const parsedData = JSON.parse(jsonString);
                // console.log('parsedData:', parsedData);
                let content = cleanText(parsedData.content);
                // parsedData.content?.trim();
                // Integrate parseCode function
                content = parseCode(content);
                console.log('[CONTENT: cleanText and parseCode]', content);
                if (content) {
                  partialMessage += (partialMessage ? ' ' : '') + content;
                  console.log('[CONTENT: partialMessage]', partialMessage);
                  setData(prevData => ({
                    ...prevData,
                    choices: [
                      {
                        delta: {
                          contentType: checkType(partialMessage),
                          content: partialMessage,
                          role: 'assistant',
                          id: uuidv4(), // Assign a unique id
                          complete: false,
                        },
                      },
                    ],
                  }));
                }
              } catch (e) {
                console.error('Error parsing chunk:', e);
                setError(e);
              }
            }
          }

          reader.read().then(processText);
        };

        reader.read().then(processText);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Fetch error:', error);
      }
    },
    [checkType]
  );

  return {
    data,
    loading,
    error,
    imageLoading,
    imageData,
    setImageLoading,
    setImageData,
    setLoading,
    setError,
    setData,
    fetchChatStream,
  };
};

export default useFetchChatStream;
