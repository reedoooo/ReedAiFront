import { createCoverLetter } from '../../api/index';

const useFormSubmit = () => {
  const formSubmitHandler = async ({
    values,
    file,
    text,
    url,
    linkedInUrl,
    drafts,
    selectedDraftIndex,
    dispatch,
    actionTypes,
  }) => {
    if (!drafts[selectedDraftIndex]?.title) {
      return alert('Please name your draft first');
    }

    dispatch({ type: actionTypes.TOGGLE_LOADING });

    try {
      const formData = new FormData();
      const keys = Object.keys(values);
      const formValues = keys.map(key => ({
        key,
        value: values[key],
      }));

      formData.append('formValues', JSON.stringify(formValues));
      if (file) formData.append('pdfFile', file);
      if (text) formData.append('pdfText', text);
      if (url) formData.append('pdfUrl', encodeURI(url));
      formData.append('linkedInUrl', encodeURI(linkedInUrl));

      const data = await createCoverLetter(formData);

      const { message, resPdfUrl, resText, resHTML, resBlock, metadata } = data;
      const updatedDrafts = [...drafts];
      updatedDrafts[selectedDraftIndex] = {
        ...updatedDrafts[selectedDraftIndex],
        name: drafts[selectedDraftIndex]?.title || values?.title,
        formValues: values,
        pdfUrl: url,
        content: {
          name: drafts[selectedDraftIndex]?.title || values?.title,
          pdf: resPdfUrl,
          text: resText,
          html: resHTML,
          blocks: resBlock,
          metadata: metadata,
        },
        resMessage: message,
      };

      localStorage.setItem(
        'selectedDraft',
        JSON.stringify(updatedDrafts[selectedDraftIndex])
      );
      dispatch({ type: actionTypes.SET_DRAFTS, drafts: updatedDrafts });
      return updatedDrafts[selectedDraftIndex];
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
    } finally {
      dispatch({ type: actionTypes.TOGGLE_LOADING });
    }
  };

  return { formSubmitHandler };
};

export default useFormSubmit;

// import constants from 'config/constants';
// import useApiService from './useApiService';

// const { API_URL } = constants;

// const useFormSubmit = () => {
//   const formSubmitHandler = async ({
//     values,
//     file,
//     text,
//     url,
//     linkedInUrl,
//     drafts,
//     selectedDraftIndex,
//     dispatch,
//     actionTypes,
//   }) => {
//     if (!drafts[selectedDraftIndex]?.title) {
//       return alert('Please name your draft first');
//     }
//     console.log('API URL:', API_URL);
//     dispatch({ type: actionTypes.TOGGLE_LOADING });

//     try {
//       const formData = new FormData();
//       const keys = Object.keys(values);
//       const formValues = keys.map(key => {
//         return {
//           key,
//           value: values[key],
//         };
//       });
//       console.log(`[RAW INPUT VALUES IS TYPE]: ${typeof formValues}`);
//       console.log(`[RAW INPUT VALUES]: ${JSON.stringify(formValues)}`);
//       formData.append('formValues', JSON.stringify(formValues));
//       if (file) {
//         console.log(`[FILE IS TYPE]: ${typeof file}`);
//         formData.append('pdfFile', file);
//       }
//       if (text) {
//         console.log(`[TEXT IS TYPE]: ${typeof text}`);
//         formData.append('pdfText', text);
//       }
//       if (url) {
//         console.log(`[URL IS TYPE]: ${typeof url}`);
//         formData.append('pdfUrl', encodeURI(url));
//       }
//       console.log(`[LINKEDIN URL IS TYPE]: ${typeof linkedInUrl}`);
//       formData.append('linkedInUrl', encodeURI(linkedInUrl));

//       const { data } = await useApiService.post(
//         '/cover-letter/create',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const { message, resPdfUrl, resText, resHTML, resBlock, metadata } = data;
//       const updatedDrafts = [...drafts];
//       updatedDrafts[selectedDraftIndex] = {
//         ...updatedDrafts[selectedDraftIndex],
//         name: drafts[selectedDraftIndex]?.title || values?.title,
//         formValues: values,
//         pdfUrl: url,
//         // SERVER RESPONSE DATA
//         content: {
//           name: drafts[selectedDraftIndex]?.title || values?.title,
//           pdf: resPdfUrl,
//           text: resText,
//           html: resHTML,
//           blocks: resBlock,
//           metadata: metadata,
//         },
//         resMessage: message,
//       };
//       localStorage.setItem(
//         'selectedDraft',
//         JSON.stringify(updatedDrafts[selectedDraftIndex])
//       );
//       dispatch({ type: actionTypes.SET_DRAFTS, drafts: updatedDrafts });
//       return updatedDrafts[selectedDraftIndex];
//     } catch (error) {
//       console.error('Failed to generate cover letter:', error);
//     } finally {
//       dispatch({ type: actionTypes.TOGGLE_LOADING });
//     }
//   };

//   return { formSubmitHandler };
// };

// export default useFormSubmit;
