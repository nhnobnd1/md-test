import { Text } from "@shopify/polaris";
import React from "react";
import styles from "../setup.module.scss";

export const Manual = React.memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Text variant="headingMd" as="h2">
          Manual setup
        </Text>
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
              src="https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-help-widget-setup-manual-1.png?v=1692075440"
              alt="manual_1"
            />
          </div>
        </div>
      </div>
      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 2:</span> From the{" "}
          <span>App embeds</span> in the upper left corner, enable the{" "}
          <span>MooseDesk Help Widget</span> and then click <span>Save</span>
        </p>
        <div className={styles.imageContainer}>
          <div className={styles.wrapImage}>
            <img
              src="https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-help-widget-setup-manual-2.png?v=1692075440"
              alt="manual_2"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
