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
        <ModalChangePassword
          visible={visibleModalChangePassword}
          onClose={handleCloseChangePassword}
        />
      </div>
    </div>
  );
});
