// folders
export const getFoldersByWorkspaceId = async workspaceId => {
  const response = await fetch(`/chat/chat_folders/${workspaceId}`);
  const data = await response.json();

  if (!data.folders) {
    throw new Error(data.error);
  }

  return data.folders;
};

export const createFolder = async (workspaceId, folderName) => {
  const response = await fetch(`/chat/chat_folders/${workspaceId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: folderName }),
  });
  const data = await response.json();

  if (!data.folder) {
    throw new Error(data.error);
  }

  return data.folder;
};

export const updateFolder = async (folderId, updatedFolder) => {
  const response = await fetch(`/chat/chat_folders/${folderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFolder),
  });

  if (!response.ok) {
    throw new Error('Error updating folder');
  }
};

export const deleteFolder = async folderId => {
  const response = await fetch(`/chat/chat_folders/${folderId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error deleting folder');
  }
};
