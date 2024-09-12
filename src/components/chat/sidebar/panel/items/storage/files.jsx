import { toast } from 'sonner';

const FILE_STORAGE_KEY = 'uploadedFiles';

export const uploadFile = async (file, payload) => {
  const SIZE_LIMIT = parseInt(
    process.env.NEXT_PUBLIC_USER_FILE_SIZE_LIMIT || '10000000'
  );

  if (file.size > SIZE_LIMIT) {
    throw new Error(
      `File must be less than ${Math.floor(SIZE_LIMIT / 1000000)}MB`
    );
  }

  const filePath = `${payload.user_id}/${Buffer.from(payload.file_id).toString('base64')}`;

  try {
    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const fileContent = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

    // Get existing files from localStorage
    const existingFiles =
      JSON.parse(localStorage.getItem(FILE_STORAGE_KEY)) || {};

    // Add new file to the list
    existingFiles[filePath] = {
      name: payload.name,
      user_id: payload.user_id,
      file_id: payload.file_id,
      fileContent,
      size: file.size,
      createdAt: new Date().toISOString(),
    };

    // Save updated files list back to localStorage
    localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(existingFiles));

    return filePath;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

export const deleteFileFromStorage = async filePath => {
  try {
    // Get existing files from localStorage
    const existingFiles =
      JSON.parse(localStorage.getItem(FILE_STORAGE_KEY)) || {};

    // Remove the file from the list
    if (existingFiles[filePath]) {
      delete existingFiles[filePath];
      localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(existingFiles));
      toast.success('File removed successfully!');
    } else {
      toast.error('File not found!');
    }
  } catch (error) {
    console.error('Failed to remove file:', error);
    toast.error('Failed to remove file!');
  }
};

export const getFileFromStorage = async filePath => {
  try {
    // Get existing files from localStorage
    const existingFiles =
      JSON.parse(localStorage.getItem(FILE_STORAGE_KEY)) || {};

    if (!existingFiles[filePath]) {
      throw new Error('File not found');
    }

    // Return the file content (in this case, a base64 string)
    return existingFiles[filePath].fileContent;
  } catch (error) {
    console.error(`Error downloading file with path: ${filePath}`, error);
    throw new Error('Error downloading file');
  }
};
