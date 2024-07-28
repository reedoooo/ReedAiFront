// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Box,
//   Switch,
//   FormControlLabel,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
// } from '@mui/material';
// import { useFormik } from 'formik';
// import React, { useContext, useEffect, useState } from 'react';
// import * as yup from 'yup';
// import { useChatStore } from 'contexts/ChatProvider';
// import APIStep from './ApiStep';
// import ProfileStep from './ProfileStep';

// const theme = createTheme();

// const schema = yup.object().shape({
//   displayName: yup.string().required('Display name is required'),
//   username: yup.string().required('Username is required'),
//   // Add other validations as needed
// });

// export default function SetupPage() {
//   const {
//     profile,
//     setProfile,
//     setWorkspaces,
//     setSelectedWorkspace,
//     setEnvKeyMap,
//     setAvailableHostedModels,
//     setAvailableOpenRouterModels,
//   } = useChatStore();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useFormik({
//     initialValues: {
//       displayName: '',
//       username: '',
//     },
//     validationSchema: schema,
//     onSubmit: async values => {
//       // Set profile and navigate to next step
//       setProfile({ ...profile, ...values });
//       setCurrentStep(2);
//     },
//   });

//   const [loading, setLoading] = useState(true);
//   const [currentStep, setCurrentStep] = useState(1);

//   // Profile Step
//   const [displayName, setDisplayName] = useState('');
//   const [username, setUsername] = useState(profile?.username || '');
//   const [usernameAvailable, setUsernameAvailable] = useState(true);

//   // API Step
//   const [useAzureOpenai, setUseAzureOpenai] = useState(false);
//   const [openaiAPIKey, setOpenaiAPIKey] = useState('');
//   const [openaiOrgID, setOpenaiOrgID] = useState('');
//   const [azureOpenaiAPIKey, setAzureOpenaiAPIKey] = useState('');
//   const [azureOpenaiEndpoint, setAzureOpenaiEndpoint] = useState('');
//   const [azureOpenai35TurboID, setAzureOpenai35TurboID] = useState('');
//   const [azureOpenai45TurboID, setAzureOpenai45TurboID] = useState('');
//   const [azureOpenai45VisionID, setAzureOpenai45VisionID] = useState('');
//   const [azureOpenaiEmbeddingsID, setAzureOpenaiEmbeddingsID] = useState('');
//   const [anthropicAPIKey, setAnthropicAPIKey] = useState('');
//   const [googleGeminiAPIKey, setGoogleGeminiAPIKey] = useState('');
//   const [mistralAPIKey, setMistralAPIKey] = useState('');
//   const [groqAPIKey, setGroqAPIKey] = useState('');
//   const [perplexityAPIKey, setPerplexityAPIKey] = useState('');
//   const [openrouterAPIKey, setOpenrouterAPIKey] = useState('');

//   useEffect(() => {
//     const initializeSetup = async () => {
//       const session = (await supabase.auth.getSession()).data.session;
//       if (!session) {
//         return;
//       } else {
//         const user = session.user;
//         const profile = await getProfileByUserId(user.id);
//         setProfile(profile);
//         setUsername(profile.username);
//         if (!profile.has_onboarded) {
//           setLoading(false);
//         } else {
//           const data = await fetchHostedModels(profile);
//           if (!data) return;
//           setEnvKeyMap(data.envKeyMap);
//           setAvailableHostedModels(data.hostedModels);
//           if (profile['openrouter_api_key'] || data.envKeyMap['openrouter']) {
//             const openRouterModels = await fetchOpenRouterModels();
//             if (!openRouterModels) return;
//             setAvailableOpenRouterModels(openRouterModels);
//           }
//           const homeWorkspaceId = await getHomeWorkspaceByUserId(
//             session.user.id
//           );
//           return router.push(`/${homeWorkspaceId}/chat`);
//         }
//       }
//     };

//     initializeSetup();
//   }, []);

//   const handleShouldProceed = proceed => {
//     if (proceed) {
//       if (currentStep === SETUP_STEP_COUNT) {
//         handleSaveSetupSetting();
//       } else {
//         setCurrentStep(currentStep + 1);
//       }
//     } else {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSaveSetupSetting = async () => {
//     const session = (await supabase.auth.getSession()).data.session;
//     if (!session) {
//       return router.push('/login');
//     }

//     const user = session.user;
//     const profile = await getProfileByUserId(user.id);
//     const updateProfilePayload = {
//       ...profile,
//       has_onboarded: true,
//       display_name: displayName,
//       username,
//       openai_api_key: openaiAPIKey,
//       openai_organization_id: openaiOrgID,
//       anthropic_api_key: anthropicAPIKey,
//       google_gemini_api_key: googleGeminiAPIKey,
//       mistral_api_key: mistralAPIKey,
//       groq_api_key: groqAPIKey,
//       perplexity_api_key: perplexityAPIKey,
//       openrouter_api_key: openrouterAPIKey,
//       use_azure_openai: useAzureOpenai,
//       azure_openai_api_key: azureOpenaiAPIKey,
//       azure_openai_endpoint: azureOpenaiEndpoint,
//       azure_openai_35_turbo_id: azureOpenai35TurboID,
//       azure_openai_45_turbo_id: azureOpenai45TurboID,
//       azure_openai_45_vision_id: azureOpenai45VisionID,
//       azure_openai_embeddings_id: azureOpenaiEmbeddingsID,
//     };

//     const updatedProfile = await updateProfile(
//       profile.id,
//       updateProfilePayload
//     );
//     setProfile(updatedProfile);
//     const workspaces = await getWorkspacesByUserId(profile.user_id);
//     const homeWorkspace = workspaces.find(w => w.is_home);
//     setSelectedWorkspace(homeWorkspace);
//     setWorkspaces(workspaces);
//     return router.push(`/${homeWorkspace?.id}/chat`);
//   };

//   const renderStep = stepNum => {
//     switch (stepNum) {
//       case 1:
//         return (
//           <ProfileStep
//             displayName={displayName}
//             setDisplayName={setDisplayName}
//             username={username}
//             setUsername={setUsername}
//             usernameAvailable={usernameAvailable}
//             setUsernameAvailable={setUsernameAvailable}
//           />
//         );
//       case 2:
//         return (
//           <APIStep
//             useAzureOpenai={useAzureOpenai}
//             setUseAzureOpenai={setUseAzureOpenai}
//             openaiAPIKey={openaiAPIKey}
//             setOpenaiAPIKey={setOpenaiAPIKey}
//             openaiOrgID={openaiOrgID}
//             setOpenaiOrgID={setOpenaiOrgID}
//             azureOpenaiAPIKey={azureOpenaiAPIKey}
//             setAzureOpenaiAPIKey={setAzureOpenaiAPIKey}
//             azureOpenaiEndpoint={azureOpenaiEndpoint}
//             setAzureOpenaiEndpoint={setAzureOpenaiEndpoint}
//             azureOpenai35TurboID={azureOpenai35TurboID}
//             setAzureOpenai35TurboID={setAzureOpenai35TurboID}
//             azureOpenai45TurboID={azureOpenai45TurboID}
//             setAzureOpenai45TurboID={setAzureOpenai45TurboID}
//             azureOpenai45VisionID={azureOpenai45VisionID}
//             setAzureOpenai45VisionID={setAzureOpenai45VisionID}
//             azureOpenaiEmbeddingsID={azureOpenaiEmbeddingsID}
//             setAzureOpenaiEmbeddingsID={setAzureOpenaiEmbeddingsID}
//             anthropicAPIKey={anthropicAPIKey}
//             setAnthropicAPIKey={setAnthropicAPIKey}
//             googleGeminiAPIKey={googleGeminiAPIKey}
//             setGoogleGeminiAPIKey={setGoogleGeminiAPIKey}
//             mistralAPIKey={mistralAPIKey}
//             setMistralAPIKey={setMistralAPIKey}
//             groqAPIKey={groqAPIKey}
//             setGroqAPIKey={setGroqAPIKey}
//             perplexityAPIKey={perplexityAPIKey}
//             setPerplexityAPIKey={setPerplexityAPIKey}
//             openrouterAPIKey={openrouterAPIKey}
//             setOpenrouterAPIKey={setOpenrouterAPIKey}
//           />
//         );
//       case 3:
//         return <FinishStep />;
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Setup
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit(handleSaveSetupSetting)}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <StepContainer
//               currentStep={currentStep}
//               onShouldProceed={handleShouldProceed}
//             >
//               {renderStep(currentStep)}
//             </StepContainer>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }
