import { useToast } from "@shopify/app-bridge-react";
import { Button, Icon, Text } from "@shopify/polaris";
import { useMemo, useState } from "react";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import { useStore } from "src/providers/StoreProviders";
import CodeIcon from "~icons/carbon/code";
import CopyIcon from "~icons/material-symbols/content-copy-outline";
import "./Integration.scss";
interface IntegrationProps {
  idWidget?: string;
}

const Integration = ({ idWidget }: IntegrationProps) => {
  const { storeId } = useStore();
  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);
  const [copied, setCopied] = useState<boolean>(false);
  const { show } = useToast();

  const scriptCode = useMemo(() => {
    if (!idWidget)
      return ` 
    <script>
			window.mdSettings = {
				widget_id: "https://md-help-widget.s3.amazonaws.com/${storeId}/${widgetSetting.id}.json",
			};
		</script>
		<script
      async
		  defer
		  type="text/javascript"
      src="https://md-help-widget.s3.amazonaws.com/moosedesk.js"></script>
    `;
    return ` 
    <script>
			window.mdSettings = {
				widget_id: "https://md-help-widget.s3.amazonaws.com/${storeId}/${idWidget}.json",
			};
		</script>
		<script
      async
		  defer
		  type="text/javascript"
      src="https://md-help-widget.s3.amazonaws.com/moosedesk.js"></script>
    `;
  }, [idWidget, storeId]);

  const handleClickCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    show("Copied");
  };

  return (
    <div className="Integration">
      <div className="black-box">
        <div className="header flex items-center gap-2">
          <CodeIcon fontSize={24} />
          <Text as="h4" variant="headingMd">
            Embed HTML Code
          </Text>
        </div>
        <div className="content-code">{scriptCode}</div>
        <div className="mt-4 flex justify-end">
          <Button
            size="slim"
            icon={() => (
              <Icon
                source={() => <CopyIcon fontSize={16} color="#202020" />}
                color="base"
              />
            )}
            onClick={handleClickCopy}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Integration;
