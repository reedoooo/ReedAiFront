/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useRef, useState } from 'react';
import { useChatStore } from 'contexts/ChatProvider';

export const UpdateFolder = ({ folder }) => {
  const {
    actions: { setFolders, updateFolder },
  } = useChatStore();
  const buttonRef = useRef(null);
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [name, setName] = useState(folder.name);

  const handleUpdateFolder = async e => {
    const updatedFolder = await updateFolder(folder.id, { name });
    setFolders(prevState =>
      prevState.map(c => (c.id === folder.id ? updatedFolder : c))
    );
    setShowFolderDialog(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowFolderDialog(true)}
        style={{ cursor: 'pointer' }}
      >
        <span>Edit</span> {/* Replace with an SVG or icon image if needed */}
      </button>

      {showFolderDialog && (
        <div className="dialog" style={dialogStyles}>
          <div
            className="dialog-content"
            onKeyDown={handleKeyDown}
            style={dialogContentStyles}
          >
            <h2>Edit Folder</h2>
            <div className="input-group" style={inputGroupStyles}>
              <label htmlFor="folder-name">Name</label>
              <input
                id="folder-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyles}
              />
            </div>
            <div className="dialog-actions" style={dialogActionsStyles}>
              <button
                onClick={() => setShowFolderDialog(false)}
                style={buttonStyles}
              >
                Cancel
              </button>
              <button
                ref={buttonRef}
                onClick={handleUpdateFolder}
                style={buttonStyles}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the dialog and its components
const dialogStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

const dialogContentStyles = {
  display: 'flex',
  flexDirection: 'column',
};

const inputGroupStyles = {
  marginBottom: '15px',
};

const inputStyles = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  boxSizing: 'border-box',
};

const dialogActionsStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};

const buttonStyles = {
  padding: '10px 15px',
  cursor: 'pointer',
};
