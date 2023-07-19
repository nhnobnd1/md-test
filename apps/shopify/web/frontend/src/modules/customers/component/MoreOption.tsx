import { MediaScreen } from "@moose-desk/core";
import { useToast } from "@shopify/app-bridge-react";
import { Button, DropZone, Popover, Spinner, Tooltip } from "@shopify/polaris";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useScreenType from "src/hooks/useScreenType";
import {
  checkingSyncImport,
  importCSV,
  syncShopifyCustomers,
} from "src/modules/customers/api/api";
import styles from "../pages/styles.module.scss";
export default function MoreOption() {
  const { show } = useToast();

  const [screenType, screenWidth] = useScreenType();
  const isMobile = Boolean(screenWidth <= MediaScreen.LG);
  const [popoverActive, setPopoverActive] = useState(false);
  const { data: status, isLoading: checkingStatus }: any = useQuery({
    queryKey: ["StatusImportAndSync"],
    queryFn: () => checkingSyncImport(),
    // onError: () => {
    //   message.error("");
    // },
  });
  const syncStatus = status?.data?.data?.isProcessing;
  const { mutate: syncCustomerMutate, isLoading: syncing } = useMutation({
    mutationFn: () => syncShopifyCustomers(),
    onSuccess: () => {
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
    const listAcceptType = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (!listAcceptType?.includes(file?.type)) {
      show("Please import a file in CSV or XLSX format.");
      return;
    }
    importMutate(file);
  }, []);
  const activator = syncStatus ? (
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
        <div className={styles.importButton}>
          <DropZone accept=".csv, .xlsx" onDrop={handleUploadFile}>
            Import CSV
          </DropZone>
        </div>
        <div className={styles.btnSync}>
          <Button onClick={() => syncCustomerMutate()} loading={syncing}>
            Sync Customers from Shopify
          </Button>
        </div>
      </Popover>
    </div>
  );
}
