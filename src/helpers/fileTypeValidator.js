const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg'];
const videoExtensions = ['mp4', 'mkv', 'flv', 'webm', 'avi', 'mov', 'wmv'];

export function getFileType(filename) {
  const ext = filename.split('.').pop().toLowerCase();

  if (imageExtensions.includes(ext)) {
    return 'image';
  }
  
  if (videoExtensions.includes(ext)) {
    return 'video';
  }

  return 'unknown';
}