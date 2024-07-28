// // import { StreamLanguage } from '@codemirror/language';
// // import { go } from '@codemirror/legacy-modes/mode/go';
// // import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
// // import CodeMirror from '@uiw/react-codemirror';
// import React, { useEffect, useState, forwardRef } from 'react';
// import ReactQuill from 'react-quill';
// import HorizonUiCodeBlock from 'components/data/code/HorizonUiCodeBlock';
// // import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import 'styles/_textEditor.scss';

// export const MarkdownEditor = forwardRef(({ initialValue, onChange }, ref) => {
//   const [value, setValue] = useState(initialValue);

//   const handleQuillChange = content => {
//     setValue(content);
//     onChange(content);
//   };

//   useEffect(() => {
//     const observer = new MutationObserver(mutations => {
//       mutations.forEach(mutation => {
//         // Handle mutation events
//       });
//     });

//     if (ref?.current) {
//       observer.observe(ref.current.getEditor().root, {
//         childList: true,
//         subtree: true,
//       });
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, [ref]);

//   return (
//     <div className="markdown-editor">
//       <HorizonUiCodeBlock
//         height={450}
//         code={value}
//         editable={true}
//         onChange={setValue}
//       />
//       <ReactQuill
//         ref={ref}
//         value={value}
//         onChange={handleQuillChange}
//         modules={{
//           toolbar: false,
//         }}
//       />
//     </div>
//   );
// });

// MarkdownEditor.displayName = 'MarkdownEditor';

// export default MarkdownEditor;
