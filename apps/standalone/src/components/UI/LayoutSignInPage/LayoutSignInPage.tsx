import { ReactNode } from "react";
import logo from "src/assets/images/logo/logoBase.png";
import styles from "./style.module.scss";

interface IProps {
  title?: string;
  subTitle?: ReactNode;
  content: ReactNode;
}
export default function LayoutSignInPage({
  title = "Welcome Back!",
  subTitle,
  content,
}: IProps) {
  return (
    <section className={styles.container}>
      <div className={styles.loginWrap}>
        <div className={styles.box}>
          <img className={styles.logo} src={logo} alt="logo" />
          <div>
            <h2>{title}</h2>
            {subTitle && subTitle}
          </div>
          <div className={styles.contentWrap}>{content}</div>
        </div>
      </div>
    </section>
  );
}
