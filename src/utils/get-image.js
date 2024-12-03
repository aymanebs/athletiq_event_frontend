export const getImageUrl = (filename) => {
    const baseUrl = import.meta.env.BACKEND_URL || 'http://localhost:3000';
    return `${baseUrl}/${filename}`;
  };
  