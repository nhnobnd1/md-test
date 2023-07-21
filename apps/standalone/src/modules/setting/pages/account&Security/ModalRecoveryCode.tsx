import {
  CheckOutlined,
  CopyOutlined,
  DownloadOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useCountDown, useUnMount } from "@moose-desk/core";
import { Col, Row, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Loading } from "src/components/Loading";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import { MDModal } from "src/components/UI/Modal/MDModal";
import useNotification from "src/hooks/useNotification";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getRecoveryCodes } from "src/modules/setting/api/api";
import styles from "./styles.module.scss";

interface IProps {
  visible: boolean;
  onClose: () => void;
}
type RecoveryCodes = string[];
export const ModalRecoveryCode = React.memo(({ visible, onClose }: IProps) => {
  const [status, setStatus] = useState({
    copy: false,
    download: false,
  });
  const { subDomain, getDomain } = useSubdomain();
  const notification = useNotification();
  const {
    clearCountDown,
    initCountdown: startCountDown,
    state: countDown,
  } = useCountDown({
    initValue: 10,
    key: "countdownRecoveryCode",
  });
  const { data, isFetching, refetch }: any = useQuery({
    queryKey: ["2faRecoveryCodes"],
    queryFn: () => getRecoveryCodes(),
    keepPreviousData: true,
  });
  const listRecoveryCodes: RecoveryCodes = data?.data || [];
  const handleCopyCodes = () => {
    const listCopyCodes = listRecoveryCodes.join(",");
    navigator.clipboard.writeText(listCopyCodes);
    setStatus((pre) => ({ ...pre, copy: true }));
    notification.success("Copied!");
  };
  const handleDownloadTxt = () => {
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
    if (countDown) return;
    await refetch();
    startCountDown("countdownRecoveryCode");
  };
  useUnMount(() => clearCountDown("countdownRecoveryCode"));
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
        <div className="d-flex justify-between align-center mb-2">
          <p style={{ marginBottom: 0 }}>You have 10 recovery codes:</p>
          <div className="d-flex align-center">
            {!countDown ? null : (
              <Typography.Text type="success" className="ml-2">
                ({countDown}s)
              </Typography.Text>
            )}
            <Tooltip title="Request new recovery codes">
              <MDButton
                type="text"
                icon={<RedoOutlined style={{ fontSize: "16px" }} />}
                onClick={handleRequestCodes}
                loading={isFetching}
                disabled={!!countDown}
              ></MDButton>
            </Tooltip>
          </div>
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
          >
            {status.copy ? "Copied" : "Copy"}
          </MDButton>
          <MDButton
            icon={status.download ? <CheckOutlined /> : <DownloadOutlined />}
            onClick={handleDownloadTxt}
            className={status.download ? styles.successfully : ""}
          >
            {status.download ? "Downloaded" : "Download"}
          </MDButton>
        </div>
      </div>
    </MDModal>
  );
});
