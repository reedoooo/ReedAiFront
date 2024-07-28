// const PromptModal = ({ visible, onVisibilityChange }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('');
//   const [tempPromptKey, setTempPromptKey] = useState('');
//   const [tempPromptValue, setTempPromptValue] = useState('');
//   const [downloadURL, setDownloadURL] = useState('');
//   const promptStore = usePromptStore();
//   const promptList = useState(promptStore.promptList);

//   const handleChangeShowModal = (mode, selected = { key: '', value: '' }) => {
//     setModalMode(mode);
//     if (mode === 'add') {
//       setTempPromptKey('');
//       setTempPromptValue('');
//     } else if (mode === 'modify') {
//       setTempPromptKey(selected.key);
//       setTempPromptValue(selected.value);
//     }
//     setShowModal(!showModal);
//   };

//   const handleAddPromptTemplate = () => {
//     const existingPrompt = promptList.find(
//       item => item.key === tempPromptKey || item.value === tempPromptValue
//     );
//     if (existingPrompt) {
//       alert('Duplicate key or value');
//       return;
//     }
//     promptList.unshift({ key: tempPromptKey, value: tempPromptValue });
//     setShowModal(false);
//   };

//   const handleModifyPromptTemplate = () => {
//     const index = promptList.findIndex(item => item.key === tempPromptKey);
//     if (index !== -1) {
//       promptList[index] = { key: tempPromptKey, value: tempPromptValue };
//       setShowModal(false);
//     }
//   };

//   const handleDeletePromptTemplate = row => {
//     const filteredList = promptList.filter(item => item.key !== row.key);
//     promptStore.updatePromptList(filteredList);
//   };

//   const handleExportPromptTemplate = () => {
//     const jsonDataStr = JSON.stringify(promptList);
//     const blob = new Blob([jsonDataStr], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'ChatGPTPromptTemplate.json';
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleDownloadPromptTemplate = async () => {
//     try {
//       const response = await fetch(downloadURL);
//       const jsonData = await response.json();
//       jsonData.forEach(item => {
//         if (
//           !promptList.find(p => p.key === item.key || p.value === item.value)
//         ) {
//           promptList.unshift(item);
//         }
//       });
//       setShowModal(false);
//     } catch {
//       alert('Failed to download or parse JSON');
//     }
//   };

//   const renderTemplate = useMemo(() => {
//     return promptList.map(item => ({
//       renderKey:
//         item.key.length > 15 ? `${item.key.substring(0, 15)}...` : item.key,
//       renderValue:
//         item.value.length > 50
//           ? `${item.value.substring(0, 50)}...`
//           : item.value,
//       key: item.key,
//       value: item.value,
//     }));
//   }, [promptList]);

//   return (
//     <div>
//       <Dialog open={visible} onClose={() => onVisibilityChange(false)}>
//         <DialogTitle>Manage Prompts</DialogTitle>
//         <DialogContent>
//           <Tabs>
//             <Tab label="Local Management" />
//             <Tab label="Online Import" />
//           </Tabs>
//           <div>
//             <Button
//               onClick={() => handleChangeShowModal('add')}
//               startIcon={<AddIcon />}
//             >
//               Add
//             </Button>
//             <Button onClick={() => handleChangeShowModal('import')}>
//               Import
//             </Button>
//             <Button onClick={handleExportPromptTemplate}>Export</Button>
//             <Button startIcon={<ClearIcon />}>Clear</Button>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Title</TableCell>
//                     <TableCell>Content</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {renderTemplate.map(row => (
//                     <TableRow key={row.key}>
//                       <TableCell>{row.renderKey}</TableCell>
//                       <TableCell>{row.renderValue}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           onClick={() => handleChangeShowModal('modify', row)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDeletePromptTemplate(row)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//           <div>
//             <TextField
//               value={downloadURL}
//               onChange={e => setDownloadURL(e.target.value)}
//               placeholder="Enter JSON URL"
//             />
//             <Button
//               onClick={handleDownloadPromptTemplate}
//               disabled={!downloadURL.trim()}
//             >
//               Download
//             </Button>
//             <div>
//               {PromptRecommend.map(info => (
//                 <Card key={info.key} variant="outlined">
//                   <Typography variant="h6">{info.key}</Typography>
//                   <Typography>{info.desc}</Typography>
//                   <div>
//                     <Button component="a" href={info.url} target="_blank">
//                       Link
//                     </Button>
//                     <Button onClick={() => setDownloadURL(info.downloadUrl)}>
//                       Add
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => onVisibilityChange(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={showModal} onClose={() => setShowModal(false)}>
//         <DialogTitle>
//           {modalMode === 'add' ? 'Add Prompt' : 'Modify Prompt'}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             value={tempPromptKey}
//             onChange={e => setTempPromptKey(e.target.value)}
//           />
//           <TextField
//             label="Content"
//             value={tempPromptValue}
//             onChange={e => setTempPromptValue(e.target.value)}
//             multiline
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={
//               modalMode === 'add'
//                 ? handleAddPromptTemplate
//                 : handleModifyPromptTemplate
//             }
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };
