// {/* <Card sx={cardStyles}>
//   <CardContent sx={{ p: 2 }}>
//     <Box
//       sx={{
//         backgroundColor: '#333',
//         borderRadius: 1,
//         p: 2,
//         color: 'white',
//       }}
//     >
//       <EditorContent editor={editor} />
//     </Box>
//   </CardContent>
//   <CardActions sx={cardActionsStyles}>
//     <Box>
//       {/* -- Insert Markdown Button -- */}
//       <IconButton onClick={() => handleMarkdownInsert(editor)}>
//         <CodeIcon style={{ color: theme.palette.primary.main, fontSize: 20 }} />
//       </IconButton>
//       {/* -- Insert Emoji Button -- */}
//       <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//         <EmojiEmotionsIcon
//           style={{ color: theme.palette.primary.main, fontSize: 20 }}
//         />
//       </IconButton>
//       {showEmojiPicker && (
//         <Picker
//           data={data}
//           onEmojiSelect={handleSelectEmoji}
//           theme="dark"
//           style={{ position: 'absolute', bottom: '60px', left: '20px' }}
//         />
//       )}
//       {/* -- Insert Snippets Button -- */}
//       <SnippetsDropDown
//         anchorEl={snippetsMenu.anchorEl}
//         handleClose={snippetsMenu.handleMenuClose}
//         handleMenuOpen={snippetsMenu.handleMenuOpen}
//         handleSnippetSelect={snippet => handleSnippetSelect(editor, snippet)}
//       />
//       {/* -- Insert File Button -- */}
//       <FileUpload
//         onFileChange={handleFileChange}
//         iconStyle={{ color: theme.palette.primary.main, fontSize: 20 }}
//       />
//       {/* -- Insert Form Button -- */}
//       <FormTemplatesDropDown
//         anchorEl={formMenu.anchorEl}
//         handleClose={formMenu.handleMenuClose}
//         handleMenuOpen={formMenu.handleMenuOpen}
//         handleFormSelect={form => handleFormContentInsert(editor, form)}
//       />
//       {/* -- Insert Settings Button -- */}
//       <SettingsDialog
//         open={settingsDialog.open}
//         onClose={settingsDialog.handleClose}
//         tabValue={settingsTab}
//         handleTabChange={(event, newValue) =>
//           handleSettingsTabChange(event, newValue)
//         }
//       />
//       <APIModal
//         open={apiModalDialog.open}
//         onClose={apiModalDialog.handleClose}
//         setApiKey={setApiKey}
//         handleOpenApiModal={apiModalDialog.handleOpen}
//       />
//     </Box>
//     <IconButton onClick={handleSendMessage}>
//       <SendIcon style={{ color: theme.palette.primary.main, fontSize: 20 }} />
//     </IconButton>
//   </CardActions>
// </Card>; */}

// !-------------------]

{
  /* <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
{messages.map((message, index) => (
	<Box
		key={index}
		sx={{
			display: 'flex',
			justifyContent:
				message.type === 'user' ? 'flex-end' : 'flex-start',
			mb: 2,
		}}
	>
		{message.type === 'bot' && (
			<img
				src="/path/to/bot-avatar.png"
				alt="Bot Avatar"
				style={{ width: 40, height: 40, marginRight: 8 }}
			/>
		)}
		<Box
			sx={{
				backgroundColor:
					message.type === 'user' ? '#26242C' : '#1C1C1C',
				borderRadius: 2,
				p: 2,
			}}
		>
			<Typography>{message.content}</Typography>
		</Box>
	</Box>
))}
{loading && (
	<Typography sx={{ color: 'white', textAlign: 'center' }}>
		Loading...
	</Typography>
)}
{error && (
	<Typography sx={{ color: 'red', textAlign: 'center' }}>
		{error}
	</Typography>
)}
</Box> */
}
