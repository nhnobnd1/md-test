import Information from "src/modules/BetaVersion/profile/pages/Information";
import Setting from "src/modules/BetaVersion/profile/pages/Setting";
import styles from "./style.module.scss";
export default function Profile() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapSetting}>
        <Setting />
      </div>
      <div className={styles.wrapInfo}>
        <Information />
      </div>
    </section>
  );
}
