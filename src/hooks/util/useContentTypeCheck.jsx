export const useTypeCheck = () => {
  const checkType = content => {
    const isJsonText = content => {
      try {
        JSON.parse(content);
        return true;
      } catch {
        return false;
      }
    };
    const isCode = content => {
      const codeRegex = /```[\s\S]*?```/;
      return codeRegex.test(content);
    };
    const isMarkdown = content => {
      const markdownRegex = /(\*\*|__|~~|`|```|>|#+|\*|\d+\.)/;
      return markdownRegex.test(content);
    };
    const isPlainText = content => {
      const plainTextRegex = /^[\s\S]*$/;
      return plainTextRegex.test(content);
    };
    const isImage = content => {
      const imageRegex = /\.(jpeg|jpg|gif|png)$/i;
      return imageRegex.test(content);
    };
    const isLink = content => {
      const linkRegex = /^(http|https):\/\/[^ "]+$/;
      return linkRegex.test(content);
    };
    const isList = content => {
      const listRegex = /^- .+/m;
      return listRegex.test(content);
    };
    const isTable = content => {
      const tableRegex = /\|.+\|/;
      return tableRegex.test(content);
    };
    const isInstruction = content => {
      const instructionRegex = /^\/[a-z]+/;
      return instructionRegex.test(content);
    };
    const isHtml = content => {
      const htmlRegex = /<\/?[a-z][\s\S]*>/i;
      return htmlRegex.test(content);
    };

    if (isCode(content)) {
      console.log('isCode');
      return 'code';
    } else if (isMarkdown(content)) {
      console.log('isMarkdown');
      return 'markdown';
    } else if (isHtml(content)) {
      console.log('isHtml');
      return 'html';
    } else if (isImage(content)) {
      console.log('isImage');
      return 'image';
    } else if (isLink(content)) {
      console.log('isLink');
      return 'link';
    } else if (isList(content)) {
      console.log('isList');
      return 'list';
    } else if (isTable(content)) {
      console.log('isTable');
      return 'table';
    } else if (isInstruction(content)) {
      console.log('isInstruction');
      return 'instruction';
    } else if (isJsonText(content)) {
      console.log('isJsonText');
      return 'json';
    } else {
      console.log('isPlainText');
      return 'text';
    }
  };
  return { checkType };
};

export default useTypeCheck;
