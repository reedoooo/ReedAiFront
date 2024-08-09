export const DEFAULT_APP_DATA = {
  PROMPT: {
    name: 'chatGptPromptGenerator',
    content:
      'I want you to act as a ChatGPT prompt generator,\nI will send a topic, you have to generate a ChatGPT prompt based on the content of the topic,\nthe prompt should start with "I want you to act as ", and guess what I might do,\nTopic: {topic}\nand expand the prompt accordingly Describe the content to make it useful.\nTags: ChatGPT, Prompt, Generator\nStatus: New\nRating: Not Rated',
    description: '',
    rating: 5,
    role: 'assistant',
    tags: ['ChatGPT', 'Prompt', 'Generator'],
  },
  FILE: {
    name: 'fileUploader',
    data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgA',
    type: 'image',
    originalFileType: 'image/png',
    size: '30.0 KB',
  },
  ASSISTANT: {},
  PRESET: {},
  TOOLS: {
    name: 'summarize_messages',
    description: 'Summarize chat messages',
    schema: `summarize_messages: {
			parameters: {
				type: 'object',
				properties: {
					summary: {
						type: 'string',
						description: 'A concise summary of the chat messages',
					},
				},
				required: ['summary'],
			},
		}`,
  },
  MODEL: {
    model: 'GPT-4o',
    modelId: 'gpt-4o',
    platformLink: 'https://platform.openai.com/docs/overview',
    provider: 'openai',
    imageInput: true,
    config: {
      maxTokens: 1000,
      temperature: 0.7,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      stop: ['\n'],
    },
  },
  FOLDER: {
    name: 'Most Used Prompts',
    description: 'Most used prompts',
    files: ['chatGptPromptGenerator.txt', 'fileUploader.png'],
  },
};

export default DEFAULT_APP_DATA;
