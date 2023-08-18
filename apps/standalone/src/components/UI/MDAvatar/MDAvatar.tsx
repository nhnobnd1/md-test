import { Image } from "antd";
import classNames from "classnames";
import {
  CharacterPosition,
  getColor,
  getFirstCharacter,
} from "src/components/UI/MDAvatar/helper/function";
import styles from "./style.module.scss";
interface IProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  size?: "small" | "medium" | "large";
  preview?: boolean;
}
export default function MDAvatar({
  email,
  firstName,
  lastName,
  source,
  size = "small",
  preview = false,
}: IProps) {
  const avatarSize = () => {
    if (size === "small") {
      return 40;
    }
    if (size === "medium") {
      return 100;
    }
    if (size === "large") {
      return 150;
    }
  };
  const fontSize = () => {
    if (size === "small") {
      return 14;
    }
    if (size === "medium") {
      return 30;
    }
    if (size === "large") {
      return 50;
    }
  };

  const convertAvatarText = () => {
    if (firstName || lastName) {
      return `${getFirstCharacter(firstName)}${getFirstCharacter(
        lastName
      )}`.toUpperCase();
    }
    if (email) {
      return `${getFirstCharacter(email)}`.toUpperCase();
    }
    return "M";
  };
  const sizeStyle = {
    width: avatarSize(),
    height: avatarSize(),
  };
  return source ? (
    <Image
      width={avatarSize()}
      height={avatarSize()}
      src={source}
      alt={`avatar_${source}`}
      className={styles.avatar}
      preview={preview}
    />
  ) : (
    <div
      style={{
        ...sizeStyle,
        fontSize: fontSize(),
        backgroundColor: getColor(CharacterPosition(convertAvatarText())),
      }}
      className={classNames(styles.avatar, styles.haveBackground)}
    >
      {convertAvatarText()}
    </div>
  );
}