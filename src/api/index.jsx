export * from './user';
export * from './chat';
export * from './export';

// import constants from 'config/constants';
// import useApiService from 'hooks/useApiService';

// const { API_URL } = constants;
// export const getGeneralChatResponse = async formData => {
//   try {
//     const response = await useApiService.post('/chat/create', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to create cover letter:', error);
//     throw error;
//   }
// };

// export const createCoverLetter = async formData => {
//   try {
//     const response = await useApiService.post(
//       '/cover-letter/create',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Failed to create cover letter:', error);
//     throw error;
//   }
// };

// export const saveDraft = async (draftData, contentName, userId) => {
//   const data = {
//     name: draftData.title,
//     pdf: draftData.pdf,
//     text: draftData.text,
//     html: draftData.html,
//     blocks: draftData.blocks,
//     metadata: draftData.metadata,
//   };
//   const draft = {
//     title: contentName,
//     content: data,
//   };

//   try {
//     const response = await useApiService.post('/cover-letter/save', {
//       draft,
//       userId,
//     });
//     console.log('Draft saved successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error saving draft:', error);
//   }
// };

// export const updateDraft = async (draftId, content, contentName, userId) => {
//   const endpoint = `${API_URL}/cover-letter/update/${draftId}`;
//   const req = { content, contentName, userId };

//   try {
//     const response = await useApiService.put(endpoint, req);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating draft:', error);
//   }
// };

// export const deleteDraft = async draftId => {
//   const endpoint = `${API_URL}/cover-letter/delete/${draftId}`;

//   try {
//     const response = await useApiService.delete(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting draft:', error);
//   }
// };
