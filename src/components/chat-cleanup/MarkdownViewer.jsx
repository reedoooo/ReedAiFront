// import mdKatex from '@traptitech/markdown-it-katex';
// import hljs from 'highlight.js';
// import MarkdownIt from 'markdown-it';
// import React, { useMemo, useRef } from 'react';

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

// const MarkdownViewer = ({
//   inversion = false,
//   error = false,
//   text = '',
//   loading = false,
// }) => {
//   const isMobile = window.innerWidth <= 768;
//   const textRef = useRef(null);

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

//   const wrapClass = useMemo(
//     () =>
//       [
//         'text-wrap',
//         'min-w-[20px]',
//         'rounded-md',
//         isMobile ? 'p-2' : 'px-3 py-2',
//         inversion ? 'bg-[#d2f9d1]' : 'bg-[#f4f6f8]',
//         inversion ? 'dark:bg-[#a1dc95]' : 'dark:bg-[#1e1e20]',
//         error && 'text-red-500',
//       ]
//         .filter(Boolean)
//         .join(' '),
//     [isMobile, inversion, error]
//   );

//   const formattedText = useMemo(() => {
//     const value = text || '';
//     return !inversion ? mdi.render(value) : value;
//   }, [text, inversion, mdi]);

//   return (
//     <div className={`text-black ${wrapClass}`}>
//       {loading ? (
//         <span className="dark:text-white w-[4px] h-[20px] block animate-blink" />
//       ) : (
//         <div
//           ref={textRef}
//           className="leading-relaxed break-words"
//           tabIndex="-1"
//         >
//           {!inversion ? (
//             <div
//               className="markdown-body"
//               dangerouslySetInnerHTML={{ __html: formattedText }}
//             />
//           ) : (
//             <div className="whitespace-pre-wrap">{formattedText}</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MarkdownViewer;
