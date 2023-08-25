export const getFirstCharacter = (text?: string) => {
  if (!text?.trim()) return "";
  return text.trim()[0];
};
