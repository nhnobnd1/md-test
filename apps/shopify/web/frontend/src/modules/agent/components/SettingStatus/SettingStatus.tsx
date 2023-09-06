import { useNavigate, useToggle } from "@moose-desk/core";
import { ResendEmailInvitationRequest } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Badge, Button, Link, Spinner, Text } from "@shopify/polaris";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import Switch from "src/components/Switch/Switch";
import {
  activeAgent,
  deActiveAgent,
  removeAgent,
  resendInviteEmail,
} from "src/modules/agent/api/api";
import styles from "./style.module.scss";
interface IProps {
  confirmed: boolean;
  id: string;
  onRefetch: () => void;
  email: string;
  storeId: string;
  isActive: boolean;
}
export const SettingStatus = React.memo(
  ({
    confirmed,
    id = "",
    onRefetch,
    email = "",
    storeId = "",
    isActive,
  }: IProps) => {
    const { show } = useToast();
    // const {
    //   state: countDown,
    //   clearCountDown,
    //   initCountdown,
    //   checkTimerProcess,
    // } = useCountDown({
    //   initValue: 300,
    //   key: id,
    // });
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { state: visible, on, off } = useToggle(false);
    const { mutate: sendInviteMutate, isLoading: sending } = useMutation({
      mutationFn: (payload: ResendEmailInvitationRequest) =>
        resendInviteEmail(payload),
      onSuccess: async () => {
        show(t("messages:success.resend_invitation_email"));
        // initCountdown(id);
      },
      onError: () => {
        show(t("messages:error.resend_invitation_email"));
      },
    });
    const { mutate: removeAgentMutate, isLoading: removing } = useMutation({
      mutationFn: () => removeAgent(id),
      onSuccess: async () => {
        // clearCountDown(id);
        show(t("messages:success.deleted_agent"));
        off();
        navigate(-1);
      },
      onError: () => {
        show(t("messages:error.deleted_agent"));
      },
    });
    const { mutate: activeAgentMutate, isLoading: activeIng } = useMutation({
      mutationFn: () => activeAgent(id),
      onSuccess: async () => {
        onRefetch();
        show(t("messages:success.active_agent"));
      },
      onError: () => {
        show(t("messages:error.active_agent"));
      },
    });
    const { mutate: deActiveAgentMutate, isLoading: deActiveIng } = useMutation(
      {
        mutationFn: () => deActiveAgent(id),
        onSuccess: async () => {
          onRefetch();
          show(t("messages:success.deactivate_agent"));
        },
        onError: () => {
          show(t("messages:error.deactivate_agent"));
        },
      }
    );
    const handleSendInvite = () => {
      sendInviteMutate({
        email,
        storeId,
      });
    };
    const handleChangeStatus = (value: boolean) => {
      if (activeIng || deActiveIng) return;
      value ? activeAgentMutate() : deActiveAgentMutate();
    };
    return (
      <div className={styles.wrapSetting}>
        {confirmed ? (
          <div className={styles.moreInfo}>
            <span className={styles.label}>Status</span>
            <span className={styles.result}>
              <div className={activeIng || deActiveIng ? styles.loading : ""}>
                <Switch onChange={handleChangeStatus} value={isActive} />
              </div>
              <div className="ml-2">
                <Badge status={isActive ? "success" : "critical"}>
                  {isActive ? "Activate" : "Deactivate"}
                </Badge>
              </div>
            </span>
          </div>
        ) : (
          <div>
            <div className="d-flex align-center justify-center mb-5">
              {/* {checkTimerProcess ? (
                <Text variant="bodyLg" as="p">
                  Send Invitation Email
                </Text>
              ) : ( */}
              <Link dataPrimaryLink onClick={handleSendInvite}>
                <Text variant="bodyLg" as="p">
                  Send Invitation Email
                </Text>
              </Link>
              {/* )} */}
              {sending && (
                <div className="ml-1">
                  <Spinner size="small" />
                </div>
              )}
              {/* {countDown && (
                <div className="ml-1">
                  <Text as="span" variant="bodyLg">
                    ({convertSecondsToMinutesAndSeconds(countDown)})
                  </Text>
                </div>
              )} */}
            </div>
            <ModalDelete
              open={visible}
              activator={
                <Button onClick={on} destructive fullWidth>
                  Remove Agent
                </Button>
              }
              onClose={off}
              title="Are you sure that you want to permanently remove this Agent"
              content="This Agent will be removed permanently. This action cannot be undone"
              loading={removing}
              deleteAction={removeAgentMutate}
            />
          </div>
        )}
      </div>
    );
  }
);
