import { ChoiceList } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Automation } from "src/modules/settingChannel/components/widgets/Setup/components/Automation";
import { Manual } from "src/modules/settingChannel/components/widgets/Setup/components/Manual";
import styles from "./setup.module.scss";
export default function Setup() {
  const [type, setType] = useState(["automation"]);
  const handleChange = useCallback((value: string[]) => setType(value), []);
  console.log(type[0]);
  return (
    <div className={styles.container}>
      <div>
        {" "}
        <ChoiceList
          title="Choose setup method"
          choices={[
            { label: "Automation", value: "automation" },
            { label: "Manual", value: "manual" },
          ]}
          selected={type}
          onChange={handleChange}
        />
      </div>
      <div className={styles.content}>
        {type[0] === "automation" ? <Automation /> : <Manual />}
      </div>
    </div>
  );
}
