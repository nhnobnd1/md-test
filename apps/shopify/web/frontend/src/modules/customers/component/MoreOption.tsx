import { MediaScreen, useToggle } from "@moose-desk/core";
import { useToast } from "@shopify/app-bridge-react";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  DropZone,
  LegacyCard,
  Modal,
  Popover,
  Spinner,
  Tooltip,
} from "@shopify/polaris";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useScreenType from "src/hooks/useScreenType";
import {
  checkingSyncImport,
  importCSV,
  syncShopifyCustomers,
} from "src/modules/customers/api/api";
import { FileSize } from "src/modules/customers/helper/enum";
import styles from "../pages/styles.module.scss";

interface IProps {
  onReset: () => void;
}
export const MoreOption = React.memo(({ onReset }: IProps) => {
  const { show } = useToast();
  const { on: handleOpenModalImport, off, state: visible } = useToggle(false);
  const [screenType, screenWidth] = useScreenType();
  const isMobile = Boolean(screenWidth <= MediaScreen.LG);
  const [popoverActive, setPopoverActive] = useState(false);
  const [processing, setProcessing] = useState({
    status: false,
    count: 0,
  });
  const [file, setFile] = useState<any>();
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
        count: 1,
      });
    }
  }, [processing]);
  const { mutate: syncCustomerMutate, isLoading: syncing } = useMutation({
    mutationFn: () => syncShopifyCustomers(),
    onSuccess: () => {
      refetchingStatus();
      show(
        "The data synchronization process is currently underway. You will receive an email once the synchronization process is complete."
      );
    },
    onError: () => {
      show("Failed to sync customers from shopify");
    },
  });

  const { mutate: importMutate, isLoading: importing } = useMutation({
    mutationFn: (payload: any) => importCSV(payload),

    onSuccess: () => {
      refetchingStatus();
      handleCloseModalImport();
      show(
        "Currently in the process of importing data from a file. You will receive an email once the import process is complete."
      );
    },
    onError: () => {
      show("Failed to import from file");
    },
  });
  const togglePopoverActive = useCallback(
    () => setPopoverActive((pre) => !pre),
    []
  );
  const handleUploadFile = useCallback((files: any) => {
    const file = files[0];
    if (file?.type !== "text/csv") {
      show("Please import a file in CSV format.");
      return;
    }
    if (file?.size > FileSize.MAX) {
      show("The file size should not exceed 5MB.");
      return;
    }
    setFile(file);
  }, []);
  const handleCloseModalImport = () => {
    off();
    setFile(undefined);
  };
  const handleSubmitImport = () => {
    importMutate(file);
  };
  const activator = processing.status ? (
    <Tooltip content="Currently in the process of syncing Shopify customer data or importing data from a file.">
      <Button
        onClick={togglePopoverActive}
        icon={
          <Spinner accessibilityLabel="Small spinner example" size="small" />
        }
        disabled
      >
        {isMobile ? undefined : "Processing"}
      </Button>
    </Tooltip>
  ) : (
    <Button
      onClick={togglePopoverActive}
      icon={isMobile ? MobileVerticalDotsMajor : undefined}
    >
      {isMobile ? undefined : "More actions"}
    </Button>
  );
  return (
    <div>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <div className={styles.btnSync}>
          <Button onClick={handleOpenModalImport}>Import using CSV</Button>
        </div>
        <div className={styles.btnSync}>
          <Button onClick={() => syncCustomerMutate()} loading={syncing}>
            Synchorization from Shopify
          </Button>
        </div>
      </Popover>
      <Modal
        title={"Import customers"}
        open={visible}
        onClose={handleCloseModalImport}
      >
        <div className={styles.wrapDropzone}>
          <LegacyCard>
            <DropZone accept=".csv" onDrop={handleUploadFile}>
              <div style={{ margin: "0 auto", textAlign: "center" }}>
                <Badge status="success">{file ? file.name : "Add file"}</Badge>
              </div>
            </DropZone>
          </LegacyCard>
        </div>

        <Card sectioned>
          <div className={styles.groupButtonFooter}>
            <a
              href={`https://${
                import.meta.env.MODE === "development" ? "md" : "moosedesk"
              }-asset.s3.amazonaws.com/md-customers-template.csv`}
              download
              style={{ textDecoration: "underline" }}
            >
              Download a sample CSV
            </a>
            <ButtonGroup>
              <Button onClick={handleCloseModalImport}>Cancel</Button>

              <Button
                primary
                onClick={handleSubmitImport}
                loading={importing}
                disabled={!file}
              >
                Import
              </Button>
            </ButtonGroup>
          </div>
        </Card>
      </Modal>
    </div>
  );
});
