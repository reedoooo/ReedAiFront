// // ChatMessage.jsx
// import { Box, Modal, Paper, Typography } from '@mui/material';
// import mdKatex from '@traptitech/markdown-it-katex';
// import hljs from 'highlight.js';

// import MarkdownIt from 'markdown-it';
// import { useMemo, useState } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import 'styles/ChatStyles.css';
// import { CheckCircleIcon, DownloadIcon } from 'assets/humanIcons';
// import { useCopyToClipboard } from 'hooks/useCopyToClipboard';

// function highlightBlock(str, lang) {
//   return `
//     <pre class="code-block-wrapper">
//       <div class="code-block-header">
//         <span class="code-block-header__lang">${lang}</span>
//         <span class="code-block-header__copy">Copy</span>
//       </div>
//       <code class="hljs code-block-body ${lang}">${str}</code>
//     </pre>
//   `;
// }

// // const renderMessageContent = message => {
// //   const { content } = message;

// //   // const isCode = content => /```[a-z]*\n[\s\S]*\n```/.test(content);
// //   // const isImage = content => /\.(jpeg|jpg|gif|png)$/.test(content);
// //   // const isLink = content => /^(http|https):\/\/[^ "]+$/.test(content);
// //   // const isHtml = content => /<\/?[a-z][\s\S]*>/i.test(content);
// //   // const isMarkdown = content =>
// //   //   /(\*\*|__|~~|`|```|>|#+|\*|\d+\.)/.test(content);
// //   // const md = new MarkdownIt({
// //   //   html: true,
// //   //   highlight: function (str, lang) {
// //   //     if (lang && SyntaxHighlighter.supportedLanguages.includes(lang)) {
// //   //       try {
// //   //         return SyntaxHighlighter.highlight(str, {
// //   //           language: lang,
// //   //           style: oneDark,
// //   //         });
// //   //       } catch (__) {
// //   //         /* empty */
// //   //       }
// //   //     }
// //   //     return (
// //   //       '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
// //   //     );
// //   //   },
// //   // });
// //   // const mdi = useMemo(
// //   //   () =>
// //   //     new MarkdownIt({
// //   //       html: false,
// //   //       linkify: true,
// //   //       highlight: (code, language) => {
// //   //         const validLang = !!(language && hljs.getLanguage(language));
// //   //         if (validLang) {
// //   //           const lang = language || '';
// //   //           return highlightBlock(hljs.highlight(lang, code, true).value, lang);
// //   //         }
// //   //         return highlightBlock(hljs.highlightAuto(code).value, '');
// //   //       },
// //   //     }).use(mdKatex, {
// //   //       blockClass: 'katexmath-block rounded-md p-[10px]',
// //   //       errorColor: '#cc0000',
// //   //     }),
// //   //   []
// //   // );
// //   // if (isCode(content)) {
// //   //   return (
// //   //     <SyntaxHighlighter language="javascript" style={oneDark}>
// //   //       {content}
// //   //     </SyntaxHighlighter>
// //   //   );
// //   // }
// //   // if (isHtml(content)) {
// //   //   return (
// //   //     <Typography
// //   //       variant="body1"
// //   //       dangerouslySetInnerHTML={{ __html: content }}
// //   //       style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
// //   //     />
// //   //   );
// //   // }
// //   // if (isMarkdown(content)) {
// //   //   const markdownContent = md.render(content);
// //   //   const katexContent = mdi.render(markdownContent);
// //   //   return (
// //   //     <Box
// //   //       sx={{
// //   //         '& p': { marginBottom: 1 },
// //   //         '& code': {
// //   //           backgroundColor: '#f5f5f5',
// //   //           padding: '2px 4px',
// //   //           borderRadius: '4px',
// //   //         },
// //   //       }}
// //   //       dangerouslySetInnerHTML={{ __html: katexContent }}
// //   //     />
// //   //   );
// //   // }

// //   return <Typography variant="body1">{content}</Typography>;
// // };

// const ChatMessage = ({ message }) => {
//   const [showImagePreview, setShowImagePreview] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const isCode = content => /```[a-z]*\n[\s\S]*\n```/.test(content);
//   const isImage = content => /\.(jpeg|jpg|gif|png)$/.test(content);
//   const isLink = content => /^(http|https):\/\/[^ "]+$/.test(content);
//   const isHtml = content => /<\/?[a-z][\s\S]*>/i.test(content);
//   const isMarkdown = content =>
//     /(\*\*|__|~~|`|```|>|#+|\*|\d+\.)/.test(content);
//   const md = new MarkdownIt({
//     html: true,
//     highlight: function (str, lang) {
//       if (lang && SyntaxHighlighter.supportedLanguages.includes(lang)) {
//         try {
//           return SyntaxHighlighter.highlight(str, {
//             language: lang,
//             style: oneDark,
//           });
//         } catch (__) {
//           /* empty */
//         }
//       }
//       return (
//         '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
//       );
//     },
//   });
//   const mdi = useMemo(
//     () =>
//       new MarkdownIt({
//         html: false,
//         linkify: true,
//         highlight: (code, language) => {
//           const validLang = !!(language && hljs.getLanguage(language));
//           if (validLang) {
//             const lang = language || '';
//             return highlightBlock(hljs.highlight(lang, code, true).value, lang);
//           }
//           return highlightBlock(hljs.highlightAuto(code).value, '');
//         },
//       }).use(mdKatex, {
//         blockClass: 'katexmath-block rounded-md p-[10px]',
//         errorColor: '#cc0000',
//       }),
//     []
//   );
//   if (isCode(message)) {
//     return (
//       <SyntaxHighlighter language="javascript" style={oneDark}>
//         {message}
//       </SyntaxHighlighter>
//     );
//   }
//   if (isHtml(message)) {
//     return (
//       <Typography
//         variant="body1"
//         dangerouslySetInnerHTML={{ __html: message }}
//         style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
//       />
//     );
//   }
//   if (isMarkdown(message)) {
//     const markdownContent = md.render(message);
//     const katexContent = mdi.render(markdownContent);
//     return (
//       <Box
//         sx={{
//           '& p': { marginBottom: 1 },
//           '& code': {
//             backgroundColor: '#f5f5f5',
//             padding: '2px 4px',
//             borderRadius: '4px',
//           },
//         }}
//         dangerouslySetInnerHTML={{ __html: katexContent }}
//       />
//     );
//   }
//   return (
//     <div className="flex flex-col-reverse w-full mb-2 overflow-auto max-h-[75vh]">
//       <Paper sx={{ marginBottom: 2, padding: 2 }} elevation={2}>
//         <Box>{message.content}</Box>
//         <Modal
//           open={showImagePreview}
//           onClose={() => setShowImagePreview(false)}
//           aria-labelledby="image-preview"
//           aria-describedby="preview-of-selected-image"
//         >
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               bgcolor: 'background.paper',
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <img src={selectedImage} alt="Preview" style={{ width: '100%' }} />
//           </Box>
//         </Modal>
//       </Paper>
//     </div>
//   );
// };

// export default ChatMessage;
