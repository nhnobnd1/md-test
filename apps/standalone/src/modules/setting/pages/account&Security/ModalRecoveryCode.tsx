import {
  CheckOutlined,
  CopyOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Loading } from "src/components/Loading";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import { MDModal } from "src/components/UI/Modal/MDModal";
import useNotification from "src/hooks/useNotification";
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

    const { subDomain, getDomain } = useSubdomain();
    const notification = useNotification();

    const handleCopyCodes = () => {
      if (!listRecoveryCodes.length) return;
      const listCopyCodes = listRecoveryCodes?.join(",");
      navigator.clipboard?.writeText(listCopyCodes);
      setStatus((pre) => ({ ...pre, copy: true }));
      notification.success("Copied!");
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
          `\n* If you need to request a new code, please access: https://${subDomain}${getDomain()}/setting/account&security/security?recovery=true`,
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
    return (
      <MDModal
        open={visible}
        onCancel={onClose}
        onClose={onClose}
        className={styles.recoveryCodeModal}
        footer={null}
      >
        <div className={styles.title}>
          <Header subTitle="Don't forget to save your recovery codes!" />
        </div>
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
            <Row>
              {isFetching ? (
                <div className={styles.blockLoading}>
                  <Loading />
                </div>
              ) : (
                listRecoveryCodes.map((code: string, i: number) => (
                  <Col key={i} xs={12} sm={12} lg={12} xl={12}>
                    <p>{code}</p>
                  </Col>
                ))
              )}
            </Row>
          </div>
          <div className={styles.groupButton}>
            <MDButton
              icon={status.copy ? <CheckOutlined /> : <CopyOutlined />}
              onClick={handleCopyCodes}
              className={status.copy ? styles.successfully : ""}
              disabled={isFetching || !listRecoveryCodes.length}
            >
              {status.copy ? "Copied" : "Copy"}
            </MDButton>
            <MDButton
              icon={status.download ? <CheckOutlined /> : <DownloadOutlined />}
              onClick={handleDownloadTxt}
              className={status.download ? styles.successfully : ""}
              disabled={isFetching || !listRecoveryCodes.length}
            >
              {status.download ? "Downloaded" : "Download"}
            </MDButton>
          </div>
        </div>
      </MDModal>
    );
  }
);
