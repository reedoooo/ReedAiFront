import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Typography,
  Switch,
} from '@mui/material';
import { Editor } from '@tiptap/react';
import React, { useState } from 'react';
import { MdAttachFile } from 'react-icons/md';
import {
  EmojiEmotionsIcon,
  UploadFileIcon,
  CodeIcon,
  DashboardCustomizeIcon,
  AttachFileIcon,
  SettingsIcon,
  SendIcon,
  TextSnippetIcon,
} from 'assets/humanIcons';

const TipTapMenuControls = ({ editor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState(0);
  const handleClick = (event, menu) => {
    setAnchorEl(menu === 'settings' ? event.currentTarget : null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleSettingsTabChange = (event, newValue) => {
    setSettingsTab(newValue);
  };

  const handleFileUpload = event => {
    // Your file upload handling logic
    console.log(event.target.files[0]);
  };

  const handleInsertSnippet = snippet => {
    editor.chain().focus().insertContent(snippet).run();
  };

  const handleInsertCodeBlock = codeBlock => {
    editor.chain().focus().insertCodeBlock().run();
  };

  const handleInsertForm = formComponent => {
    editor.chain().focus().insertContent(formComponent).run();
  };

  const handleEmojiInsert = emoji => {
    editor.chain().focus().insertContent(emoji).run();
  };

  const handleSend = () => {
    // Your send message logic
    console.log('Message sent');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <IconButton onClick={e => handleClick(e, 'snippets')}>
        <TextSnippetIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleInsertSnippet('Snippet 1')}>
          Snippet 1
        </MenuItem>
        <MenuItem onClick={() => handleInsertSnippet('Snippet 2')}>
          Snippet 2
        </MenuItem>
      </Menu>

      <IconButton onClick={() => {}}>
        <EmojiEmotionsIcon
          onEmojiClick={(event, emoji) => handleEmojiInsert(emoji)}
        />
      </IconButton>

      <IconButton onClick={e => handleClick(e, 'code')}>
        <CodeIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleInsertCodeBlock('Code Block 1')}>
          Code Block 1
        </MenuItem>
        <MenuItem onClick={() => handleInsertCodeBlock('Code Block 2')}>
          Code Block 2
        </MenuItem>
      </Menu>

      <IconButton onClick={e => handleClick(e, 'form')}>
        <DashboardCustomizeIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleInsertForm('Form Component 1')}>
          Form Component 1
        </MenuItem>
        <MenuItem onClick={() => handleInsertForm('Form Component 2')}>
          Form Component 2
        </MenuItem>
      </Menu>

      {/* <label htmlFor="file-input"> */}
      <input
        type="file"
        id="file-input"
        hidden
        onChange={handleFileUpload}
        accept="application/pdf"
      />
      <IconButton component="span">
        <MdAttachFile />
      </IconButton>
      {/* </label> */}

      <IconButton onClick={handleSettingsOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={settingsOpen} onClose={handleSettingsClose}>
        <Tabs
          orientation="vertical"
          value={settingsTab}
          onChange={handleSettingsTabChange}
        >
          <Tab icon={<SettingsIcon />} />
          {/* Add more tabs as needed */}
        </Tabs>
        <Box>
          <TabPanel value={settingsTab} index={0}>
            <Card>
              <CardContent>
                <Typography>Settings Content</Typography>
                <Switch />
              </CardContent>
              <CardActions>
                <Button>Save</Button>
              </CardActions>
            </Card>
          </TabPanel>
          {/* Add more TabPanels as needed */}
        </Box>
      </Dialog>

      <Button
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={handleSend}
        sx={{ marginLeft: 'auto' }}
      >
        Send
      </Button>
    </Box>
  );
};

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TipTapMenuControls;
