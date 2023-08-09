import React from "react";
import styles from "../setup.module.scss";

export const Manual = React.memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Manual setup</h2>
      </div>
      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 1:</span> From Shopify admin,
          go to <span>Online Store</span> &#62; <span>Themes</span> &#62;{" "}
          <span>Customize</span>
        </p>
        <div className={styles.imageContainer}>
          <div className={styles.wrapImage}>
            <img
              src={
                "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-manual-step-1.png?v=1691587730"
              }
              alt="manual_1"
            />
          </div>
        </div>
      </div>
      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 2:</span> From the{" "}
          <span>Sections</span> at the left top, click <span>Add section</span>{" "}
          in <span>Footer</span>
        </p>
      </div>
      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 3:</span> Click{" "}
          <span>Apps</span> tab, and select <span>MooseDesk Help Widget</span>
        </p>
        <div className={styles.imageContainer}>
          <div className={styles.wrapImage}>
            <img
              src={
                "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-manual-step-2.png?v=1691587730"
              }
              alt="manual_2"
            />
          </div>
        </div>
      </div>
      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 4:</span> Click{" "}
          <span>Save</span>
        </p>
        <div className={styles.imageContainer}>
          <div className={styles.wrapImage}>
            <img
              src={
                "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-manual-step-3.png?v=1691587731"
              }
              alt="manual_3"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
