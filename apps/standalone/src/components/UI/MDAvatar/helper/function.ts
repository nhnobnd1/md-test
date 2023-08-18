import { LIST_COLOR } from "src/components/UI/MDAvatar/helper/constant";

export const CharacterPosition = (character?: string) => {
  if (!character) return 0;
  // Lấy mã Unicode của ký tự đầu tiên trong chuỗi
  const unicode = character.charCodeAt(0);

  // Kiểm tra xem ký tự có thuộc vào khoảng mã Unicode của chữ cái không
  if (unicode >= 65 && unicode <= 90) {
    // Ký tự là chữ hoa
    return unicode - 64;
  } else {
    // Ký tự không phải là chữ cái
    return 0;
  }
};
export const getFirstCharacter = (text?: string) => {
  if (!text) return "";
  return text[0];
};

export const getColor = (position: number) => {
  return LIST_COLOR[position];
};
