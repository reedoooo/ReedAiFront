import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { workspacesApi } from 'api/workspaces';

const useFileStructure = space => {
  const [fileStructure, setFileStructure] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndOrganizeFileStructure = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentSpace = space.toLowerCase();
      const workspaceId = sessionStorage.getItem('workspaceId');

      const [workspaceFolders, storedFiles] = await Promise.all([
        workspacesApi.getWorkspaceFoldersBySpace({
          workspaceId,
          space: currentSpace,
        }),
        attachmentsApi.getStoredFilesBySpace({ space: currentSpace }),
      ]);

      const fileDirectory = workspaceFolders.map(folder => ({
        id: folder._id,
        name: folder.name,
        type: 'folder',
        children: storedFiles
          .filter(file => file.metadata.folderId === folder._id)
          .map(file => ({
            ...file,
            name: file.name || file.filename,
            type: 'file',
          })),
      }));

      const rootFiles = storedFiles
        .filter(file => !file.folderId)
        .map(file => ({
          ...file,
          name: file.name || file.filename,
          type: 'file',
        }));

      setFileStructure([...fileDirectory, ...rootFiles]);
    } catch (err) {
      setError(
        err.message || 'An error occurred while fetching file structure'
      );
    } finally {
      setIsLoading(false);
    }
  }, [space]);

  useEffect(() => {
    fetchAndOrganizeFileStructure();
  }, [fetchAndOrganizeFileStructure]);

  const refreshFileStructure = useCallback(() => {
    fetchAndOrganizeFileStructure();
  }, [fetchAndOrganizeFileStructure]);

  const addFile = useCallback(async (file, folderId = null) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderId', folderId);

      const response = await axios.post('/api/files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFileStructure(prevStructure => {
        const newFile = { ...response.data, type: 'file' };
        if (folderId) {
          return prevStructure.map(item =>
            item.id === folderId && item.type === 'folder'
              ? { ...item, children: [...item.children, newFile] }
              : item
          );
        } else {
          return [...prevStructure, newFile];
        }
      });
    } catch (err) {
      setError('Failed to add file');
    }
  }, []);

  const addFolder = useCallback(async folderName => {
    try {
      const response = await axios.post('/api/folders', { name: folderName });
      setFileStructure(prevStructure => [
        ...prevStructure,
        { ...response.data, type: 'folder', children: [] },
      ]);
    } catch (err) {
      setError('Failed to add folder');
    }
  }, []);

  const deleteItem = useCallback(async (itemId, itemType) => {
    try {
      await axios.delete(`/api/${itemType}s/${itemId}`);
      setFileStructure(prevStructure =>
        prevStructure.filter(item => item.id !== itemId)
      );
    } catch (err) {
      setError(`Failed to delete ${itemType}`);
    }
  }, []);

  const moveItem = useCallback(async (itemId, targetFolderId) => {
    try {
      await axios.patch(`/api/files/${itemId}`, { folderId: targetFolderId });
      setFileStructure(prevStructure => {
        const item = prevStructure.find(i => i.id === itemId);
        const newStructure = prevStructure.filter(i => i.id !== itemId);
        const targetFolder = newStructure.find(f => f.id === targetFolderId);
        if (targetFolder) {
          targetFolder.children = [...targetFolder.children, item];
        } else {
          newStructure.push(item);
        }
        return newStructure;
      });
    } catch (err) {
      setError('Failed to move item');
    }
  }, []);

  return {
    fileStructure,
    setFileStructure,
    isLoading,
    error,
    refreshFileStructure,
    addFile,
    addFolder,
    deleteItem,
    moveItem,
  };
};

export default useFileStructure;
