const { OpenAIStream } = require('utils/chatStream');
const { constants } = require('config/constants');

const { API_URL, OPENAI_API_KEY } = constants;

async function handleGetRequest(req) {
  try {
    const { inputCode, model, apiKey } = await req.json();
    const apiKeyFinal = apiKey || OPENAI_API_KEY;
    const stream = await OpenAIStream(inputCode, model, apiKeyFinal);
    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}

async function handlePostRequest(req) {
  try {
    const { inputCode, model, apiKey } = await req.json();
    const apiKeyFinal = apiKey || OPENAI_API_KEY;
    const stream = await OpenAIStream(inputCode, model, apiKeyFinal);
    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}

module.exports = {
  handleGetRequest,
  handlePostRequest,
};
