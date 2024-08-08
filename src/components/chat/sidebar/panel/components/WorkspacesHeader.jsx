import { ExpandMore, CheckCircle } from '@mui/icons-material';
import { Button, TextField, MenuItem, Select, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useChatStore } from 'contexts/ChatProvider';

export const WorkspacesHeader = ({ selectedWorkspaces, onSelectWorkspace }) => {
  const { workspaces } = useChatStore();
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Focus input when dropdown opens
    }
  }, [isOpen]);

  const handleWorkspaceSelect = workspace => {
    onSelectWorkspace(workspace);
  };

  if (!workspaces) return null;

  const filteredWorkspaces = workspaces?.filter(
    workspace =>
      !selectedWorkspaces.some(sw => sw._id === workspace._id) &&
      workspace.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Button
        ref={triggerRef}
        variant="outlined"
        fullWidth
        endIcon={<ExpandMore />}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedWorkspaces.length} workspaces selected
      </Button>

      {isOpen && (
        <div style={{ width: triggerRef.current?.offsetWidth }}>
          <TextField
            ref={inputRef}
            fullWidth
            placeholder="Search workspaces..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {selectedWorkspaces
            .filter(workspace =>
              workspace.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(workspace => (
              <WorkspaceItem
                key={workspace.id}
                selectedWorkspaces={selectedWorkspaces}
                workspace={workspace}
                selected={selectedWorkspaces.some(sw => sw.id === workspace.id)}
                onSelect={handleWorkspaceSelect}
              />
            ))}

          {filteredWorkspaces.map(workspace => (
            <WorkspaceItem
              key={workspace.id}
              selectedWorkspaces={selectedWorkspaces}
              workspace={workspace}
              selected={false}
              onSelect={handleWorkspaceSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const WorkspaceItem = ({
  selectedWorkspaces,
  workspace,
  selected,
  onSelect,
}) => {
  const handleSelect = () => {
    if (selected && selectedWorkspaces.length === 1) {
      toast.info('You must select at least one workspace');
      return;
    }
    onSelect(workspace);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex cursor-pointer items-center justify-between py-0.5 hover:opacity-50"
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      aria-pressed={selected}
    >
      <div className="flex grow items-center truncate">
        <div className="truncate">{workspace.name}</div>
      </div>
      {selected && <CheckCircle fontSize="small" />}
    </div>
  );
};

WorkspaceItem.propTypes = {
  selectedWorkspaces: PropTypes.array.isRequired,
  workspace: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default { WorkspacesHeader };
