import styles from "./style.module.scss";
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.time}>{label}</p>
        {payload?.map((item: any) => (
          <div className={styles.item} key={item.name}>
            <div
              className={styles.box}
              style={{ backgroundColor: item.fill }}
            ></div>
            <div className={styles.group}>
              <span className={styles.name}>{item.name}:</span>
              <span className={styles.value}>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
