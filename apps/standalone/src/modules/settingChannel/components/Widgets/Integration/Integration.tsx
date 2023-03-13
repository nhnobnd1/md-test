import { Button, Card, Divider, Row } from "antd";
import { useMemo, useState } from "react";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import { useStore } from "src/providers/StoreProviders";
import CodeIcon from "~icons/carbon/code";
import CopyIcon from "~icons/material-symbols/content-copy-outline";
interface IntegrationProps {
  idWidget: string | null;
}
export default function Integration({ idWidget }: IntegrationProps) {
  const data = useWidgetSetting((state) => state.widgetSetting);
  const { storeId } = useStore();
  console.log({ storeId });

  const scriptCode = useMemo(() => {
    if (!idWidget)
      return ` 
    	<script>
			window.mdSettings = {
				widget_id: "https://md-help-widget.s3.amazonaws.com/${storeId}/${data?.id}.json",
			};
		</script>
		<script src="https://md-help-widget.s3.amazonaws.com/moosedesk.js"></script>

    `;
    return ` 
    	<script>
			window.mdSettings = {
				widget_id: "https://md-help-widget.s3.amazonaws.com/${storeId}/${idWidget}.json",
			};
		</script>
		<script src="https://md-help-widget.s3.amazonaws.com/moosedesk.js"></script>

    `;
  }, [data?.id, idWidget, storeId]);
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
          <p style={{ width: "100%", wordWrap: "break-word" }}>{scriptCode}</p>
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
