import { useToggle } from "@moose-desk/core";
import { Button } from "@shopify/polaris";
import React from "react";
import ModalChangePassword from "src/modules/profileBeta/components/Security/ModalChangePassword";
import styles from "./style.module.scss";

export const Password = React.memo(() => {
  const {
    state: visibleModalChangePassword,
    off: handleCloseChangePassword,
    on: handleOpenChangePassword,
  } = useToggle(false);
  return (
    <div className={styles.block}>
      <div className={styles.title}>Password</div>
      <div className={styles.group}>
        <Button onClick={handleOpenChangePassword}>Change</Button>
<<<<<<< HEAD:apps/shopify/web/frontend/src/modules/BetaVersion/profile/components/Security/Password.tsx
        <div className={styles.subContent}>
          <p className={styles.passwordHide}>●●●●●●●●●●●</p>
        </div>
=======
>>>>>>> 2989c34a (feat:done profile beta version in embedded):apps/shopify/web/frontend/src/modules/profileBeta/components/Security/Password.tsx
      </div>
      <ModalChangePassword
        visible={visibleModalChangePassword}
        onClose={handleCloseChangePassword}
      />
    </div>
  );
});
