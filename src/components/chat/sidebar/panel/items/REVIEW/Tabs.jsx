import { TextareaAutosize } from '@mui/base';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  AnimatedTab,
  AnimatedTabs,
  CurrentPromptRenderer,
  StyledButton,
  StyledTextField,
} from '../../../../../../../cleanup/CLEAN_UP/AnimatedTabComponents';

const CreateTab = ({
  newPrompt,
  handleInputChange,
  onCreatePrompt,
  prompts,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2">Name</Typography>
      <StyledTextField
        name="title"
        label="Prompt Title"
        value={newPrompt.title}
        onChange={handleInputChange}
        fullWidth
      />
    </Box>
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2">Content</Typography>
      <TextareaAutosize
        name="content"
        placeholder="Enter your prompt here"
        value={newPrompt.content}
        onChange={handleInputChange}
        style={{
          width: '100%',
          resize: 'none',
          borderRadius: '4px',
          border: '1px solid #dcdcdc',
          padding: '8px',
          fontSize: '14px',
          color: '#fff',
          borderColor: 'grey',
          background: '#000',
        }}
      />
    </Box>
    <StyledButton onClick={onCreatePrompt}>Create Prompt</StyledButton>
    <Typography variant="h6" sx={{ mt: 2 }}>
      Current Prompts
    </Typography>
    {prompts.map((prompt, index) => (
      <CurrentPromptRenderer key={index} prompt={prompt} />
    ))}
  </Box>
);

const EditTab = ({
  prompts,
  onEditPrompt,
  changeShowModal,
  exportPromptTemplate,
  clearPromptTemplate,
  isHovering,
  rows,
  columns,
  loading,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Edit Prompts</Typography>
      {prompts.map((prompt, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          <Typography>{prompt.title}</Typography>
          <StyledButton onClick={() => onEditPrompt(prompt)}>Edit</StyledButton>
          <motion.div layout>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                onClick={() => changeShowModal('add')}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => changeShowModal('local_import')}
              >
                Import
              </Button>
              <Button variant="contained" onClick={exportPromptTemplate}>
                Export
              </Button>
              <Popover
                open={isHovering}
                content={
                  <Button onClick={clearPromptTemplate}>
                    Confirm clear data?
                  </Button>
                }
              >
                <Button>Clear</Button>
              </Popover>
            </Box>
            <Typography variant="h6">All Prompts</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                loading={loading}
              />
            </div>
          </motion.div>
        </Box>
      ))}
    </Box>
  </Box>
);

const RecommendTab = ({
  onGetSuggestedPrompts,
  downloadURL,
  setDownloadURL,
  downloadPromptTemplate,
  isMobile,
  PromptRecommend,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <Typography variant="h6">Suggested Prompts</Typography>
    <StyledButton onClick={onGetSuggestedPrompts}>
      Get Suggested Prompts
    </StyledButton>
    <motion.div layout>
      <Box p={2}>
        <Typography variant="body2">
          Note: Please verify the source of the downloaded JSON file, as
          malicious JSON files may harm your computer!
        </Typography>
        <Grid container spacing={2} alignItems="center" mt={2}>
          <Grid item xs={isMobile ? 12 : 10}>
            <TextField
              fullWidth
              value={downloadURL}
              onChange={e => setDownloadURL(e.target.value)}
              placeholder="Enter a valid JSON URL"
            />
          </Grid>
          <Grid item xs={isMobile ? 12 : 2}>
            <Button
              variant="contained"
              fullWidth
              disabled={!downloadURL.trim()}
              onClick={downloadPromptTemplate}
            >
              Download
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            height: 360,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {PromptRecommend.map(info => (
            <Card
              key={info.key}
              title={info.key}
              sx={{ flex: isMobile ? '1 0 100%' : '1 0 30%' }}
              variant="outlined"
            >
              <Typography variant="body2">{info.desc}</Typography>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="text"
                  component="a"
                  href={info.url}
                  target="_blank"
                >
                  🔗
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    setDownloadURL(`http://localhost:3001${info.downloadUrl}`)
                  }
                >
                  ➕
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </motion.div>
  </Box>
);

const ListTab = ({ promptList, columns }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">All Prompts</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={promptList.map((item, index) => ({
            id: index,
            renderKey: item.key,
            renderValue: item.value,
            ...item,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Box>
  </Box>
);

const renderTabContent = ({ activeTab, ...props }) => {
  switch (activeTab) {
    case 'create':
      return <CreateTab {...props} />;
    case 'edit':
      return <EditTab {...props} />;
    case 'recommend':
      return <RecommendTab {...props} />;
    case 'list':
      return <ListTab {...props} />;
    default:
      return null;
  }
};

const TabRenderer = ({ tabs, activeTab, onTabChange, children }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c',
        }}
      >
        <AnimatedTabs
          value={activeTab}
          onChange={(e, newValue) => onTabChange(newValue)}
          indicatorColor="#fff"
        >
          {tabs.map((tab, index) => (
            <AnimatedTab key={index} label={tab.label} />
          ))}
        </AnimatedTabs>
      </Box>
      {children}
    </>
  );
};

const TabComponent = props => {
  const [activeTab, setActiveTab] = useState('create'); // Default to 'create' tab

  const tabs = [
    { label: 'Create', value: 'create' },
    { label: 'Edit', value: 'edit' },
    { label: 'Recommend', value: 'recommend' },
    { label: 'List', value: 'list' },
  ];

  return (
    <TabRenderer tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent(activeTab, props)}
    </TabRenderer>
  );
};

export default TabComponent;
