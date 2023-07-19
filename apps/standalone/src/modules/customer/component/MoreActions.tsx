import { InfoCircleTwoTone, MoreOutlined } from "@ant-design/icons";
import { useToggle } from "@moose-desk/core";
import { Popover, Tooltip, Upload } from "antd";
import Link from "antd/es/typography/Link";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import { MDModal } from "src/components/UI/Modal/MDModal";
import useNotification from "src/hooks/useNotification";
import useViewport from "src/hooks/useViewport";
import {
  checkingSyncImport,
  importCSV,
  syncShopifyCustomers,
} from "src/modules/customer/api/api";
import { FileSize } from "src/modules/customer/helper/constant";
import styles from "../pages/style.module.scss";
import stylesModal from "./styles.module.scss";

interface IProps {
  onReset: () => void;
}
export const MoreActions = React.memo(({ onReset }: IProps) => {
  const notification = useNotification();
  const { Dragger } = Upload;
  const { isMobile } = useViewport();
  const { on: handleOpenModalImport, off, state: visible } = useToggle(false);
  const [file, setFile] = useState<any>();
  const [processing, setProcessing] = useState({
    status: false,
    count: 0,
  });
  const { refetch: refetchingStatus }: any = useQuery({
    queryKey: ["StatusImportAndSync"],
    queryFn: () => checkingSyncImport(),
    refetchInterval: processing.status ? 5000 : false,
    onSuccess: (data: any) => {
      setProcessing((pre) => ({
        status: data?.data?.data.isProcessing,
        count: pre.count + 1,
      }));
    },
  });
  useEffect(() => {
    const { status, count } = processing;
    if (!status && count > 1) {
      onReset();
      setProcessing({
        status: false,
        count: 0,
      });
    }
  }, [processing]);
  const { mutate: syncCustomerMutate, isLoading: syncing } = useMutation({
    mutationFn: () => syncShopifyCustomers(),
    onSuccess: () => {
      refetchingStatus();
      notification.success(
        "The data synchronization process is currently underway",
        {
          description:
            "You will receive an email once the synchronization process is complete.",
        }
      );
    },
    onError: () => {
      notification.error("Failed to sync customers from shopify", {
        style: {
          width: 450,
        },
      });
    },
  });
  const { mutate: importMutate, isLoading: importing } = useMutation({
    mutationFn: (payload: any) => importCSV(payload),
    onSuccess: () => {
      refetchingStatus();
      handleCloseModalImport();
      notification.success(
        "Currently in the process of importing data from a file",
        {
          description:
            "You will receive an email once the import process is complete.",
        }
      );
    },
    onError: () => {
      notification.error("Failed to import from file", {
        style: {
          width: 450,
        },
      });
    },
  });
  const handleUploadFile = ({ file }: any) => {
    if (file?.type !== "text/csv") {
      notification.error("Please import a file in CSV format.", {
        style: {
          width: 450,
        },
      });
      return;
    }
    if (file?.size > FileSize.MAX) {
      notification.error("The file size should not exceed 5MB.", {
        style: {
          width: 450,
        },
      });
      return;
    }
    setFile(file);
  };
  const handleSubmitImport = () => {
    importMutate(file);
  };
  const handleCloseModalImport = () => {
    off();
    setFile(undefined);
  };
  const popoverContent = (
    <div className={styles.groupOptions}>
      <MDButton className={styles.syncBtn} onClick={handleOpenModalImport}>
        Import using CSV
      </MDButton>
      <MDButton
        className={styles.syncBtn}
        onClick={() => {
          syncCustomerMutate();
        }}
        loading={syncing}
      >
        Synchorization from Shopify
      </MDButton>
    </div>
  );
  return (
    <div>
      <MDModal
        open={visible}
        className={stylesModal.modalCustomer}
        onCancel={handleCloseModalImport}
        onClose={handleCloseModalImport}
        zIndex={1031}
        footer={
          <div
            className="d-flex justify-between align-center"
            style={{ width: "100%", paddingLeft: isMobile ? 16 : 20 }}
          >
            <Link
              href={`https://${
                import.meta.env.MODE === "development" ? "md" : "moosedesk"
              }-asset.s3.amazonaws.com/md-customers-template.csv`}
              download
            >
              Download a sample CSV
            </Link>
            <div className={stylesModal.modalFooter}>
              <MDButton onClick={handleCloseModalImport}>Cancel</MDButton>
              <MDButton
                type="primary"
                onClick={handleSubmitImport}
                loading={importing}
                disabled={!file}
              >
                Import
              </MDButton>
            </div>
          </div>
        }
      >
        <div>
          <div className={stylesModal.modalTitle}>
            <Header subTitle={"Import customers"}></Header>
          </div>
          <div className={stylesModal.modalContent}>
            <Dragger
              height={200}
              name="file"
              accept=".csv"
              onChange={handleUploadFile}
              showUploadList={false}
              beforeUpload={(file: any) => {
                return false;
              }}
              className={styles.draggerCustomer}
            >
              <p className={styles.fileName}>{file ? file.name : "Add file"}</p>
            </Dragger>
          </div>
        </div>
      </MDModal>
      {processing.status ? (
        <MDButton loading className={styles.syncingBtn}>
          {isMobile ? undefined : (
            <div className="d-flex align-center">
              <span>Processing</span>
              <Tooltip
                title={
                  "Currently in the process of syncing Shopify customer data or importing data from a file."
                }
              >
                <div className={styles.infoPicker}>
                  <InfoCircleTwoTone twoToneColor="#FA7D00" />
                </div>
              </Tooltip>
            </div>
          )}
        </MDButton>
      ) : (
        <Popover content={popoverContent} trigger="click">
          <MDButton icon={isMobile ? <MoreOutlined /> : undefined}>
            {isMobile ? undefined : "More actions"}
          </MDButton>
        </Popover>
      )}
    </div>
  );
});
