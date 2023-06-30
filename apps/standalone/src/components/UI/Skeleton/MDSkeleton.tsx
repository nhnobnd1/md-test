import classNames from "classnames";
import styles from "./style.module.scss";
interface IProps {
  lines: number;
  width?: number;
}

export default function MDSkeleton({ lines, width }: IProps) {
  const listLine = Array.from({ length: lines });
  return (
    <>
      {listLine.map((line, index) => (
        <div
          style={width ? { width } : {}}
          className={classNames(styles.skeletonItem, {
            [styles.onlyLine]: lines === 1,
          })}
          key={index}
        ></div>
      ))}
    </>
  );
}
