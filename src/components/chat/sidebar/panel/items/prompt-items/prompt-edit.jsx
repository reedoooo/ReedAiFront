import PromptForm from './prompt-form';

export const EditPrompt = ({
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

export default EditPrompt;
