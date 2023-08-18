import { useToggle } from "@moose-desk/core";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import { MDDrawer } from "src/components/UI/MDDrawer";
import useViewport from "src/hooks/useViewport";
import Information from "src/modules/BetaVersion/profile/pages/Information";
import Setting from "src/modules/BetaVersion/profile/pages/Setting";
import styles from "./style.module.scss";
export default function Profile() {
  const { state: visible, off, on, toggle } = useToggle(false);
  const { isMobile } = useViewport(1024);

  return (
    <section className={styles.container}>
      <div className={styles.wrapSetting}>
        <Setting />
      </div>
      {isMobile && (
        <MDButton
          className={styles.buttonToggle}
          onClick={toggle}
          icon={<Icon name="user" />}
        />
      )}
      {isMobile ? (
        <MDDrawer
          title=""
          visible={visible}
          onClose={off}
          rootClassName={styles.drawerSearch}
          content={<Information />}
          closable={true}
        />
      ) : (
        <div className={styles.wrapInfo}>
          <Information />
        </div>
      )}
    </section>
  );
}
