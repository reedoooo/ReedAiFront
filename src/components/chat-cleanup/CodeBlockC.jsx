// import { EditorView, basicSetup } from '@codemirror/basic-setup';
// import { html } from '@codemirror/lang-html';
// import { javascript } from '@codemirror/lang-javascript';
// import { StreamLanguage } from '@codemirror/language';
// import { go } from '@codemirror/legacy-modes/mode/go';
// import { EditorState, Compartment } from '@codemirror/state';
// import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
// import { useEffect, useState, useRef } from 'react';

// const CodeBlockC = ({
//   height,
//   code,
//   editable = false,
//   onChange = () => {},
// }) => {
//   const [copyText, setCopyText] = useState('Copy');
//   const editorRef = useRef(null);
//   const languageConf = new Compartment();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setCopyText('Copy');
//     }, 2000);
//     return () => clearTimeout(timeout);
//   }, [copyText]);

//   useEffect(() => {
//     const detectLanguage = code => {
//       if (/^\s*</.test(code)) {
//         return html();
//       } else if (/^\s*(const|let|var|function)/.test(code)) {
//         return javascript();
//       } else {
//         return StreamLanguage.define(go);
//       }
//     };

//     const state = EditorState.create({
//       doc: code,
//       extensions: [
//         basicSetup,
//         languageConf.of(detectLanguage(code)),
//         EditorView.updateListener.of(update => {
//           if (update.docChanged) {
//             onChange(update.state.doc.toString());
//           }
//         }),
//         tokyoNight,
//       ],
//     });

//     const view = new EditorView({
//       state,
//       parent: editorRef.current,
//     });

//     return () => {
//       view.destroy();
//     };
//   }, [code, onChange, languageConf]);

//   return (
//     <div className={`relative h-${height}px overflow-scroll`}>
//       <button
//         className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
//         onClick={() => {
//           navigator.clipboard.writeText(code);
//           setCopyText('Copied!');
//         }}
//       >
//         {copyText}
//       </button>
//       <div
//         ref={editorRef}
//         className="rounded-md overflow-scroll"
//         style={{ minHeight: `${height}px` }}
//       ></div>
//     </div>
//   );
// };

// export default CodeBlockC;
