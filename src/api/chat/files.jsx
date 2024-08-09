import { apiUtils } from '@/lib/apiUtils';

const baseURL = import.meta.env.VITE_GLOB_API_URL;

export async function getChatFilesList(chatFileId, userId) {
  try {
    const data = await apiUtils.get(`/chat/file/${chatFileId}/list`, {
      params: { userId },
    });
    return data.map(item => ({
      ...item,
      status: 'finished',
      url: `${baseURL}/download/${item.id}`,
      percentage: 100,
    }));
  } catch (error) {
    console.error('Error fetching chat files list:', error);
    throw error;
  }
}

export const getFileWorkspacesByWorkspaceId = async workspaceId => {
  try {
    const data = await apiUtils.get(`/chat/files/${workspaceId}`);
    if (!data.workspace) {
      throw new Error(data.error || 'Workspace not found');
    }
    return data.workspace;
  } catch (error) {
    console.error('Error fetching file workspaces:', error);
    throw error;
  }
};
