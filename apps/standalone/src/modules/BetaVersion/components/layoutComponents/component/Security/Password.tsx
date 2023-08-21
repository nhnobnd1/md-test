import { useToggle } from "@moose-desk/core";
import React from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import { ModalChangePassword } from "src/modules/BetaVersion/profile/component/Security/ModalChangePassword";
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
        <MDButton onClick={handleOpenChangePassword}>Change</MDButton>
        <div className={styles.subContent}>
          <p className={styles.passwordHide}>●●●●●●●●●●●</p>
        </div>
      </div>
      <ModalChangePassword
        visible={visibleModalChangePassword}
        onClose={handleCloseChangePassword}
      />
    </div>
  );
});
