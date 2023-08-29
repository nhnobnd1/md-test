import { useNavigate, useToggle } from "@moose-desk/core";
import { Agent, ResendEmailInvitationRequest } from "@moose-desk/repo";
import { Switch, Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { MDModalConfirm } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useNotification from "src/hooks/useNotification";
import {
  activeAgent,
  deActiveAgent,
  removeAgent,
  resendInviteEmail,
} from "src/modules/agent/api/api";
import styles from "./style.module.scss";

interface IProps {
  profile: Agent;
  loading: boolean;
  onRefetch: () => void;
}
export const AgentInfoBlock = React.memo(
  ({ profile, loading, onRefetch }: IProps) => {
    const notification = useNotification();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { state: visible, on, off } = useToggle(false);
    const { mutate: sendInviteMutate, isLoading: sending } = useMutation({
      mutationFn: (payload: ResendEmailInvitationRequest) =>
        resendInviteEmail(payload),
      onSuccess: async () => {
        notification.success(`Resend invitation ${profile?.email}`, {
          description: t("messages:success.resend_invitation_email"),
        });
      },
      onError: () => {
        notification.error(t("messages:error.resend_invitation_email"));
      },
    });
    const { mutate: removeAgentMutate, isLoading: removing } = useMutation({
      mutationFn: () => removeAgent(profile?._id || ""),
      onSuccess: async () => {
        notification.success(t("messages:success.deleted_agent"));
        off();
        navigate(-1);
      },
      onError: () => {
        notification.error(t("messages:error.deleted_agent"), {
          description: "Remove agent failed",
        });
      },
    });
    const { mutate: activeAgentMutate, isLoading: activeIng } = useMutation({
      mutationFn: () => activeAgent(profile?._id || ""),
      onSuccess: async () => {
        onRefetch();
        notification.success(t("messages:success.active_agent"));
      },
      onError: () => {
        notification.error(t("messages:error.active_agent"));
      },
    });
    const { mutate: deActiveAgentMutate, isLoading: deActiveIng } = useMutation(
      {
        mutationFn: () => deActiveAgent(profile?._id || ""),
        onSuccess: async () => {
          onRefetch();
          notification.success(t("messages:success.deactivate_agent"));
        },
        onError: () => {
          notification.error(t("messages:error.deactivate_agent"));
        },
      }
    );
    const handleChangeStatus = (value: boolean) => {
      value ? activeAgentMutate() : deActiveAgentMutate();
    };
    const handleSubmitRemove = () => {
      removeAgentMutate();
    };
    if (!profile) return null;
    return (
      <div className={styles.blockContent}>
        {loading ? (
          <MDSkeleton lines={1} />
        ) : !profile?.emailConfirmed ? (
          <div className="d-grid">
            <MDButton
              type="link"
              onClick={() =>
                sendInviteMutate({
                  email: profile?.email || "",
                  storeId: profile?.storeId || "",
                })
              }
              loading={sending}
            >
              Send Invitation Email
            </MDButton>
            <MDButton
              onClick={on}
              type="primary"
              danger
              className="mt-2"
              loading={removing}
            >
              Remove Agent
            </MDButton>
          </div>
        ) : (
          <>
            <div className={styles.moreInfo}>
              <span className={styles.label}>Status</span>
              <span className={styles.result}>
                <Switch
                  onChange={handleChangeStatus}
                  loading={activeIng || deActiveIng}
                  checked={profile?.isActive}
                />
                <Tag
                  className="ml-2"
                  color={profile?.isActive ? "green" : "error"}
                >
                  {profile?.isActive ? "Active" : "Deactivate"}
                </Tag>
              </span>
            </div>
          </>
        )}
        <MDModalConfirm
          visible={visible}
          title="Remove Agent"
          contentText="Are you sure about remove this agent?"
          okText="Remove"
          onCancel={off}
          onOk={handleSubmitRemove}
          loading={removing}
        />
      </div>
    );
  }
);
