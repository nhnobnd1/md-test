import classNames from "classnames";
import styles from "./text.module.scss";
interface IText extends React.HTMLAttributes<HTMLDivElement> {
  tooltip?: string;
  className?: string;
  children: string;
}
export default function Text({
  tooltip,
  children,
  className,
  ...props
}: IText) {
  return (
    <p
      data-text={tooltip}
      className={classNames(tooltip ? styles.tooltipText : "", className)}
      {...props}
    >
      {children}
    </p>
  );
}
