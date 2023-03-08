import { Button, Card, Divider, Row } from "antd";
import { useMemo, useState } from "react";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import CodeIcon from "~icons/carbon/code";
import CopyIcon from "~icons/material-symbols/content-copy-outline";
interface IntegrationProps {
  idWidget: string | undefined;
}
export default function Integration({ idWidget }: IntegrationProps) {
  const data = useWidgetSetting((state) => state.widgetSetting);

  const scriptCode = useMemo(() => {
    if (!idWidget)
      return ` 
    	<script>
			window.mdSettings = {
				widget_id: "${data?.id}",
			};
		</script>
		<script src="https://cdn.jsdelivr.net/gh/oppabgnamdz/node-getmagnet@master/moosedesk.js"></script>

    `;
    return ` 
    	<script>
			window.mdSettings = {
				widget_id: "${idWidget}",
			};
		</script>
		<script src="https://cdn.jsdelivr.net/gh/oppabgnamdz/node-getmagnet@master/moosedesk.js"></script>

    `;
  }, [data?.id, idWidget]);
  const [copied, setCopied] = useState<boolean>(false);
  const handleClickCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 700,
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
    </>
  );
}
