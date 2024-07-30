const endent = require('endent');
const { createParser } = require('eventsource-parser');
const { default: constants } = require('config/constants');
const { API_URL, OPENAI_API_KEY } = constants;

function createPrompt(inputCode) {
  const data = inputCode => {
    return endent`${inputCode}`;
  };
  if (inputCode) {
    return data(inputCode);
  }
}

async function OpenAIStream(inputCode, model, key) {
  const prompt = createPrompt(inputCode);
  const system = {
    role: 'system',
    content: prompt,
  };
  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${decoder.decode(result?.value) || statusText}`
    );
  }

  const stream = new ReadableStream({
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
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };
      const parser = createParser(onParse);
      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}

module.exports = { createPrompt, OpenAIStream };
