import { Button, Card, Divider, Row } from "antd";
import { useState } from "react";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import CodeIcon from "~icons/carbon/code";
import CopyIcon from "~icons/material-symbols/content-copy-outline";

export default function Integration() {
  const data = useWidgetSetting((state) => state.widgetSetting);

  const [scriptCode, setScriptCode] = useState<string>(` 
    	<script>
			window.mdSettings = {
				widget_id: ${data?.id},
			};
		</script>
		<script src="https://cdn.jsdelivr.net/gh/oppabgnamdz/node-getmagnet@master/test33.js"></script>

    `);
  const [copied, setCopied] = useState<boolean>(false);
  const handleClickCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
  };

  return (
    <>
      <Card
        style={{
          width: 700,
          // marginTop: 16,
        }}
      >
        <div style={{ display: "flex" }}>
          <CodeIcon fontSize={28} />
          <h2 style={{ marginLeft: 10 }}>Embed HTML Code</h2>
        </div>
        <Divider />
        <Row>
          <p>{scriptCode}</p>
        </Row>
        <Row style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleClickCopy}
          >
            <CopyIcon />
            <span style={{ marginLeft: 5 }}>{copied ? `Copied` : `Copy`}</span>
          </Button>
        </Row>
      </Card>
      <div id="my-widget"></div>
    </>
  );
}
