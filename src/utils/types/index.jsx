/**
 * @namespace Chat
 */

/**
 * @typedef {Object} Chat.Message
 * @property {string} uuid
 * @property {string} dateTime
 * @property {string} text
 * @property {boolean} [inversion]
 * @property {boolean} [error]
 * @property {boolean} [loading]
 * @property {boolean} [isPrompt]
 * @property {boolean} [isPin]
 */
const defaultMessage = {
  uuid: '',
  dateTime: '',
  text: '',
  inversion: false,
  error: false,
  loading: false,
  isPrompt: false,
  isPin: false,
};

/**
 * @typedef {Object} Chat.Session
 * @property {string} uuid
 * @property {string} title
 * @property {boolean} isEdit
 * @property {number} [maxLength]
 * @property {number} [temperature]
 * @property {string} [model]
 * @property {number} [topP]
 * @property {number} [n]
 * @property {number} [maxTokens]
 * @property {boolean} [debug]
 * @property {boolean} [summarizeMode]
 */
const defaultSession = {
  uuid: '',
  title: '',
  isEdit: false,
  maxLength: undefined,
  temperature: undefined,
  model: undefined,
  topP: undefined,
  n: undefined,
  maxTokens: undefined,
  debug: false,
  summarizeMode: false,
};

/**
 * @typedef {Object} Chat.ChatState
 * @property {string|null} active
 * @property {Chat.Session[]} history
 * @property {Object.<string, Chat.Message[]>} chat
 */
const defaultChatState = {
  active: null,
  history: [],
  chat: {},
};

/**
 * @typedef {Object} Chat.ConversationRequest
 * @property {string} [uuid]
 * @property {string} [conversationId]
 * @property {string} [parentMessageId]
 */
const defaultConversationRequest = {
  uuid: undefined,
  conversationId: undefined,
  parentMessageId: undefined,
};

/**
 * @typedef {Object} Chat.ConversationResponse
 * @property {string} conversationId
 * @property {Object} detail
 * @property {Object[]} detail.choices
 * @property {string} detail.choices.finish_reason
 * @property {number} detail.choices.index
 * @property {any} detail.choices.logprobs
 * @property {string} detail.choices.text
 * @property {number} detail.created
 * @property {string} detail.id
 * @property {string} detail.model
 * @property {string} detail.object
 * @property {Object} detail.usage
 * @property {number} detail.usage.completion_tokens
 * @property {number} detail.usage.prompt_tokens
 * @property {number} detail.usage.total_tokens
 * @property {string} id
 * @property {string} parentMessageId
 * @property {string} role
 * @property {string} text
 */
const defaultConversationResponse = {
  conversationId: '',
  detail: {
    choices: [
      {
        finish_reason: '',
        index: 0,
        logprobs: null,
        text: '',
      },
    ],
    created: 0,
    id: '',
    model: '',
    object: '',
    usage: {
      completion_tokens: 0,
      prompt_tokens: 0,
      total_tokens: 0,
    },
  },
  id: '',
  parentMessageId: '',
  role: '',
  text: '',
};

/**
 * @typedef {Object} Chat.ChatModel
 * @property {number} [id]
 * @property {string} apiAuthHeader
 * @property {string} apiAuthKey
 * @property {boolean} isDefault
 * @property {string} label
 * @property {string} name
 * @property {string} url
 * @property {boolean} enablePerModeRatelimit
 * @property {string} [maxToken]
 * @property {string} [defaultToken]
 * @property {string} [orderNumber]
 * @property {number} [httpTimeOut]
 */
const defaultChatModel = {
  id: undefined,
  apiAuthHeader: '',
  apiAuthKey: '',
  isDefault: false,
  label: '',
  name: '',
  url: '',
  enablePerModeRatelimit: false,
  maxToken: undefined,
  defaultToken: undefined,
  orderNumber: undefined,
  httpTimeOut: undefined,
};

export {
  defaultMessage,
  defaultSession,
  defaultChatState,
  defaultConversationRequest,
  defaultConversationResponse,
  defaultChatModel,
};

/**
 * @typedef {Object} Announcement
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {boolean} read
 * @property {string} link
 * @property {string} date
 */
const announcement = {
  id: '',
  title: '',
  content: '',
  read: false,
  link: '',
  date: '',
};

/**
 * @typedef {Object} AssistantImage
 * @property {string} assistantId
 * @property {string} path
 * @property {*} base64 - base64 image
 * @property {string} url
 */
const assistantImage = {
  assistantId: '',
  path: '',
  base64: null,
  url: '',
};

/**
 * @typedef {Object} AssistantRetrievalItem
 * @property {string} id
 * @property {string} name
 * @property {string} type
 */
const assistantRetrievalItem = {
  id: '',
  name: '',
  type: '',
};

/**
 * @typedef {Object} ChatFile
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {File|null} file
 */
const chatFile = {
  id: '',
  name: '',
  type: '',
  file: null,
};

/**
 * @typedef {Object} ChatMessage
 * @property {Object} message
 * @property {string[]} fileItems
 */
const chatMessage = {
  message: {},
  fileItems: [],
};

/**
 * @typedef {Object} ChatSettings
 * @property {string} model
 * @property {string} prompt
 * @property {number} temperature
 * @property {number} contextLength
 * @property {boolean} includeProfileContext
 * @property {boolean} includeWorkspaceInstructions
 * @property {"openai" | "local"} embeddingsProvider
 */
const chatSettings = {
  model: '',
  prompt: '',
  temperature: 0,
  contextLength: 0,
  includeProfileContext: false,
  includeWorkspaceInstructions: false,
  embeddingsProvider: 'openai',
};

/**
 * @typedef {Object} ChatPayload
 * @property {ChatSettings} chatSettings
 * @property {string} workspaceInstructions
 * @property {ChatMessage[]} chatMessages
 * @property {Object|null} assistant
 * @property {Object[]} messageFileItems
 * @property {Object[]} chatFileItems
 */
const chatPayload = {
  chatSettings: chatSettings,
  workspaceInstructions: '',
  chatMessages: [],
  assistant: null,
  messageFileItems: [],
  chatFileItems: [],
};

/**
 * @typedef {Object} ChatAPIPayload
 * @property {ChatSettings} chatSettings
 * @property {Object[]} messages
 */
const chatAPIPayload = {
  chatSettings: chatSettings,
  messages: [],
};

/**
 * @typedef {Object} CollectionFile
 * @property {string} id
 * @property {string} name
 * @property {string} type
 */
const collectionFile = {
  id: '',
  name: '',
  type: '',
};

/**
 * @typedef {"chats" | "presets" | "prompts" | "files" | "collections" | "assistants" | "tools" | "models"} ContentType
 */
const contentType = [
  'chats',
  'presets',
  'prompts',
  'files',
  'collections',
  'assistants',
  'tools',
  'models',
];

/**
 * @typedef {Object} ErrorResponse
 * @property {Object} error
 * @property {number} error.code
 * @property {string} error.message
 */
const errorResponse = {
  error: {
    code: 500,
    message: 'Internal Server Error',
  },
};

/**
 * @typedef {Object} FileItemChunk
 * @property {string} content
 * @property {number} tokens
 */
const fileItemChunk = {
  content: '',
  tokens: 0,
};

/**
 * @typedef {"OPENAI_API_KEY"} EnvKey
 */
const envKey = ['OPENAI_API_KEY'];

/**
 * @typedef {"gpt-4o" | "gpt-4-turbo-preview" | "gpt-4-vision-preview" | "gpt-4" | "gpt-3.5-turbo"} LLMID
 */
const llmId = [
  'gpt-4o',
  'gpt-4-turbo-preview',
  'gpt-4-vision-preview',
  'gpt-4',
  'gpt-3.5-turbo',
];

/**
 * @typedef {Object} LLM
 * @property {LLMID} modelId
 * @property {string} modelName
 * @property {string} provider
 * @property {string} hostedId
 * @property {string} platformLink
 * @property {boolean} imageInput
 * @property {Object} [pricing]
 * @property {string} [pricing.currency]
 * @property {string} [pricing.unit]
 * @property {number} [pricing.inputCost]
 * @property {number} [pricing.outputCost]
 */
const llm = {
  modelId: '',
  modelName: '',
  provider: '',
  hostedId: '',
  platformLink: '',
  imageInput: false,
  pricing: {
    currency: '',
    unit: '',
    inputCost: 0,
    outputCost: 0,
  },
};

/**
 * @typedef {LLM} OpenRouterLLM
 * @property {number} maxContext
 */
const openRouterLLM = {
  ...llm,
  maxContext: 0,
};

/**
 * @typedef {Object} MessageImage
 * @property {string} messageId
 * @property {string} path
 * @property {*} base64 - base64 image
 * @property {string} url
 * @property {File|null} file
 */
const messageImage = {
  messageId: '',
  path: '',
  base64: null,
  url: '',
  file: null,
};

/**
 * @typedef {"openai"} ModelProvider
 */
const modelProvider = ['openai'];

/**
 * @typedef {"private" | "public" | "unlisted"} Sharing
 */
const sharing = ['private', 'public', 'unlisted'];

/**
 * @typedef {Array<Object>} DataListType
 */
const dataListType = [
  [], // Assuming Tables<"collections"> is an array of objects
  [], // Assuming Tables<"chats"> is an array of objects
  [], // Assuming Tables<"presets"> is an array of objects
  [], // Assuming Tables<"prompts"> is an array of objects
  [], // Assuming Tables<"files"> is an array of objects
  [], // Assuming Tables<"assistants"> is an array of objects
  [], // Assuming Tables<"tools"> is an array of objects
  [], // Assuming Tables<"models"> is an array of objects
];
const dataList = {
  collections: [],
  chats: [],
  presets: [],
  prompts: [],
  files: [],
  assistants: [],
  tools: [],
  models: [],
};

/**
 * @typedef {Object} DataItemType
 * @property {Object} collections
 * @property {Object} chats
 * @property {Object} presets
 * @property {Object} prompts
 * @property {Object} files
 * @property {Object} assistants
 * @property {Object} tools
 * @property {Object} models
 */
const dataItemType = {
  collections: {},
  chats: {},
  presets: {},
  prompts: {},
  files: {},
  assistants: {},
  tools: {},
  models: {},
};

/**
 * @enum {string}
 */
const VALID_ENV_KEYS = {
  OPENAI_API_KEY: 'OPENAI_API_KEY',
  ANTHROPIC_API_KEY: 'ANTHROPIC_API_KEY',
  GOOGLE_GEMINI_API_KEY: 'GOOGLE_GEMINI_API_KEY',
  MISTRAL_API_KEY: 'MISTRAL_API_KEY',
  GROQ_API_KEY: 'GROQ_API_KEY',
  PERPLEXITY_API_KEY: 'PERPLEXITY_API_KEY',
  AZURE_OPENAI_API_KEY: 'AZURE_OPENAI_API_KEY',
  OPENROUTER_API_KEY: 'OPENROUTER_API_KEY',
  OPENAI_ORGANIZATION_ID: 'OPENAI_ORGANIZATION_ID',
  AZURE_OPENAI_ENDPOINT: 'AZURE_OPENAI_ENDPOINT',
  AZURE_GPT_35_TURBO_NAME: 'AZURE_GPT_35_TURBO_NAME',
  AZURE_GPT_45_VISION_NAME: 'AZURE_GPT_45_VISION_NAME',
  AZURE_GPT_45_TURBO_NAME: 'AZURE_GPT_45_TURBO_NAME',
  AZURE_EMBEDDINGS_NAME: 'AZURE_EMBEDDINGS_NAME',
};

/**
 * @typedef {Object} WorkspaceImage
 * @property {string} workspaceId
 * @property {string} path
 * @property {*} base64 - base64 image
 * @property {string} url
 */
const workspaceImage = {
  workspaceId: '',
  path: '',
  base64: null,
  url: '',
};

export {
  announcement,
  assistantImage,
  assistantRetrievalItem,
  chatFile,
  chatMessage,
  chatSettings,
  chatPayload,
  chatAPIPayload,
  collectionFile,
  contentType,
  errorResponse,
  fileItemChunk,
  envKey,
  llmId,
  llm,
  openRouterLLM,
  messageImage,
  modelProvider,
  sharing,
  dataListType,
  dataItemType,
  VALID_ENV_KEYS,
  workspaceImage,
};

// export {
//   announcement,
//   assistantImage,
//   assistantRetrievalItem,
//   chatFile,
//   chatMessage,
//   chatSettings,
//   chatPayload,
//   chatAPIPayload,
//   collectionFile,
//   contentType,
//   errorResponse,
//   fileItemChunk,
//   envKey,
//   llmId,
//   llm,
//   openRouterLLM,
//   messageImage,
//   modelProvider,
//   sharing,
//   dataListType,
//   dataItemType,
//   VALID_ENV_KEYS,
//   workspaceImage,
// };
