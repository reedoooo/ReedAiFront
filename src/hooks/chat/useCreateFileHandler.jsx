import mammoth from 'mammoth';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { attachmentsApi } from 'api/Ai/chat-sessions';

export const useCreateFileHandler = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getFileById = async fileId => {
    const { data: file, error } = await attachmentsApi.getFile(fileId);

    if (!file) {
      throw new Error(error.message);
    }

    return file;
  };
  const createFileBasedOnExtension = useCallback(
    async (file, fileRecord, workspaceId, embeddingsProvider) => {
      const fileExtension = file.name.split('.').pop();

      if (fileExtension === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });

        return createDocXFile(
          result.value,
          file,
          fileRecord,
          workspaceId,
          embeddingsProvider
        );
      } else {
        return createFile(file, fileRecord, workspaceId, embeddingsProvider);
      }
    },
    []
  );
  /**
   * Creates a file and performs necessary operations such as renaming, uploading, and retrieving the file.
   * @param {File} file - The file to be uploaded.
   * @param {Object} fileRecord - The file record containing information about the file.
   * @param {string} workspaceId - The ID of the workspace.
   * @param {string} embeddingsProvider - The provider for embeddings.
   * @returns {Promise<Object>} - A promise that resolves to the fetched file.
   * @throws {Error} - If there is an error during the file creation process.
   */
  const createFile = useCallback(
    async (file, fileRecord, workspaceId, embeddingsProvider) => {
      setIsLoading(true);

      let validFilename = fileRecord.name
        .replace(/[^a-z0-9.]/gi, '_')
        .toLowerCase();
      const extension = file.name.split('.').pop();
      const extensionIndex = validFilename.lastIndexOf('.');
      const baseName = validFilename.substring(
        0,
        extensionIndex < 0 ? undefined : extensionIndex
      );
      const maxBaseNameLength = 100 - (extension?.length || 0) - 1;

      if (baseName.length > maxBaseNameLength) {
        fileRecord.name =
          baseName.substring(0, maxBaseNameLength) + '.' + extension;
      } else {
        fileRecord.name = baseName + '.' + extension;
      }

      try {
        const { data: createdFile } =
          await attachmentsApi.createFile(fileRecord);

        await createFileWorkspaces([
          {
            user_id: createdFile.user_id,
            file_id: createdFile.id,
            workspace_id: workspaceId,
          },
        ]);

        const filePath = await attachmentsApi.uploadFile(file, {
          name: createdFile.name,
          user_id: createdFile.user_id,
          file_id: createdFile.id,
        });

        await updateFile(createdFile._id, { file_path: filePath });

        const formData = new FormData();
        formData.append('fileId', createdFile.id);
        formData.append('embeddingsProvider', embeddingsProvider);

        const response = await attachmentsApi.getFileRetrievalProcess(formData);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        const fetchedFile = await getFileById(createdFile.id);

        setIsLoading(false);
        return fetchedFile;
      } catch (error) {
        toast.error('Failed to upload. ' + error.message, { duration: 10000 });
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const createDocXFile = useCallback(
    async (text, file, fileRecord, workspaceId, embeddingsProvider) => {
      setIsLoading(true);

      try {
        const { data: createdFile } =
          await attachmentsApi.createFile(fileRecord);

        await createFileWorkspaces([
          {
            user_id: createdFile.user_id,
            file_id: createdFile.id,
            workspace_id: workspaceId,
          },
        ]);

        const filePath = await attachmentsApi.uploadFile(file, {
          name: createdFile.name,
          user_id: createdFile.user_id,
          file_id: createdFile.id,
        });

        await updateFile(createdFile.id, { file_path: filePath });

        const response = await attachmentsApi.getFileRetrievalProcess({
          text,
          fileId: createdFile.id,
          embeddingsProvider,
          fileExtension: 'docx',
        });

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        const fetchedFile = await getFileById(createdFile.id);

        setIsLoading(false);
        return fetchedFile;
      } catch (error) {
        toast.error('Failed to upload. ' + error.message, { duration: 10000 });
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const createFileWorkspaces = useCallback(async items => {
    try {
      const data = await attachmentsApi.createFileWorkspace(items);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  const updateFile = useCallback(async (fileId, file) => {
    try {
      const { data } = await attachmentsApi.updateFile(fileId, file);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  const deleteFile = useCallback(async fileId => {
    try {
      await attachmentsApi.deleteFile(fileId);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  const deleteFileWorkspace = useCallback(async (fileId, workspaceId) => {
    try {
      await attachmentsApi.deleteFileWorkspace(fileId, workspaceId);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);
  return {
    deleteFileWorkspace,
    deleteFile,
    createFile,
    createDocXFile,
    updateFile,
    getFileById,
    createFileBasedOnExtension,
    isLoading,
  };
};
