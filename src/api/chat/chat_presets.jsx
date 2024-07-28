export const getPresetWorkspacesByWorkspaceId = async workspaceId => {
  const response = await fetch(`/chat/chat_presets/${workspaceId}`);
  const data = await response.json();

  if (!data.workspace) {
    throw new Error(data.error);
  }

  return data.workspace;
};
