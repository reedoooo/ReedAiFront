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
      const workspaceId = JSON.parse(sessionStorage.getItem('workspaceId'));

      // Fetch folders and files concurrently
      const [workspaceFolders, storedFiles] = await Promise.all([
        workspacesApi.getWorkspaceFoldersBySpace({
          workspaceId,
          space: currentSpace,
        }),
        attachmentsApi.getStoredFilesBySpace({ space: currentSpace }),
      ]);

      // Organize files into file directory
      const fileDirectory = workspaceFolders.map(folder => ({
        id: folder._id,
        name: folder.name,
        type: 'folder',
        children: storedFiles
          .filter(file => file.metadata.folderId === folder._id)
          .map(file => ({
            ...file,
            // id: file._id,
            name: file.name || file.filename,
            type: 'file',
          })),
      }));
      console.log('fileDirectory', fileDirectory);
      const rootFiles = storedFiles
        .filter(file => !file.folderId)
        .map(file => ({
          ...file,
          // id: file._id,
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

  return {
    fileStructure,
    setFileStructure,
    isLoading,
    error,
    refreshFileStructure,
  };
};

export default useFileStructure;
