import mimeTypes from '@/utilities/file-extention-to-mime-type.json';

async function getFileMimeType(extension) {  
  if (!extension.startsWith('.')) {
    extension = '.' + extension;
  }

  let mimeType = mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
  return mimeType;
}

export const getMimeType = async (format) => await getFileMimeType(format)