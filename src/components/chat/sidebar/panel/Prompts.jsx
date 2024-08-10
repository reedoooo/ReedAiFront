import { TabGroup, TabPanel, TabPanels } from '@headlessui/react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  EditIcon,
  FileCopyIcon,
  KeyboardArrowUpIcon,
  KeyboardArrowDownIcon,
} from 'assets/humanIcons';
import PromptRecommend from 'assets/recommend.json';
import {
  AnimatedTab,
  StyledButton,
  StyledTabs,
  StyledTextareaAutosize,
  StyledTextField,
} from 'components/chat/styled';
import { useCopyToClipboard, useMode } from 'hooks';

const addCustomPrompt = async (name, content) => {
  const url = 'http://localhost:3001/api/files/add/prompt'; // Replace with your actual endpoint

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Prompt added successfully:', result);
    // Optionally, you can update your state or local storage here if needed
  } catch (error) {
    console.error('Error adding custom prompt:', error);
  }
};
const CurrentPromptRenderer = ({ prompt, isOpen, onToggle }) => {
  const { copyToClipboard } = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard(prompt.content);
    console.log('Prompt copied to clipboard', prompt.content);
  };
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        initial: { opacity: 0, height: 0 },
        enter: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(211, 211, 211, 0.2)',
            borderRadius: '5px',
            p: '0.15rem',
          },
        }}
      >
        <Typography variant="subtitle2">{prompt.title}</Typography>
        <IconButton onClick={onToggle} size="small" color="white">
          {isOpen ? (
            <KeyboardArrowUpIcon
              fontSize="small"
              style={{ color: '#E8E8FD' }}
            />
          ) : (
            <KeyboardArrowDownIcon
              fontSize="small"
              style={{ color: '#E8E8FD' }}
            />
          )}
        </IconButton>
      </Box>
      {isOpen && (
        <Box
          sx={{
            my: '0.25rem',
            py: '0.25rem',
            border: '1px solid #E8E8FD',
            borderRadius: '10px',
            padding: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="body2" className="mt-2 text-sm text-gray-500">
            {prompt.content}
          </Typography>
          <IconButton
            onClick={handleCopy}
            size="small"
            color="white"
            sx={{ alignSelf: 'flex-start', mt: '0.5rem' }}
          >
            <FileCopyIcon fontSize="small" style={{ color: '#E8E8FD' }} />
          </IconButton>
        </Box>
      )}
    </motion.div>
  );
};
export const Prompts = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [promptList, setPromptList] = useState(
    JSON.parse(localStorage.getItem('promptStore')?.prompts) || [
      {
        id: 1,
        title: 'Prompt 1',
        content: 'This is the description for Prompt 1.',
      },
      {
        id: 2,
        title: 'Prompt 2',
        content: 'This is the description for Prompt 2.',
      },
      {
        id: 3,
        title: 'Prompt 3',
        content: 'This is the description for Prompt 3.',
      },
    ]
  );
  const [tempPromptKey, setTempPromptKey] = useState('');
  const [tempPromptValue, setTempPromptValue] = useState('');
  const [modalMode, setModalMode] = useState('');
  const [tempModifiedItem, setTempModifiedItem] = useState({});
  const [downloadURL, setDownloadURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const itemRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [newPrompt, setNewPrompt] = useState({ title: '', content: '' });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPromptIndex, setOpenPromptIndex] = useState(null);
  // a11yProps for accessibility
  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  // Fetch data from local storage
  useEffect(() => {
    const fetchData = () => {
      try {
        const files =
          JSON.parse(localStorage.getItem('promptStore').prompts) || [];
        console.log('FILES', files);
        setRows(files);
        setPromptList(removeDuplicateTitles(files));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Remove duplicate titles
  const removeDuplicateTitles = prompts => {
    const uniquePrompts = [];
    const titles = new Set();
    for (const prompt of prompts) {
      if (!titles.has(prompt.title)) {
        titles.add(prompt.title);
        uniquePrompts.push(prompt);
      }
    }
    return uniquePrompts;
  };
  // Update animation key when selected index changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedIndex]);
  // function to handle toggling opstate of specific prompts
  const handleToggle = index => {
    setOpenPromptIndex(openPromptIndex === index ? null : index);
  };
  // Function to add a prompt
  const handleAddPrompt = async () => {
    if (newPrompt.title && newPrompt.content) {
      for (const i of promptList) {
        if (i.key === tempPromptKey) {
          alert('Duplicate title, please re-enter');
          return;
        }
        if (i.value === tempPromptValue) {
          alert(`Duplicate content: ${tempPromptKey}, please re-enter`);
          return;
        }
      }
      const updatedPrompts = [...promptList, newPrompt];
      setPromptList(updatedPrompts);
      localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
      addCustomPrompt(newPrompt.title, newPrompt.content);
      setNewPrompt({ title: '', content: '' });
    }
  };
  // Function to edit an existing prompt
  const handleEditPrompt = (index, updatedPrompt) => {
    const updatedPrompts = promptList.map((prompt, i) =>
      i === index ? updatedPrompt : prompt
    );
    const tempList = promptList.filter((_, i) => i !== index);

    for (const i of tempList) {
      if (i.key === tempPromptKey) {
        alert('Title conflict detected, please re-enter');
        return;
      }
      if (i.value === tempPromptValue) {
        alert(`Content conflict detected: ${i.key}, please re-enter`);
        return;
      }
    }

    setPromptList([
      { key: tempPromptKey, value: tempPromptValue },
      ...tempList,
    ]);
    alert('Prompt modified successfully');
    changeShowModal('');
    setPromptList(updatedPrompts);
    localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
  };
  // Function to delete a prompt
  const handleDeletePrompt = index => {
    const updatedPrompts = promptList.filter((_, i) => i !== index);
    setPromptList(updatedPrompts);
    localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
    alert('Prompt deleted successfully');
  };
  // Function to clear prompt list
  const handleClearPrompts = () => {
    setPromptList([]);
    localStorage.removeItem('customPrompts');
    alert('All prompts cleared successfully');
  };
  // Function to handle tab change
  const handleTabChange = index => {
    setSelectedIndex(index);
  };
  // Function to handle input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPrompt({ ...newPrompt, [name]: value });
  };
  // Function to handle modal close
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      itemRef.current?.click();
    }
  };
  // Function to handle opening dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  // Function to handle closing dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // Function to handle chang
  const changeShowModal = (mode, selected = { key: '', value: '' }) => {
    if (mode === 'add') {
      setTempPromptKey('');
      setTempPromptValue('');
    } else if (mode === 'modify') {
      setTempModifiedItem({ ...selected });
      setTempPromptKey(selected.key);
      setTempPromptValue(selected.value);
    } else if (mode === 'local_import') {
      setTempPromptKey('local_import');
      setTempPromptValue('');
    }
    setShowModal(!showModal);
    setModalMode(mode);
  };
  const importPromptTemplate = () => {
    try {
      const jsonData = JSON.parse(tempPromptValue);
      for (const i of jsonData) {
        let safe = true;
        for (const j of promptList) {
          if (j.key === i.key) {
            alert(`Skipped due to duplicate title: ${i.key}`);
            safe = false;
            break;
          }
          if (j.value === i.value) {
            alert(`Skipped due to duplicate content: ${i.key}`);
            safe = false;
            break;
          }
        }
        if (safe)
          setPromptList([{ key: i.key, value: i.value }, ...promptList]);
      }
      alert('Import successful');
      changeShowModal('');
    } catch {
      alert('Invalid JSON format, please check');
      changeShowModal('');
    }
  };
  const exportPromptTemplate = () => {
    const jsonDataStr = JSON.stringify(promptList);
    const blob = new Blob([jsonDataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ChatGPTPromptTemplate.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  const downloadPromptTemplate = async () => {
    try {
      // const response = await fetch(downloadURL);
      const response = await fetch('/static/chatgpt-prompts-custom.json')
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'chatgpt-prompts-custom.json';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      const jsonData = await response.json();
      setTempPromptValue(JSON.stringify(jsonData));
      importPromptTemplate();
    } catch {
      alert('Network error or invalid JSON file');
    }
  };
  const pagination = isMobile
    ? { pageSize: 6, pageSlot: 5 }
    : { pageSize: 7, pageSlot: 15 };

  const columns = [
    {
      field: 'prompt',
      headerName: 'Prompt Details',
      width: 600,
      renderCell: params => (
        <div>
          <Typography
            variant="subtitle2"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: '#fff',
            }}
          >
            {params.row.title}
          </Typography>
          <Typography
            className="mt-2 text-sm text-gray-500"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: '#fff',
            }}
          >
            {params.row.content}
          </Typography>
        </div>
      ),
    },
  ];
  return (
    <>
      <Box
        ref={itemRef}
        sx={{
          '&:hover': {
            backgroundColor: 'accent.main',
            opacity: 0.5,
          },
          display: 'flex',
          width: '100%',
          cursor: 'pointer',
          alignItems: 'center',
          borderRadius: '4px',
          padding: '8px',
          outline: 'none',
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <EditIcon sx={{ fontSize: 30 }} />{' '}
        <Typography
          sx={{
            marginLeft: '12px',
            flex: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Prompts
        </Typography>
      </Box>
      <>
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1rem',
              color: 'white',
              borderRadius: '14px',
              background: '#1c1c1c', // Slightly different background for the panel to distinguish it
            }}
          >
            <StyledTabs theme={theme} color="cyan">
              <AnimatedTab
                theme={theme}
                label="Create"
                className={selectedIndex === 0 ? 'selected' : 'notSelected'}
                // onClick={() => setSelectedIndex(index)}
                {...a11yProps(0)}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CREATE
              </AnimatedTab>
              <AnimatedTab
                label="Edit"
                className={selectedIndex === 1 ? 'selected' : 'notSelected'}
                {...a11yProps(1)}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EDIT
              </AnimatedTab>
              <AnimatedTab
                label="Suggested"
                className={selectedIndex === 2 ? 'selected' : 'notSelected'}
                {...a11yProps(2)}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SUGGESTED
              </AnimatedTab>
            </StyledTabs>
          </Box>
          <TabPanels className="mt-2">
            <TabPanel
              value={'Create'}
              index={0}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                p: '1rem',
                // justifyContent: 'space-between',
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
                <StyledTextareaAutosize
                  name="content"
                  minRows={3}
                  placeholder="Enter your prompt here"
                  value={newPrompt.content}
                  onChange={handleInputChange}
                  theme={theme}
                />
              </Box>
              <StyledButton onClick={handleAddPrompt} sx={{ mt: 2 }}>
                Create Prompt
              </StyledButton>
              <Typography variant="h6" sx={{ mt: 2, color: '#fff' }}>
                Current Prompts
              </Typography>
              {promptList?.map((prompt, index) => (
                <CurrentPromptRenderer
                  key={index}
                  prompt={prompt}
                  isOpen={openPromptIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </TabPanel>
            <TabPanel>
              <Typography variant="h6">Edit Prompts</Typography>
              {promptList.map((prompt, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <Typography>{prompt.title}</Typography>
                  <StyledButton
                    onClick={() => changeShowModal('modify', prompt)}
                  >
                    Edit
                  </StyledButton>
                </Box>
              ))}
            </TabPanel>
            <TabPanel value={'Suggested Prompts'} index={2}>
              <Typography variant="h6">Suggested Prompts</Typography>
              <StyledButton onClick={downloadPromptTemplate}>
                Get Suggested Prompts
              </StyledButton>
              <motion.div layout>
                <Box p={2}>
                  <Typography variant="body2">
                    Note: Please verify the source of the downloaded JSON file,
                    as malicious JSON files may harm your computer!
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
                              setDownloadURL(
                                `http://localhost:3001${info.downloadUrl}`
                              )
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
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </>
    </>
  );
};

export default Prompts;
