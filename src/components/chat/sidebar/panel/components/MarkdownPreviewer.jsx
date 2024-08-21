// import DOMPurify from 'dompurify';
// import marked from 'marked';
// import React, { useState } from 'react';
// import './MarkdownPreviewer.css';

// const MarkdownPreviewer = () => {
//   const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Previewer!

// ## This is a sub-heading...
// ### And here's some other cool stuff:

// Heres some code, \`<div></div>\`, between 2 backticks.

// \`\`\`
// // this is multi-line code:
// function anotherExample(firstLine, lastLine) {
//   if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
//     return multiLineCode;
//   }
// }
// \`\`\`

// You can also make text **bold**... whoa!
// Or _italic_.
// Or... wait for it... **_both!_**
// And feel free to go crazy ~~crossing stuff out~~.

// There's also [links](https://www.freecodecamp.com), and
// > Block Quotes!

// And if you want to get really crazy, even tables:

// Wild Header | Crazy Header | Another Header?
// ------------ | ------------- | -------------
// Your content can | be here, and it | can be here....
// And here. | Okay. | I think we get it.

// - And of course there are lists.
//   - Some are bulleted.
//      - With different indentation levels.
//         - That look like this.

// 1. And there are numbered lists too.
// 1. Use just 1s if you want!
// 1. And last but not least, let's not forget embedded images:

// ![React Logo w/ Text](https://goo.gl/Umyytc)
// `);

//   const handleChange = event => {
//     setMarkdown(event.target.value);
//   };

//   const createMarkup = () => {
//     const cleanHTML = DOMPurify.sanitize(marked(markdown));
//     return { __html: cleanHTML };
//   };

//   return (
//     <div className="markdown-previewer">
//       <div className="editor">
//         <h2>Markdown Editor</h2>
//         <textarea id="editor" value={markdown} onChange={handleChange} />
//       </div>
//       <div className="preview">
//         <h2>Preview</h2>
//         <div id="preview" dangerouslySetInnerHTML={createMarkup()} />
//       </div>
//     </div>
//   );
// };

// export default MarkdownPreviewer;
