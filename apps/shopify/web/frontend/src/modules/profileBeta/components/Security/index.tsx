import { LegacyCard } from "@shopify/polaris";
import { Password } from "src/modules/profileBeta/components/Security/Password";
import TwoFaAuthenticated from "src/modules/profileBeta/components/Security/TwoFaAuthenticated";
import styles from "./style.module.scss";
export const Security = () => {
  return (
    <LegacyCard>
      <div className={styles.security}>
        <Password />
        <TwoFaAuthenticated />
      </div>
    </LegacyCard>
  );
};
