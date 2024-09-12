import PromptForm from './prompt-form';

export const AddPrompt = ({
  fileName,
  setFileName,
  fileContent,
  setFileContent,
}) => (
  <PromptForm
    fileName={fileName}
    setFileName={setFileName}
    fileContent={fileContent}
    setFileContent={setFileContent}
  />
);

export default AddPrompt;
