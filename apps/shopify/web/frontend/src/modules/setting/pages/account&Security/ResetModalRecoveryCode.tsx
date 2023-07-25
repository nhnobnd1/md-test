import { useToggle } from "@moose-desk/core";
import { Button, ButtonGroup, Modal, Text } from "@shopify/polaris";
import React from "react";

import styles from "./styles.module.scss";
interface IProps {
  onOpenModalRecoveryCode: () => void;
  loading?: boolean;
  buttonTitle?: string;
  countDown?: number;
}
export const ResetModalRecoveryCode = React.memo(
  ({
    buttonTitle = "Get recovery codes",
    loading = false,
    countDown = 0,
    onOpenModalRecoveryCode,
  }: IProps) => {
    const { state: visible, on, off } = useToggle(false);

    const handleAccept = () => {
      off();
      onOpenModalRecoveryCode();
    };
    const handleOpenModalConfirm = () => {
      on();
    };
    return (
      <div className={"d-flex align-center"}>
        {!countDown ? null : (
          <div className="mr-2">
            <Text as="span" variant="bodyMd">
              ({countDown}s)
            </Text>
          </div>
        )}
        <div className={styles.buttonRequest}>
          <Button
            plain
            disabled={!!countDown}
            onClick={handleOpenModalConfirm}
            loading={loading}
          >
            {buttonTitle}
          </Button>
        </div>

        <Modal
          open={visible}
          title="Are you sure you want to request new recovery codes?"
          onClose={off}
          small
        >
          <div className={styles.content}>
            Your previous recovery codes will be replaced and will no longer be
            valid.
          </div>
          {/* <Card sectioned> */}
          <div className="group-button-footer">
            <ButtonGroup>
              <Button onClick={off}>Cancel</Button>
              <Button primary onClick={handleAccept}>
                OK
              </Button>
            </ButtonGroup>
          </div>
          {/* </Card> */}
        </Modal>
      </div>
    );
  }
);
