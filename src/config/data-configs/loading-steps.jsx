export const loadingSteps = [
  {
    title: 'User Setup',
    steps: [
      { label: 'Checking for active user', completed: false },
      { label: 'Setting user profile', completed: false },
    ],
  },
  {
    title: 'Workspace Setup',
    steps: [
      { label: 'Setting up workspaces', completed: false },
      { label: 'Checking for selected workspace', completed: false },
      { label: 'Setting up assistants', completed: false },
    ],
  },
  {
    title: 'Data Loading',
    steps: [
      { label: 'Setting up collections', completed: false },
      { label: 'Setting workspace folder', completed: false },
      { label: 'Setting workspace files', completed: false },
      { label: 'Setting workspace prompt', completed: false },
      { label: 'Setting tools', completed: false },
    ],
  },
  {
    title: 'Chat Setup',
    steps: [
      { label: 'Checking for active user chat session', completed: false },
      { label: 'Setting active user chat session', completed: false },
      { label: 'Setting chat session messages', completed: false },
      { label: 'Setting chat settings', completed: false },
      { label: 'Saving chat setup settings', completed: false },
    ],
  },
];
