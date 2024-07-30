export const authConfigs = [
  {
    label: 'Username',
    name: 'username',
    required: true,
    fullWidth: true,
    margin: 'dense',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    fullWidth: true,
    margin: 'dense',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: false,
    fullWidth: true,
    margin: 'dense',
    conditional: 'isSignup', // Only show this field if isSignup is true
  },
];
