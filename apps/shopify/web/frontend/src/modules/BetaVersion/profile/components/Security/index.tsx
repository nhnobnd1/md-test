import { Password } from "@moose-beta/profile/components/Security/Password";
import TwoFaAuthenticated from "@moose-beta/profile/components/Security/TwoFaAuthenticated";
import { LegacyCard } from "@shopify/polaris";
import styles from "./style.module.scss";
export const Security = () => {
  return (
    <LegacyCard>
      <div className={styles.security}>
        {/* <h5>Setting Security</h5> */}

        <Password />
        <TwoFaAuthenticated />
      </div>
    </LegacyCard>
  );
};
