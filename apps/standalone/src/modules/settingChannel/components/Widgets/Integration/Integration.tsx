import { Button, Card, Divider, Row } from "antd";
import Link from "antd/es/typography/Link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import { useSubdomain } from "src/hooks/useSubdomain";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import { useStore } from "src/providers/StoreProviders";
import CodeIcon from "~icons/carbon/code";
import CopyIcon from "~icons/material-symbols/content-copy-outline";
interface IntegrationProps {
  idWidget: string | null;
}
const commonStyles = {
  card: {
    maxWidth: 700,
    // marginTop: 16,
    backgroundColor: "#27313A",
    color: "white",
  },
  wrapTitle: { display: "flex" },
  title: { marginLeft: 10 },
  divider: { backgroundColor: "white" },
  row: { display: "flex", justifyContent: "flex-end" },
  copyButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  copyText: { marginLeft: 5 },
};
export default function Integration({ idWidget }: IntegrationProps) {
  const data = useWidgetSetting((state) => state.widgetSetting);
  const { storeId } = useStore();
  const { subDomain } = useSubdomain();
  const message = useMessage();
  const { t } = useTranslation();

  const scriptCode = useMemo(() => {
    if (!idWidget)
      return ` 
    	<script>
			window.mdSettings = {
				widget_id: "${env.HELP_WIDGET_URL}/${storeId}/${data?.id}.json",
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
  }, [data?.id, idWidget, storeId]);
  const [copied, setCopied] = useState<boolean>(false);
  const handleClickCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    message.success(t("messages:success.copied"));
  };

  useEffect(() => {
    setCopied(false);
    return () => setCopied(false);
  }, [data.id, idWidget]);

  return (
    <>
      <Card style={commonStyles.card}>
        <div className="mb-3">
          <Link
            href={`https://${subDomain}.myshopify.com/admin/themes/current/editor?template=index&addAppBlockId=ed118f6f-db02-4570-8695-4416c857ded1/app-widget&target=sectionGroup:footer`}
            target="_blank"
          >
            Deep link MooseDesk Help Widget
          </Link>
        </div>
        <div style={commonStyles.wrapTitle}>
          <CodeIcon fontSize={28} />
          <h2 style={commonStyles.title}>Embed HTML Code</h2>
        </div>
        <Divider style={commonStyles.divider} />
        <div>
          <Row>
            <h4
              onClick={handleClickCopy}
              style={{ width: "100%", wordWrap: "break-word" }}
              className="hover:cursor-pointer"
            >
              {scriptCode}
            </h4>
          </Row>
          <Row style={commonStyles.row}>
            <Button style={commonStyles.copyButton} onClick={handleClickCopy}>
              <CopyIcon />
              <span style={commonStyles.copyText}>
                {copied ? `Copied` : `Copy`}
              </span>
            </Button>
          </Row>
        </div>
      </Card>
    </>
  );
}
