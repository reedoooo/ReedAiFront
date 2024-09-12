export const uploadMessageImage = async (path, image) => {
  const imageSizeLimit = 6000000; // 6MB

  if (image.size > imageSizeLimit) {
    throw new Error(`Image must be less than ${imageSizeLimit / 1000000}MB`);
  }

  const reader = new FileReader();
  reader.readAsDataURL(image);

  const fileContent = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const storedImages = JSON.parse(localStorage.getItem('message_images')) || {};
  storedImages[path] = fileContent;

  localStorage.setItem('message_images', JSON.stringify(storedImages));

  return path;
};

export const getMessageImageFromStorage = async filePath => {
  const storedImages = JSON.parse(localStorage.getItem('message_images')) || {};

  if (!storedImages[filePath]) {
    throw new Error('Error downloading message image');
  }

  return storedImages[filePath];
};
