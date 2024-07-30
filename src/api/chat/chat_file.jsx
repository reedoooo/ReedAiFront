import request from '@/utils/request/axios';

const baseURL = import.meta.env.VITE_GLOB_API_URL;

export async function getChatFilesList(chatFileId, userId) {
  try {
    const response = await request.get(`/chat/chat_file/${chatFileId}/list`, {
      params: { userId },
    });
    return response.data.map(item => ({
      ...item,
      status: 'finished',
      url: `${baseURL}/download/${item.id}`,
      percentage: 100,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getFileWorkspacesByWorkspaceId = async workspaceId => {
  try {
    const response = await fetch(`/chat/chat_files/${workspaceId}`);
    const data = await response.json();
    if (!data.workspace) {
      throw new Error(data.error);
    }
    return data.workspace;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
