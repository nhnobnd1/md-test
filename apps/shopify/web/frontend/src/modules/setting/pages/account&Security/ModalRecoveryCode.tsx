import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  Grid,
  Icon,
  LegacyCard,
  Modal,
  Spinner,
} from "@shopify/polaris";
import {
  ClipboardMinor,
  PageDownMajor,
  TickMinor,
} from "@shopify/polaris-icons";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSubdomain } from "src/hooks/useSubdomain";
import { ResetModalRecoveryCode } from "src/modules/setting/pages/account&Security/ResetModalRecoveryCode";
import styles from "./styles.module.scss";

type RecoveryCodes = string[];

interface IProps {
  visible: boolean;
  onClose: () => void;
  listRecoveryCodes: RecoveryCodes;
  isFetching: boolean;
  countDown?: number;
}
export const ModalRecoveryCode = React.memo(
  ({
    listRecoveryCodes,
    visible,
    onClose,
    isFetching,
    countDown = 0,
  }: IProps) => {
    const queryClient = useQueryClient();
    const [status, setStatus] = useState({
      copy: false,
      download: false,
    });
    const { subDomain } = useSubdomain();
    const { show } = useToast();

    const handleCopyCodes = () => {
      if (!listRecoveryCodes.length) return;
      const listCopyCodes = listRecoveryCodes?.join(",");
      navigator.clipboard?.writeText(listCopyCodes);
      setStatus((pre) => ({ ...pre, copy: true }));
      show("Copied!");
    };
    const handleDownloadTxt = () => {
      if (!listRecoveryCodes.length) return;
      const listCopyCodes = listRecoveryCodes.map((code: string, i: number) => {
        if (i % 2 === 0) {
          return `${code}    `;
        }
        return `${code}\n`;
      });
      const blob = new Blob(
        [
          "Please save this backup code carefully and do not let it be stolen!\n",
          "Your recovery codes:\n\n",
          ...listCopyCodes,
          "\n* You can only use each code once.",
          `\n* If you need to request a new code, please access: https://${subDomain}${
            import.meta.env.MODE === "development"
              ? ".moosedesk.net"
              : ".moosedesk.com"
          }/setting/account&security/security?recovery=true`,
        ],
        {
          type: "text/plain",
        }
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `(${subDomain}) - Recovery codes`;

      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setStatus((pre) => ({ ...pre, download: true }));
    };
    const handleRequestCodes = async () => {
      await queryClient.refetchQueries(["2faRecoveryCodes"], { exact: true });
      setStatus({
        copy: false,
        download: false,
      });
    };
    useEffect(() => {
      setStatus({
        copy: false,
        download: false,
      });
    }, [visible]);
    console.log(import.meta.env.MODE, "env");
    return (
      <Modal
        open={visible}
        onClose={onClose}
        title="Don't forget to save your recovery codes!"
      >
        <div className={styles.content}>
          <div
            className={classNames(
              styles.groupTop,
              "d-flex justify-between align-center mb-2"
            )}
          >
            <p style={{ marginBottom: 0 }}>You have 10 recovery codes:</p>

            <ResetModalRecoveryCode
              buttonTitle="Request new recovery codes"
              onOpenModalRecoveryCode={handleRequestCodes}
              loading={isFetching}
              countDown={countDown}
            />
          </div>
          <div className={styles.listCode}>
            <LegacyCard sectioned>
              <Grid columns={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
                {isFetching ? (
                  <div className={styles.blockLoading}>
                    <Spinner />
                  </div>
                ) : (
                  listRecoveryCodes.map((code: string, i: number) => (
                    <Grid.Cell
                      key={i}
                      columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
                    >
                      <p>{code}</p>
                    </Grid.Cell>
                  ))
                )}
              </Grid>
            </LegacyCard>
          </div>
          <div className={styles.groupButton2}>
            <Button
              icon={
                <Icon
                  source={status.copy ? TickMinor : ClipboardMinor}
                  color="base"
                />
              }
              onClick={handleCopyCodes}
              pressed={status.copy}
              size="slim"
              disabled={isFetching || !listRecoveryCodes.length}
            >
              {status.copy ? "Copied" : "Copy"}
            </Button>
            <Button
              icon={
                <Icon
                  source={status.download ? TickMinor : PageDownMajor}
                  color="base"
                />
              }
              onClick={handleDownloadTxt}
              // className={status.download ? styles.successfully : ""}
              pressed={status.download}
              size="slim"
              disabled={isFetching || !listRecoveryCodes.length}
            >
              {status.download ? "Downloaded" : "Download"}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);
