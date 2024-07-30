/* eslint-disable import/namespace */
// src/hooks/useDraftStorage.jsx
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'react-use';
import { setDrafts } from 'store/Reducers/draftSlice';

const useDraftStorage = () => {
  const [storedDrafts, setStoredDrafts] = useLocalStorage(
    'coverLetterDrafts',
    []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (storedDrafts) {
      const draftsLoadedFromUser =
        JSON.parse(localStorage.getItem('user'))?.coverLetters || [];
      const allDrafts = Array.from(
        new Set([...draftsLoadedFromUser, ...storedDrafts])
      );
      const loadedDrafts = allDrafts.map(draft => ({
        ...draft,
        title: draft.content.name || draft.title || 'Untitled Draft',
        content: {
          name: draft.content.name || draft.title || 'Untitled Draft',
          pdf: draft.content.pdf || '',
          text: draft.content.text || '',
          html: draft.content.html || '',
          blocks: draft.content.blocks || [],
          metadata: draft.content.metadata || {},
        },
      }));
      dispatch(setDrafts(loadedDrafts));
    }
  }, [storedDrafts, dispatch]);
  const saveDrafts = drafts => {
    const rawDrafts = drafts.map(draft => ({
      ...draft,
      title: draft.content.name || draft.title || 'Untitled Draft',
      content: {
        name: draft.content.name || draft.title || 'Untitled Draft',
        pdf: draft.content.pdf || '',
        text: draft.content.text || '',
        html: draft.content.html || '',
        blocks: draft.content.blocks || [],
        metadata: draft.content.metadata || {},
      },
    }));
    setStoredDrafts(rawDrafts);
  };
  return {
    saveDrafts,
  };
};

export default useDraftStorage;
