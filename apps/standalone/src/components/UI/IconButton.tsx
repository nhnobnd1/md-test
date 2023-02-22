import classNames from "classnames";

interface IconButtonProps {
  children?: any;
  className?: string;
  onClick?: () => void;
}

const IconButton = ({ children, className, onClick }: IconButtonProps) => {
  return (
    <span
      className={classNames([className, "mr-2 translate-y-[3px]"])}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default IconButton;
