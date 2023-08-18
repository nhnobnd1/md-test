import { Password } from "src/modules/BetaVersion/profile/component/Security/Password";
import TwoFaAuthenticated from "src/modules/BetaVersion/profile/component/Security/TwoFaAuthenticated";
import styles from "./style.module.scss";
export const Security = () => {
  return (
    <div className={styles.security}>
      <h5>Setting Security</h5>

      <Password />
      <TwoFaAuthenticated />
    </div>
  );
};
