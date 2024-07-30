// const renderMessageContent = message => {
//   const { content } = message;

//   const isCode = content => /```[a-z]*\n[\s\S]*\n```/.test(content);
//   const isImage = content => /\.(jpeg|jpg|gif|png)$/.test(content);
//   const isLink = content => /^(http|https):\/\/[^ "]+$/.test(content);
//   const isList = content => /^- .+/m.test(content);
//   const isTable = content => /\|.+\|/.test(content);
//   const isInstruction = content => /^\/[a-z]+/.test(content);
//   const isHtml = content => /<\/?[a-z][\s\S]*>/i.test(content);
//   const isMarkdown = content =>
//     /(\*\*|__|~~|`|```|>|#+|\*|\d+\.)/.test(content);
// const codeBlockInsert = content => {
//   const div = document.createElement('div');
//   div.innerHTML = content;
//   const codeElements = div.querySelectorAll('code');
//   codeElements.forEach(codeElement => {
//     const codeContent = codeElement.innerText;
//     const preElement = document.createElement('pre');
//     preElement.style.background = '#2e2e2e';
//     preElement.style.padding = '10px';
//     preElement.style.borderRadius = '8px';
//     preElement.style.overflow = 'auto';
//     const highlightedCode = (
//       <SyntaxHighlighter language="javascript" style={docco}>
//         {codeContent}
//       </SyntaxHighlighter>
//     );
//     preElement.innerHTML = highlightedCode.props.children;
//     codeElement.replaceWith(preElement);
//   });
//   return div.innerHTML;
// };
// const codeContent = codeBlockInsert(content);
//   const markdownContent = md.render(content);
//   return (
//     <Box
//       sx={{
//         '& p': { marginBottom: 1 },
//         '& code': {
//           backgroundColor: '#f5f5f5',
//           padding: '2px 4px',
//           borderRadius: '4px',
//         },
//       }}
//       dangerouslySetInnerHTML={{ __html: markdownContent }}
//     />
//   );
// if (isInstruction(content)) {
//   return (
//     <Typography
//       variant="body1"
//       style={{ fontStyle: 'italic', color: '#888' }}
//     >
//       {content}
//     </Typography>
//   );
// } else if (isCode(content)) {
//   console.log('CODE BLOCK', content);
//   return (
//     <div>
//       <ChatCodeBlock language={message.language} value={content} />
//       <p>{message}</p>
//       <CodeBlockComponentB block={message} cls="no-highlight" />
//     </div>
//   );
// } else if (isImage(content)) {
//   return (
//     <>
//       <Button
//         onClick={() => handleImageClick(content)}
//         style={{
//           padding: 0,
//           minWidth: 0,
//           border: 'none',
//           background: 'none',
//         }}
//       >
//         <img
//           src={content}
//           alt="Chat content"
//           style={{
//             maxWidth: '100%',
//             borderRadius: '8px',
//             cursor: 'pointer',
//           }}
//           loading="lazy"
//         />
//       </Button>
//       {message.image_paths.map((path, index) => {
//         const item = sampleImages.find(image => image.path === path);
//         return (
//           <Button
//             key={index}
//             onClick={() =>
//               handleImageClick(
//                 path.startsWith('data') ? path : item?.base64
//               )
//             }
//             style={{
//               padding: 0,
//               minWidth: 0,
//               border: 'none',
//               background: 'none',
//             }}
//             onKeyPress={e =>
//               e.key === 'Enter' &&
//               handleImageClick(
//                 path.startsWith('data') ? path : item?.base64
//               )
//             }
//           >
//             <img
//               className="cursor-pointer rounded hover:opacity-50"
//               src={path.startsWith('data') ? path : item?.base64}
//               alt=""
//               width={300}
//               height={300}
//               loading="lazy"
//             />
//           </Button>
//         );
//       })}
//       {showImagePreview && selectedImage && (
//         <FilePreview
//           type="image"
//           item={selectedImage}
//           isOpen={showImagePreview}
//           onOpenChange={isOpen => {
//             setShowImagePreview(isOpen);
//             setSelectedImage(null);
//           }}
//         />
//       )}
//     </>
//   );
// } else if (isLink(content)) {
//   return (
//     <Typography variant="body1">
//       <MuiLink href={content} target="_blank" rel="noopener">
//         {content}
//       </MuiLink>
//     </Typography>
//   );
// } else if (isList(content)) {
//   return (
//     <Box component="ul" sx={{ paddingLeft: 2 }}>
//       {content.split('\n').map((item, index) => (
//         <Typography key={index} component="li" variant="body1">
//           {item.replace(/^-\s*/, '')}
//         </Typography>
//       ))}
//     </Box>
//   );
// } else if (isTable(content)) {
//   const rows = content.split('\n').filter(row => row.trim() !== '');
//   const headers = rows[0].split('|').map(header => header.trim());
//   const dataRows = rows
//     .slice(1)
//     .map(row => row.split('|').map(cell => cell.trim()));

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             {headers.map((header, index) => (
//               <TableCell key={index}>{header}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {dataRows.map((row, rowIndex) => (
//             <TableRow key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <TableCell key={cellIndex}>{cell}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// } else if (isHtml(content)) {
//   const styledHtml = applyCodeStyles(content);
//   return (
//     <Typography
//       variant="body1"
//       dangerouslySetInnerHTML={{ __html: styledHtml }}
//       style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
//     />
//   );
// } else if (isMarkdown(content)) {
//   const codeBlockInsert = content => {
//     const div = document.createElement('div');
//     div.innerHTML = content;
//     const codeElements = div.querySelectorAll('code');
//     codeElements.forEach(codeElement => {
//       const codeContent = codeElement.innerText;
//       const preElement = document.createElement('pre');
//       preElement.style.background = '#2e2e2e';
//       preElement.style.padding = '10px';
//       preElement.style.borderRadius = '8px';
//       preElement.style.overflow = 'auto';
//       const highlightedCode = (
//         <SyntaxHighlighter language="javascript" style={docco}>
//           {codeContent}
//         </SyntaxHighlighter>
//       );
//       preElement.innerHTML = highlightedCode.props.children;
//       codeElement.replaceWith(preElement);
//     });
//     return div.innerHTML;
//   };
//   const codeContent = codeBlockInsert(content);
//   const markdownContent = md.render(codeContent);
//   return (
//     <Box
//       sx={{
//         '& p': { marginBottom: 1 },
//         '& code': {
//           backgroundColor: '#f5f5f5',
//           padding: '2px 4px',
//           borderRadius: '4px',
//         },
//       }}
//       dangerouslySetInnerHTML={{ __html: markdownContent }}
//     />
//   );
// } else {
//   return <Typography variant="body1">{content}</Typography>;
// }
// };
// const applyCodeStyles = html => {
//   const div = document.createElement('div');
//   div.innerHTML = html;

//   const codeElements = div.querySelectorAll('code');
//   codeElements.forEach(codeElement => {
//     const codeContent = codeElement.innerText;
//     const preElement = document.createElement('pre');
//     preElement.style.background = '#2e2e2e';
//     preElement.style.padding = '10px';
//     preElement.style.borderRadius = '8px';
//     preElement.style.overflow = 'auto';
//     const highlightedCode = (
//       <SyntaxHighlighter language="javascript" style={docco}>
//         {codeContent}
//       </SyntaxHighlighter>
//     );
//     preElement.innerHTML = highlightedCode.props.children;
//     codeElement.replaceWith(preElement);
//   });

//   return div.innerHTML;
// };
