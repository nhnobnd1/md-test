import { useToast } from "@shopify/app-bridge-react";
import { Button, Icon, Link, Text } from "@shopify/polaris";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import env from "src/core/env";
import { useSubdomain } from "src/hooks/useSubdomain";
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
  const { getSubDomain } = useSubdomain();
  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);
  const [copied, setCopied] = useState<boolean>(false);
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const scriptCode = useMemo(() => {
    if (!idWidget)
      return ` 
    <script>
			window.mdSettings = {
				widget_id: "${env.HELP_WIDGET_URL}/${storeId}/${widgetSetting.id}.json",
			};
		</script>
		<script
      async
		  defer
		  type="text/javascript"
      src="${env.HELP_WIDGET_URL}/moosedesk.js"></script>
    `;
    return ` 
    <script>
			window.mdSettings = {
				widget_id: "${env.HELP_WIDGET_URL}/${storeId}/${idWidget}.json",
			};
		</script>
		<script
      async
		  defer
		  type="text/javascript"
      src="${env.HELP_WIDGET_URL}/moosedesk.js"></script>
    `;
  }, [idWidget, storeId]);

  const handleClickCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    show(t("messages:success.copied"));
  };

  return (
    <div className="Integration">
      <Link
        url={`https://${getSubDomain()}.myshopify.com/admin/themes/current/editor?template=index&addAppBlockId=ed118f6f-db02-4570-8695-4416c857ded1/app-widget&target=sectionGroup:footer`}
      >
        Deep link MooseDesk Help Widget
      </Link>
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
