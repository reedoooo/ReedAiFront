async function getHomeWorkspaceByUserId(userId) {
  try {
    const response = await fetch(`/chat/workspaces/home/${userId}`);
    if (!response.ok) {
      throw new Error('Home workspace not found');
    }
    const homeWorkspaceId = await response.json();
    return homeWorkspaceId;
  } catch (error) {
    console.error('Error fetching home workspace:', error.message);
  }
}

async function getWorkspaceById(workspaceId) {
  try {
    const response = await fetch(`/chat/workspaces/${workspaceId}`);
    if (!response.ok) {
      throw new Error('Workspace not found');
    }
    const workspace = await response.json();
    return workspace;
  } catch (error) {
    console.error('Error fetching workspace:', error.message);
  }
}

async function getworkspacesByUserId(userId) {
  try {
    const response = await fetch(`/chat/workspaces/user/${userId}`);
    if (!response.ok) {
      throw new Error('chat/workspaces not found');
    }
    const workspaces = await response.json();
    console.log('WORKSPACES', workspaces);
    return workspaces;
  } catch (error) {
    console.error('Error fetching chat/workspaces:', error.message);
  }
}

async function createWorkspace(workspaceData) {
  try {
    const response = await fetch('/chat/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workspaceData),
    });
    if (!response.ok) {
      throw new Error('Failed to create workspace');
    }
    const createdWorkspace = await response.json();
    return createdWorkspace;
  } catch (error) {
    console.error('Error creating workspace:', error.message);
  }
}

async function updateWorkspace(workspaceId, workspaceData) {
  try {
    const response = await fetch(`/chat/workspaces/${workspaceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workspaceData),
    });
    if (!response.ok) {
      throw new Error('Failed to update workspace');
    }
    const updatedWorkspace = await response.json();
    return updatedWorkspace;
  } catch (error) {
    console.error('Error updating workspace:', error.message);
  }
}

async function deleteWorkspace(workspaceId) {
  try {
    const response = await fetch(`/chat/workspaces/${workspaceId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete workspace');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting workspace:', error.message);
  }
}

export {
  getHomeWorkspaceByUserId,
  getWorkspaceById,
  getworkspacesByUserId,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
