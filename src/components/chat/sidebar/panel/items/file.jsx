export default Prompts;
// import { TabPanel } from '@mui/lab';
// import {
//   Tabs,
//   Tab,
//   TextField,
//   Button,
//   TextareaAutosize,
//   Typography,
//   Box,
//   Card,
//   useMediaQuery,
//   Popover,
//   Modal,
//   Grid,
//   Divider,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'; // Import Framer Motion
// import React, { useCallback, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { EditIcon } from 'assets/humanIcons';
// import PromptRecommend from 'assets/recommend.json';
// import constants from 'config/constants';
// import { useChatStore } from 'contexts/ChatProvider';
// import useMode from 'hooks/useMode';
// import { isASCII } from 'utils/is';
// const { API_URL } = constants;
// const StyledTextField = styled(TextField)({
//   margin: '10px 0',
//   '& label': {
//     color: '#fff',
//     '&.Mui-focused': { color: 'grey' },
//   },
//   '& .MuiInput-underline:after': { borderBottomColor: 'grey' },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': { borderColor: 'grey' },
//     '&:hover fieldset': { borderColor: 'grey' },
//     '&.Mui-focused fieldset': { borderColor: 'grey' },
//   },
//   '& .MuiInputBase-input': { color: '#fff', background: '#000' },
// });
// const StyledButton = styled(Button)({
//   color: '#fff',
//   borderColor: '#fff',
//   margin: '10px 0',
// });
// const StyledTabs = styled(Tabs)({
//   background: '#808080',
//   borderRadius: '5px',
//   '& .Mui-selected': {
//     backgroundColor: '#000',
//     color: '#fff',
//     margin: '5px',
//   },
// });
// const AnimatedTab = styled(motion(Tab))({
//   position: 'relative',
//   listStyle: 'none',
//   cursor: 'pointer',
//   width: '50px',
//   height: '30px',
//   outline: 'none',
//   '& span': {
//     position: 'absolute',
//     left: '4px',
//     right: 0,
//     top: '6px',
//     bottom: 0,
//     zIndex: 1,
//     userSelect: 'none',
//     fontSize: '1rem',
//     color: '#E8E8FD',
//   },
// });
// const AnimatedCard = motion(Card);
// // a11yProps function for accessibility
// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }
// const DataTable = ({ columns, data, pagination }) => {
//   // Custom DataTable component logic here
//   return (
//     <div>
//       <p>DataTable</p>
//     </div>
//   );
// };
// const Prompts = React.memo(({
//   prompts: [
//     { title: 'Default Prompt 1', content: 'This is the content of prompt 1.' },
//     { title: 'Default Prompt 2', content: 'This is the content of prompt 2.' },
//     { title: 'Default Prompt 3', content: 'This is the content of prompt 3.' },
//   ],
//   onPromptSelect,
// }) => {
//   // const { profile, selectedWorkspace } = useContext(ChatbotUIContext);
// const { theme } = useMode();
// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// const chatStore = useChatStore();
// const [promptList, setPromptList] = useState();
// const [selectedPrompt, setSelectedPrompt] = useState(null);

// const handlePromptSelect = useCallback(
//   prompt => {
//     setSelectedPrompt(prompt);
//     onPromptSelect(prompt);
//   },
//   [onPromptSelect]
// );
// // const [promptList, setPromptList] = useState(chatStore.prompts);
// const dispatch = useDispatch();
// const [tempPromptKey, setTempPromptKey] = useState('');
// const [tempPromptValue, setTempPromptValue] = useState('');
// const [modalMode, setModalMode] = useState('');
// const [tempModifiedItem, setTempModifiedItem] = useState({});
// const [downloadURL, setDownloadURL] = useState('');
// const [showModal, setShowModal] = useState(false);
// const [name, setName] = useState(prompt.name);
// const [content, setContent] = useState(prompt.content);
// const itemRef = useRef(null);
// const [isHovering, setIsHovering] = useState(false);
// const [isTyping, setIsTyping] = useState(false);
// const [dialogOpen, setDialogOpen] = useState(false);
// const [value, setValue] = useState(0);
// // const [prompts, setPrompts] = useState([]);
// const [newPrompt, setNewPrompt] = useState({ title: '', content: '' });

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = e => {
//     setNewPrompt({ ...newPrompt, [e.target.name]: e.target.value });
//   };

// const handleAddPrompt = () => {
//   if (newPrompt.title && newPrompt.content) {
//     setPromptList([...prompts, newPrompt]);
//     setNewPrompt({ title: '', content: '' });
//   }
// };
// const handleOpenDialog = () => {
//   setDialogOpen(true);
// };

// const handleCloseDialog = () => {
//   setDialogOpen(false);
// };
// const changeShowModal = (mode, selected = { key: '', value: '' }) => {
//   if (mode === 'add') {
//     setTempPromptKey('');
//     setTempPromptValue('');
//   } else if (mode === 'modify') {
//     setTempModifiedItem({ ...selected });
//     setTempPromptKey(selected.key);
//     setTempPromptValue(selected.value);
//   } else if (mode === 'local_import') {
//     setTempPromptKey('local_import');
//     setTempPromptValue('');
//   }
//   setShowModal(!showModal);
//   setModalMode(mode);
// };
// const addPromptTemplate = () => {
//   for (const i of promptList) {
//     if (i.key === tempPromptKey) {
//       alert('Duplicate title, please re-enter');
//       return;
//     }
//     if (i.value === tempPromptValue) {
//       alert(`Duplicate content: ${tempPromptKey}, please re-enter`);
//       return;
//     }
//   }
//   setPromptList([
//     { key: tempPromptKey, value: tempPromptValue },
//     ...promptList,
//   ]);
//   alert('Prompt added successfully');
//   changeShowModal('');
// };
// const modifyPromptTemplate = () => {
//   let index = 0;

//   for (const i of promptList) {
//     if (i.key === tempModifiedItem.key && i.value === tempModifiedItem.value)
//       break;
//     index += 1;
//   }

//   const tempList = promptList.filter((_, i) => i !== index);

//   for (const i of tempList) {
//     if (i.key === tempPromptKey) {
//       alert('Title conflict detected, please re-enter');
//       return;
//     }
//     if (i.value === tempPromptValue) {
//       alert(`Content conflict detected: ${i.key}, please re-enter`);
//       return;
//     }
//   }

//   setPromptList([
//     { key: tempPromptKey, value: tempPromptValue },
//     ...tempList,
//   ]);
//   alert('Prompt modified successfully');
//   changeShowModal('');
// };
// const deletePromptTemplate = row => {
//   setPromptList(promptList.filter(item => item.key !== row.key));
//   alert('Prompt deleted successfully');
// };
// const clearPromptTemplate = () => {
//   setPromptList([]);
//   alert('Prompt list cleared successfully');
// };
// const importPromptTemplate = () => {
//   try {
//     const jsonData = JSON.parse(tempPromptValue);
//     for (const i of jsonData) {
//       let safe = true;
//       for (const j of promptList) {
//         if (j.key === i.key) {
//           alert(`Skipped due to duplicate title: ${i.key}`);
//           safe = false;
//           break;
//         }
//         if (j.value === i.value) {
//           alert(`Skipped due to duplicate content: ${i.key}`);
//           safe = false;
//           break;
//         }
//       }
//       if (safe)
//         setPromptList([{ key: i.key, value: i.value }, ...promptList]);
//     }
//     alert('Import successful');
//     changeShowModal('');
//   } catch {
//     alert('Invalid JSON format, please check');
//     changeShowModal('');
//   }
// };
// const exportPromptTemplate = () => {
//   const jsonDataStr = JSON.stringify(promptList);
//   const blob = new Blob([jsonDataStr], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'ChatGPTPromptTemplate.json';
//   link.click();
//   URL.revokeObjectURL(url);
// };
// const downloadPromptTemplate = async () => {
//   try {
//     // const response = await fetch(downloadURL);
//     const response = await fetch('/static/chatgpt-prompts-custom.json')
//       .then(response => response.blob())
//       .then(blob => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = 'chatgpt-prompts-custom.json';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       });
//     const jsonData = await response.json();
//     setTempPromptValue(JSON.stringify(jsonData));
//     importPromptTemplate();
//   } catch {
//     alert('Network error or invalid JSON file');
//   }
// };
// const [data, setData] = useState();
// const renderTemplate = () => {
//   const [keyLimit, valueLimit] = isMobile ? [6, 9] : [15, 50];
//   if (promptList.length > 0) {
//     setData(promptList);
//   } else {
//     const tempPromptData = JSON.parse(localStorage.getItem('promptStore'));
//     const dataArray = [];
//     tempPromptData.forEach(item => {
//       dataArray.push({ key: item.name, value: item.content });
//     });
//     setData(dataArray);
//   }
//   return data?.map((item, index) => {
//     let factor = isASCII(item.key) ? 10 : 1;
//     return {
//       id: index, // Required for DataGrid
//       renderKey: item?.key,
//       renderValue: item?.value,
//       key: item?.key,
//       value: item?.value,
//     };
//   });
// };
// const pagination = isMobile
//   ? { pageSize: 6, pageSlot: 5 }
//   : { pageSize: 7, pageSlot: 15 };

// const columns = [
//   { field: 'renderKey', headerName: 'Title', width: 150 },
//   { field: 'renderValue', headerName: 'Content', width: 450 },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     width: 150,
//     renderCell: params => (
//       <Box display="flex" justifyContent="center" gap={1}>
//         <Button
//           variant="text"
//           size="small"
//           onClick={() => changeShowModal('modify', params.row)}
//         >
//           Modify
//         </Button>
//         <Button
//           variant="text"
//           size="small"
//           color="error"
//           onClick={() => deletePromptTemplate(params.row)}
//         >
//           Delete
//         </Button>
//       </Box>
//     ),
//   },
// ];

// const handleKeyDown = e => {
//   if (e.key === 'Enter') {
//     e.stopPropagation();
//     itemRef.current?.click();
//   }
// };
//   return (
//     <>
// <Box
//   ref={itemRef}
//   sx={{
//     '&:hover': {
//       backgroundColor: 'accent.main',
//       opacity: 0.5,
//     },
//     display: 'flex',
//     width: '100%',
//     cursor: 'pointer',
//     alignItems: 'center',
//     borderRadius: '4px',
//     padding: '8px',
//     outline: 'none',
//   }}
//   tabIndex={0}
//   onKeyDown={handleKeyDown}
//   onMouseEnter={() => setIsHovering(true)}
//   onMouseLeave={() => setIsHovering(false)}
// >
//   <EditIcon sx={{ fontSize: 30 }} />{' '}
//   <Typography
//     sx={{
//       marginLeft: '12px',
//       flex: 1,
//       textOverflow: 'ellipsis',
//       overflow: 'hidden',
//       whiteSpace: 'nowrap',
//       fontSize: '14px',
//       fontWeight: '600',
//     }}
//   >
//     Prompts
//   </Typography>
// </Box>
// <Box
//   sx={{
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '1rem',
//     color: 'white',
//     borderRadius: '14px',
//     background: '#1c1c1c', // Slightly different background for the panel to distinguish it
//   }}
// >
//         <LayoutGroup>
// <StyledTabs
//   value={value}
//   onChange={handleChange}
//   indicatorColor="#fff"
// >
//   <AnimatedTab
//     label="Create"
//     {...a11yProps(0)}
//     component={motion.div}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     style={{ color: '#fff', borderRadius: '5px' }}
//   />
//   <AnimatedTab
//     label="Edit"
//     {...a11yProps(1)}
//     component={motion.div}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     style={{ color: '#fff', borderRadius: '5px' }}
//   />
//   <AnimatedTab
//     label="Recommend"
//     {...a11yProps(2)}
//     component={motion.div}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     style={{ color: '#fff', borderRadius: '5px' }}
//   />
//   <AnimatedTab
//     label="List"
//     {...a11yProps(3)}
//     component={motion.div}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     style={{ color: '#fff', borderRadius: '5px' }}
//   />
// </StyledTabs>
//         </LayoutGroup>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={value}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//           >
// <TabPanel
//   value={'Create'}
//   index={0}
//   sx={{
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     justifyContent: 'space-between',
//   }}
// >
//   <Box sx={{ mt: 2 }}>
//     <Typography variant="subtitle2">Name</Typography>
//     <StyledTextField
//       name="title"
//       label="Prompt Title"
//       value={newPrompt.title}
//       onChange={handleInputChange}
//       fullWidth
//     />
//   </Box>
//   <Box sx={{ mt: 2 }}>
//     <Typography variant="subtitle2">Name</Typography>
//     <TextareaAutosize
//       name="content"
//       placeholder="Enter your prompt here"
//       value={newPrompt.content}
//       onChange={handleInputChange}
//       style={{
//         width: '100%',
//         resize: 'none',
//         borderRadius: '4px',
//         border: '1px solid #dcdcdc',
//         padding: '8px',
//         fontSize: '14px',
//         // margin: '10px 0',
//         p: 2,
//         color: '#fff',
//         borderColor: 'grey',
//         background: '#000',
//       }}
//       // style={{ width: '100%', minHeight: '100px', marginTop: '10px' }}
//     />
//   </Box>
//               <StyledButton
//                 variant="outlined"
//                 onClick={handleAddPrompt}
//                 component={motion.button}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Add Prompt
//               </StyledButton>
//               {/* TODO: Integrate folders into promtps and then update the viewp prompt code below to be within the folder */}
//               <motion.div layout>
//                 {prompts.map((prompt, index) => (
//                   <AnimatedCard
//                     key={index}
//                     sx={{ marginBottom: 2, padding: 2 }}
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -50 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                   >
//                     <Typography variant="h6">{prompt.title}</Typography>
//                     <Typography variant="body2">{prompt.content}</Typography>
//                   </AnimatedCard>
//                 ))}
//               </motion.div>

//               <Typography variant="subtitle2">Upload Prompt</Typography>

//               <StyledButton variant="outlined" component="label">
//                 Choose File <input type="file" hidden />
//               </StyledButton>
//               <Box>
//                 <StyledButton
//                   variant="outlined"
//                   style={{ marginRight: '10px' }}
//                 >
//                   Cancel
//                 </StyledButton>
//                 <StyledButton variant="outlined">Save</StyledButton>
//               </Box>
//             </TabPanel>
// <TabPanel value={'Edit'} index={1}>
//   <motion.div layout>
//     <Box display="flex" justifyContent="flex-end" mb={2}>
//       <Button
//         variant="contained"
//         onClick={() => changeShowModal('add')}
//       >
//         Add
//       </Button>
//       <Button
//         variant="contained"
//         onClick={() => changeShowModal('local_import')}
//       >
//         Import
//       </Button>
//       <Button variant="contained" onClick={exportPromptTemplate}>
//         Export
//       </Button>
//       <Popover
//         open={isHovering}
//         content={
//           <Button onClick={clearPromptTemplate}>
//             Confirm clear data?
//           </Button>
//         }
//       >
//         <Button>Clear</Button>
//       </Popover>
//     </Box>
//     <DataTable
//       columns={columns}
//       data={renderTemplate()}
//       pagination={pagination}
//     />
//   </motion.div>
// </TabPanel>
// <TabPanel value={'Recommend'} index={2}>
//   <motion.div layout>
//     <Box p={2}>
//       <Typography variant="body2">
//         Note: Please verify the source of the downloaded JSON file,
//         as malicious JSON files may harm your computer!
//       </Typography>
//       <Grid container spacing={2} alignItems="center" mt={2}>
//         <Grid item xs={isMobile ? 12 : 10}>
//           <TextField
//             fullWidth
//             value={downloadURL}
//             onChange={e => setDownloadURL(e.target.value)}
//             placeholder="Enter a valid JSON URL"
//           />
//         </Grid>
//         <Grid item xs={isMobile ? 12 : 2}>
//           <Button
//             variant="contained"
//             fullWidth
//             disabled={!downloadURL.trim()}
//             onClick={downloadPromptTemplate}
//           >
//             Download
//           </Button>
//         </Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Box
//         sx={{
//           height: 360,
//           overflowY: 'auto',
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           flexWrap: 'wrap',
//           gap: 2,
//         }}
//       >
//         {PromptRecommend.map(info => (
//           <Card
//             key={info.key}
//             title={info.key}
//             sx={{ flex: isMobile ? '1 0 100%' : '1 0 30%' }}
//             variant="outlined"
//           >
//             <Typography variant="body2">{info.desc}</Typography>
//             <Box display="flex" justifyContent="flex-end">
//               <Button
//                 variant="text"
//                 component="a"
//                 href={info.url}
//                 target="_blank"
//               >
//                 🔗
//               </Button>
//               <Button
//                 variant="text"
//                 onClick={() =>
//                   setDownloadURL(
//                     `http://localhost:3001${info.downloadUrl}`
//                   )
//                 }
//               >
//                 ➕
//               </Button>
//             </Box>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   </motion.div>
// </TabPanel>
//             <TabPanel value={'List'} index={2}>
//               <motion.div layout>
//                 <Typography variant="subtitle2">
//                   Create Prompt From Template
//                 </Typography>

//                 {/* <Box>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleOpenDialog}
//                   >
//                     Open Prompt Template
//                   </Button>
//                   <ChatBotPromptDialog
//                     open={dialogOpen}
//                     onClose={handleCloseDialog}
//                   />
//                 </Box> */}
//               </motion.div>
//             </TabPanel>
//           </motion.div>
//         </AnimatePresence>
//       </Box>
//       <Modal
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <Card sx={{ p: 2 }}>
//           {modalMode === 'add' || modalMode === 'modify' ? (
//             <Box display="flex" flexDirection="column" gap={2}>
//               <Typography variant="h6">Template Title</Typography>
//               <StyledTextField
//                 value={tempPromptKey}
//                 onChange={e => setTempPromptKey(e.target.value)}
//                 placeholder="Enter title"
//               />
//               <Typography variant="h6">Template Content</Typography>
//               <StyledTextField
//                 value={tempPromptValue}
//                 onChange={e => setTempPromptValue(e.target.value)}
//                 placeholder="Enter content"
//                 multiline
//                 rows={4}
//               />
//               <Button
//                 variant="contained"
//                 fullWidth
//                 disabled={!tempPromptKey.trim() || !tempPromptValue.trim()}
//                 onClick={() =>
//                   modalMode === 'add'
//                     ? addPromptTemplate()
//                     : modifyPromptTemplate()
//                 }
//               >
//                 Confirm
//               </Button>
//             </Box>
//           ) : (
//             <Box display="flex" flexDirection="column" gap={2}>
//               <TextField
//                 value={tempPromptValue}
//                 onChange={e => setTempPromptValue(e.target.value)}
//                 placeholder="Paste JSON content"
//                 multiline
//                 rows={4}
//               />
//               <Button
//                 variant="contained"
//                 fullWidth
//                 disabled={!tempPromptKey.trim() || !tempPromptValue.trim()}
//                 onClick={importPromptTemplate}
//               >
//                 Import
//               </Button>
//             </Box>
//           )}
//         </Card>
//       </Modal>
//     </>
//   );
// });

// Prompts.displayName = 'Prompts';

// Prompts.propTypes = {
//   prompts: PropTypes.array,
//   onPromptSelect: PropTypes.func,
// };
// export default Prompts;
// {
//   /* {tab === 0 && (
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             width: '100%',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle2">Name</Typography>
//             <StyledTextField
//               placeholder="Prompt name..."
//               value={name}
//               onChange={e => setName(e.target.value)}
//               fullWidth
//               sx={{ mt: 1 }}
//               margin="normal"
//             />
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle2">Prompt</Typography>
//             <StyledTextField
//               placeholder="Prompt desc..."
//               value={name}
//               onChange={e => setName(e.target.value)}
//               fullWidth
//               sx={{ mt: 1 }}
//               margin="normal"
//             />
//             <TextareaAutosize
//               label="Descriiption of Prompt"
//               placeholder="Prompt..."
//               value={content}
//               onChange={e => setContent(e.target.value)}
//               minRows={6}
//               maxRows={20}
//               style={{
//                 width: '100%',
//                 resize: 'none',
//                 borderRadius: '4px',
//                 border: '1px solid #dcdcdc',
//                 padding: '8px',
//                 fontSize: '14px',
//                 p: 2,
//                 color: '#fff',
//                 borderColor: 'grey',
//                 background: '#000',
//               }}
//             />
//           </Box>
//           <Typography variant="subtitle2">Upload Prompt</Typography>

//           <StyledButton variant="outlined" component="label">
//             Choose File <input type="file" hidden />
//           </StyledButton>
//           <Box>
//             <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
//               Cancel
//             </StyledButton>
//             <StyledButton variant="outlined">Save</StyledButton>
//           </Box>

//           <Typography variant="subtitle2">
//             Create Prompt From Template
//           </Typography>

//           <Box>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpenDialog}
//             >
//               Open Prompt Template
//             </Button>
//             <ChatBotPromptDialog
//               open={dialogOpen}
//               onClose={handleCloseDialog}
//             />
//           </Box>
//         </Box>
//       )} */
// }
// {
//   /* {tab === 1 && (
//         <Box p={2}>
//           <Box display="flex" justifyContent="flex-end" mb={2}>
//             <Button variant="contained" onClick={() => changeShowModal('add')}>
//               Add
//             </Button>
//             <Button
//               variant="contained"
//               onClick={() => changeShowModal('local_import')}
//             >
//               Import
//             </Button>
//             <Button variant="contained" onClick={exportPromptTemplate}>
//               Export
//             </Button>
//             <Popover
//               content={
//                 <Button onClick={clearPromptTemplate}>
//                   Confirm clear data?
//                 </Button>
//               }
//             >
//               <Button>Clear</Button>
//             </Popover>
//           </Box>
//           <DataTable
//             columns={columns}
//             data={renderTemplate()}
//             pagination={pagination}
//           />
//         </Box>
//       )} */
// }
// {
//   /* {tab === 2 && (
//         <Box p={2}>
//           <Typography variant="body2">
//             Note: Please verify the source of the downloaded JSON file, as
//             malicious JSON files may harm your computer!
//           </Typography>
//           <Grid container spacing={2} alignItems="center" mt={2}>
//             <Grid item xs={isMobile ? 12 : 10}>
//               <TextField
//                 fullWidth
//                 value={downloadURL}
//                 onChange={e => setDownloadURL(e.target.value)}
//                 placeholder="Enter a valid JSON URL"
//               />
//             </Grid>
//             <Grid item xs={isMobile ? 12 : 2}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 disabled={!downloadURL.trim()}
//                 onClick={downloadPromptTemplate}
//               >
//                 Download
//               </Button>
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: 2 }} />
//           <Box
//             sx={{
//               height: 360,
//               overflowY: 'auto',
//               display: 'flex',
//               flexDirection: isMobile ? 'column' : 'row',
//               flexWrap: 'wrap',
//               gap: 2,
//             }}
//           >
//             {PromptRecommend.map(info => (
//               <Card
//                 key={info.key}
//                 title={info.key}
//                 sx={{ flex: isMobile ? '1 0 100%' : '1 0 30%' }}
//                 variant="outlined"
//               >
//                 <Typography variant="body2">{info.desc}</Typography>
//                 <Box display="flex" justifyContent="flex-end">
//                   <Button
//                     variant="text"
//                     component="a"
//                     href={info.url}
//                     target="_blank"
//                   >
//                     🔗
//                   </Button>
//                   <Button
//                     variant="text"
//                     onClick={() =>
//                       setDownloadURL(`http://localhost:3001${info.downloadUrl}`)
//                     }
//                   >
//                     ➕
//                   </Button>
//                 </Box>
//               </Card>
//             ))}
//           </Box>
//         </Box>
//       )} */
// }
