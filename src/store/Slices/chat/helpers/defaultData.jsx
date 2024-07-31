import mongoose from 'mongoose';

// export const defaultPromptList = [
export function defaultPromptList() {
  return [
    {
      userId: new mongoose.Types.ObjectId().toString(),
      folderId: new mongoose.Types.ObjectId().toString(),
      name: 'React Counter Component',
      content: 'Write the code for a React component with a stateful counter',
      key: 'React Counter Component',
      value: 'Write the code for a React component with a stateful counter',
      sharing: 'private',
      createdAt: new Date().toISOString(),
      metadata: {
        label: 'Component Name',
        text: 'CounterComponent',
        createdBy: 'John Doe',
        description: 'A component with a stateful counter',
        type: 'React',
        style: 'functional',
        tags: ['sample', 'default'], // Tags for categorization
        props: {
          initialCount: 0,
        },
      },
    },
    {
      userId: new mongoose.Types.ObjectId().toString(),
      folderId: new mongoose.Types.ObjectId().toString(),
      name: 'Express MongoDB API',
      content: 'Write the code for a RESTful API with Express and MongoDB',
      key: 'Express MongoDB API',
      value: 'Write the code for a RESTful API with Express and MongoDB',
      sharing: 'private',
      promptText: 'Create a RESTful API with Express and MongoDB',
      createdAt: new Date().toISOString(),
      metadata: {
        label: 'API Name',
        text: 'UserAPI',
        createdBy: 'Jane Smith',
        description: 'An API for managing users with Express and MongoDB',
        type: 'API',
        style: 'functional',
        tags: ['sample', 'default'], // Tags for categorization
        props: {
          routes: [
            'GET /users',
            'POST /users',
            'PUT /users/:id',
            'DELETE /users/:id',
          ],
        },
      },
    },
    {
      userId: new mongoose.Types.ObjectId().toString(),
      folderId: new mongoose.Types.ObjectId().toString(),
      name: 'Redux Authentication Store',
      content:
        'Generate code for a Redux store with slices for managing user authentication',
      key: 'Redux Authentication Store',
      value:
        'Generate code for a Redux store with slices for managing user authentication',
      sharing: 'private',
      promptText:
        'Create a Redux store with slices for managing user authentication',
      createdAt: new Date().toISOString(),
      metadata: {
        label: 'Store Name',
        text: 'AuthStore',
        createdBy: 'Sam Wilson',
        description:
          'A Redux store with slices for managing user authentication',
        type: 'Redux',
        style: 'functional',
        tags: ['sample', 'default'], // Tags for categorization
        props: {
          slices: ['auth', 'user'],
          actions: ['login', 'logout', 'setUser'],
        },
      },
    },
  ];
}
export function defaultUserSessionData() {
  return {
    user: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      dateJoined: new Date().toISOString(),
      isActive: false,
      auth: {
        password: '', // Ideally, hashed if used
        management: {},
        chatModelPrivileges: [],
        lastLogin: new Date().toISOString(),
        isSuperuser: false,
      },
      authSession: {
        token: '',
        tokenType: '',
        accessToken: '',
        refreshToken: '',
      },
      profile: {
        stats: {
          totalMessages: 0,
          totalTokenCount: 0,
          totalMessages3Days: 0,
          totalTokenCount3Days: 0,
        },
        location: {
          city: '',
          state: '',
          country: '',
        },
        social: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          github: '',
          website: '',
        },
        dashboard: {
          projects: {},
        },
        settings: {
          user: {
            theme: 'light',
            fontSize: 16,
            language: 'en',
            timezone: 'Seattle',
          },
          chat: {
            presets: {
              contextLength: 0,
              description: '',
              embeddingsProvider: '',
              folderId: '',
              includeProfileContext: false,
              includeWorkspaceInstructions: false,
              model: '',
              name: '',
              prompt: '',
              sharing: '',
              temperature: 0,
              userId: '',
            },
          },
        },
        img: 'path/to/default/image',
        imagePath: 'path/to/default/image',
        profileImages: [],
        selectedProfileImage: 'path/to/default/image',
        filename: 'avatar1.png',
        bio: '',
        displayName: '',
        hasOnboarded: false,
        identity: {
          identityData: {
            email: '',
            emailVerified: false,
            phoneVerified: false,
            sub: '',
          },
          identityId: '',
          userId: '',
          provider: '',
          lastSignInAt: null,
        },
        openai: {
          apiKey: '',
          organizationId: '',
          apiVersion: '',
          projects: [],
        },
      },
      openai: {
        apiKey: '',
        organizationId: '',
        apiVersion: '',
        projects: [],
      },
      appMetadata: {
        provider: '',
        providers: [],
      },
      workspaces: [
        {
          chatSessions: [],
          folders: [],
          name: 'Default Workspace',
          description: 'Default workspace for the user',
          imagePath: '',
          active: false,
        },
      ],
      assistants: [
        {
          name: 'ChatBot Assistant',
          instructions: 'Provide helpful responses to user queries.',
          description: 'An assistant designed to help with general questions.',
          model: 'gpt-3.5-turbo',
          tools: [
            {
              type: 'text-generator',
            },
          ],
          tool_resources: {
            code_interpreter: {
              file_ids: [],
            },
          },
        },
      ],
      prompts: [
        {
          name: 'React Counter Component',
          content:
            'Write the code for a React component with a stateful counter',
          key: 'React Counter Component',
          value: 'Write the code for a React component with a stateful counter',
          sharing: 'private',
          metadata: {
            label: 'Component Name',
            text: 'CounterComponent',
            createdBy: 'John Doe',
            description: 'A component with a stateful counter',
            type: 'React',
            style: 'functional',
            tags: ['sample', 'default'], // Tags for categorization
            props: {
              initialCount: 0,
            },
          },
        },
      ],
      chatSessions: [
        {
          stats: {
            tokenUsage: 0,
            messageCount: 0,
          },
          name: 'First Chat',
          topic: 'Getting Started',
          model: 'gpt-4-turbo-preview',
          prompt: "Let's start our first conversation.",
          active: true,
          activeSessionId: null,
          settings: {
            maxTokens: 500,
            temperature: 0.7,
            model: 'gpt-4-turbo-preview',
            topP: 1,
            n: 1,
            debug: false,
            summarizeMode: false,
          },
          messages: [],
          tuning: {
            debug: false,
            summary: '',
            summarizeMode: false,
          },
          __v: 0,
        },
      ],
      folders: [],
      files: [
        {
          metadata: {
            fileSize: 0,
            fileType: '',
            lastModified: new Date().toISOString(),
          },
          name: 'Deep Learning Research.pdf',
          description: 'A comprehensive paper on deep learning.',
          filePath: '/public/files/default.pdf',
          data: null,
          size: 2048,
          tokens: 3500,
          type: 'pdf',
          sharing: 'private',
          mimeType: 'application/pdf',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        },
      ],
      collections: [
        {
          name: 'Default Collection',
          description: 'This is the default collection',
          sharing: 'private',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        },
      ],
      models: [
        {
          apiKey: '',
          baseUrl: 'https://api.openai.com/v1',
          modelId: 'gpt-4-turbo-preview',
          contextLength: 4000,
          name: 'Default Model',
          description: 'This is the default model',
          isDefault: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        },
      ],
      tools: [
        {
          name: 'Default Tool',
          description: 'This is the default tool',
          url: 'http://example.com',
          sharing: 'private',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        },
      ],
      presets: [
        {
          name: 'Default Preset',
          description: 'Default preset for new users',
          contextLength: 4000,
          embeddingsProvider: 'openai',
          includeProfileContext: true,
          includeWorkspaceInstructions: true,
          model: 'gpt-4-turbo-preview',
          prompt: 'Default prompt',
          sharing: 'private',
          temperature: 0.7,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 1,
    },
    userId: null,
    token: '',
    profileImage: 'http://localhost:3001/static/files/avatar1.png',
    userInfo: {
      name: '',
      email: '',
      profileImage: 'http://localhost:3001/static/files/avatar1.png',
    },
  };
}
export function defaultWorkspaceData() {
  return {
    workspaces: [],
    selectedWorkspace: null,
    homeWorkSpace: null,
    workspaceImages: [],
    activeWorkspace: {
      _id: null,
      userId: null,
      name: '',
      description: '',
      image: null,
      chatSessions: [],
      folders: [],
      activeChatSession: null,
      systemPrompt: '',
    },
  };
}
export function defaultChatSessionData() {
  return {
    apiKey: '',
    chatId: '',
    sessionId: '',
    activeSession: {
      sessionId: '',
      topic: '',
      messages: [],
    },
  };
}
