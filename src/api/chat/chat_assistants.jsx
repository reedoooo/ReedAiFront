// import service from 'utils/request/axios';

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your actual API base URL
export const getAssistants = async (userId, clientApiKey) => {
  try {
    if (!userId || !clientApiKey) {
      return console.log('Missing userId or clientApiKey');
    }
    const response = await axios.post(`${API_BASE_URL}/chat/assistants`, {
      userId,
      clientApiKey,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching assistants:',
      error.response || error.message
    );
    throw error;
  }
};

export const createAssistant = async assistantData => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/assistants`, {
      ...assistantData,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating assistant:', error.response || error.message);
    throw error;
  }
};

export const updateAssistant = async (assistantId, assistantData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/chat/assistants/${assistantId}`,
      assistantData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating assistant:', error.response || error.message);
    throw error;
  }
};

export const deleteAssistant = async assistantId => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/chat/assistants/${assistantId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting assistant:', error.response || error.message);
    throw error;
  }
};
// export const getAssistants = async () => {
//   const response = await axios.get(`${API_BASE_URL}/chat/assistants`);
//   return response.data;
// };

// export const createAssistant = async assistantData => {
//   const response = await axios.post(
//     `${API_BASE_URL}/chat/assistants`,
//     assistantData
//   );
//   return response.data;
// };

// export const updateAssistant = async (assistantId, assistantData) => {
//   const response = await axios.put(
//     `${API_BASE_URL}/chat/assistants/${assistantId}`,
//     assistantData
//   );
//   return response.data;
// };

// export const deleteAssistant = async assistantId => {
//   const response = await axios.delete(
//     `${API_BASE_URL}/chat/assistants/${assistantId}`
//   );
//   return response.data;
// };

// const getAssistantCollectionsByAssistantId = async assistantId => {
//   const { data: assistantCollections, error } = await supabase
//     .from('assistants')
//     .select(
//       `
//         id,
//         name,
//         collections (*)
//       `
//     )
//     .eq('id', assistantId)
//     .single();

//   if (!assistantCollections) {
//     throw new Error(error.message);
//   }

//   return assistantCollections;
// };

// const getAssistantFilesByAssistantId = async assistantId => {
//   const { data: assistantFiles, error } = await supabase
//     .from('assistants')
//     .select(
//       `
//         id,
//         name,
//         files (*)
//       `
//     )
//     .eq('id', assistantId)
//     .single();

//   if (!assistantFiles) {
//     throw new Error(error.message);
//   }

//   return assistantFiles;
// };

// const getAssistantToolsByAssistantId = async assistantId => {
//   const { data: assistantTools, error } = await supabase
//     .from('assistants')
//     .select(
//       `
//         id,
//         name,
//         tools (*)
//       `
//     )
//     .eq('id', assistantId)
//     .single();

//   if (!assistantTools) {
//     throw new Error(error.message);
//   }

//   return assistantTools;
// };

// const getAssistantById = async assistantId => {
//   const { data: assistant, error } = await supabase
//     .from('assistants')
//     .select('*')
//     .eq('id', assistantId)
//     .single();

//   if (!assistant) {
//     throw new Error(error.message);
//   }

//   return assistant;
// };
