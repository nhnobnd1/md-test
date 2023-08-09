import { Radio, RadioChangeEvent } from "antd";
import { useCallback, useState } from "react";
import { Automation } from "src/modules/settingChannel/components/Widgets/Setup/components/Automation";
import { Manual } from "src/modules/settingChannel/components/Widgets/Setup/components/Manual";
import styles from "./setup.module.scss";
export default function Setup() {
  const [method, setMethod] = useState<string>("automation");

  const handleChangeMethod = useCallback((e: RadioChangeEvent) => {
    setMethod(e.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapRadio}>
        <p>Choose setup method</p>
        <Radio.Group onChange={handleChangeMethod} value={method} size="large">
          <Radio value="automation">Automation</Radio>
          <Radio value="manual">Manual</Radio>
        </Radio.Group>
      </div>

      <div className={styles.content}>
        {method === "automation" ? <Automation /> : <Manual />}
      </div>
    </div>
  );
}
