import { useCountDown, useJob } from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  CreateAgentRequest,
  ErrorCodeCreate,
  ResendEmailInvitationRequest,
  UpdateAgentRequest,
} from "@moose-desk/repo";
import { Button, Modal, ModalProps, Space, Tag } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { Loading } from "src/components/Loading";
import { ButtonModalDelete } from "src/components/UI/Button/ButtonModalDelete";
import Form from "src/components/UI/Form/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import {
  AgentForm,
  AgentFormValues,
} from "src/modules/agent/components/AgentForm";
import { getStatusAgent } from "src/modules/agent/constant";
import { useStore } from "src/providers/StoreProviders";

interface PopupAgentProps extends Omit<ModalProps, "onCancel"> {
  data?: Agent;
  onChange?: (closeModal?: boolean) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const PopupAgent = ({
  data,
  onChange,
  onCancel,
  ...props
}: PopupAgentProps) => {
  const [form] = Form.useForm();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();
  const [dataForm, setDataForm] = useState<Agent>();
  const { isAdmin } = usePermission();
  const { t } = useTranslation();

  const {
    state: countDown,
    initCountdown,
    checkTimerProcess,
  } = useCountDown({
    initValue: 300,
    key: dataForm?._id ?? "",
  });
  const agentStatus = useMemo<{
    label: string;
    color: string;
  }>(() => {
    if (dataForm) {
      return getStatusAgent(dataForm?.isActive, dataForm?.emailConfirmed);
    }
    return {
      label: "",
      color: "warning",
    };
  }, [dataForm]);

  const { run: getDetailAgentApi, processing: loadingGetDetail } = useJob(
    (id: string) => {
      return AgentRepository()
        .getOne(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                setDataForm(data.data);
              } else {
                message.error(t("messages:error.get_agent"));
              }
            },
            catchError((err) => {
              message.error(t("messages:error.get_agent"));
              return of(err);
            })
          )
        );
    }
  );

  useEffect(() => {
    if (data?._id) {
      // getDetailAgentApi(data._id);
      setDataForm(data);
    } else {
      setDataForm(undefined);
    }
  }, [data]);

  const { run: createAgent, processing: loadingCreate } = useJob(
    (payload: CreateAgentRequest) => {
      message.loading.show(t("messages:loading.creating_agent"));
      return AgentRepository()
        .create(payload)
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              onChange && onChange(true);
              notification.success(t("messages:success.inactive_email"));
            } else {
              if (data.errorCode) {
                notification.error(
                  getMessageCreateError(data.errorCode as ErrorCodeCreate)
                );
              }
            }
          }),
          catchError((err) => {
            message.loading.hide();
            console.log("error");
            const errorCode = err.response.data.errorCode;
            if (errorCode) {
              notification.error(
                getMessageCreateError(errorCode as ErrorCodeCreate)
              );
            }
            return of(err);
          })
        );
    }
  );

  const { run: updateAgentApi, processing: loadingUpdate } = useJob(
    (id: string, payload: UpdateAgentRequest) => {
      message.loading.show(t("messages:loading.updating_agent"));

      return AgentRepository()
        .update(id, payload)
        .pipe(
          map(
            ({ data }) => {
              message.loading.hide();
              if (data.statusCode === 200) {
                setDataForm(data.data);
                notification.success(
                  `Update ${data.data?.firstName} ${data.data?.lastName}`,
                  {
                    description: t("messages:success.agent_update"),
                  }
                );
                onChange && onChange(true);
              } else {
                notification.error(t("messages:error.agent_update"));
              }
            },
            catchError((err) => {
              message.loading.hide();
              notification.error(t("messages:error.agent_update"));

              return of(err);
            })
          )
        );
    }
  );

  const { run: resendMailApi, processing: loadingSentMail } = useJob(
    (payload: ResendEmailInvitationRequest) => {
      return AgentRepository()
        .resendEmailInvitation(payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                initCountdown(dataForm?._id ?? "");
                notification.success(`Resend invitation ${payload.email}`, {
                  description: t("messages:success.resend_invitation_email"),
                  style: {
                    width: 450,
                  },
                });
              } else {
                notification.error(t("messages:error.resend_invitation_email"));
              }
            },

            catchError((err) => {
              notification.error(t("messages:error.resend_invitation_email"));

              return of(err);
            })
          )
        );
    }
  );

  const { run: deleteAgentApi, processing: loadingDelete } = useJob(
    (id: string) => {
      message.loading.show(t("messages:loading.removing_agent"));

      return AgentRepository()
        .delete(id)
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              notification.success(t("messages:success.deleted_agent"));
              onChange && onChange(true);
            } else {
              notification.error(t("messages:error.deleted_agent"), {
                description: "Remove agent failed",
                style: {
                  width: 450,
                },
              });
            }
          }),
          catchError((err) => {
            message.loading.hide();
            notification.error(t("messages:error.deleted_agent"), {
              description: "Remove agent failed",
              style: {
                width: 450,
              },
            });
            return of(err);
          })
        );
    }
  );

  const { run: deActiveAgentApi, processing: loadingDeactivate } = useJob(
    (id: string) => {
      message.loading.show(t("messages:loading.deactivating_agent"));

      return AgentRepository()
        .deActiveAgent(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                message.success(t("messages:success.deactivate_agent"));
                onChange && onChange();
                getDetailAgentApi(id);
              } else {
                message.error(t("messages:error.deactivate_agent"));
              }
            },
            catchError((err) => {
              message.error(t("messages:error.deactivate_agent"));

              return of(err);
            })
          )
        );
    }
  );

  const { run: activeAgentApi, processing: loadingActive } = useJob(
    (id: string) => {
      message.loading.show(t("messages:loading.activating_agent"));

      return AgentRepository()
        .reActiveAgent(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                message.success(t("messages:success.active_agent"));
                onChange && onChange();
                getDetailAgentApi(id);
              } else {
                message.error(t("messages:error.active_agent"));
              }
            },
            catchError((err) => {
              message.error(t("messages:error.active_agent"));

              return of(err);
            })
          )
        );
    }
  );

  const isSendingMail = useMemo(() => {
    return checkTimerProcess;
  }, [dataForm, checkTimerProcess]);

  const resendMail = useCallback(() => {
    if (dataForm && dataForm.storeId) {
      resendMailApi({
        email: dataForm.email,
        storeId: dataForm.storeId,
      });
    } else {
      notification.error(t("messages:error.resend_invitation_email"), {
        description: "Resend invitation email failed",
        style: {
          width: 450,
        },
      });
    }
  }, [dataForm]);

  const getMessageCreateError = useCallback((errorCode: ErrorCodeCreate) => {
    switch (errorCode) {
      case ErrorCodeCreate.INVITATION_EXISTS:
        return "The invitation is already sent to the user.";
      case ErrorCodeCreate.USER_IS_EXISTS:
        return "The invitation is sent to an existing user.";

      default:
        return "Add agent failed";
    }
  }, []);

  const handleFinish = (values: AgentFormValues) => {
    if (dataForm?._id) {
      updateAgentApi(dataForm._id, {
        ...dataForm,
        ...values,
      });
    } else {
      createAgent({
        ...values,
        storeId: storeId,
      });
    }
  };

  const handleDeleteAgent = useCallback(() => {
    if (dataForm?._id) {
      deleteAgentApi(dataForm?._id);
    } else {
      notification.error(t("messages:error.deleted_agent"), {
        description: "Remove agent failed",
      });
    }
  }, [dataForm]);

  return (
    <Modal
      {...props}
      onCancel={onCancel}
      footer={
        <Space>
          <Button
            onClick={() => {
              form.resetFields();
              onCancel && onCancel();
            }}
          >
            Cancel
          </Button>
          {dataForm?._id ? (
            <>
              {!dataForm.emailConfirmed && dataForm.isActive ? (
                <>
                  <ButtonModalDelete
                    disabled={!isAdmin}
                    title="Are you sure that you want to permanently remove this Agent"
                    description="This Agent will be removed permanently. This action cannot be undone"
                    onConfirm={handleDeleteAgent}
                    loading={loadingDelete}
                    modalProps={{
                      centered: true,
                    }}
                    buttonProps={{
                      icon: undefined,
                    }}
                    textDelete="Remove"
                  />
                </>
              ) : (
                <>
                  {dataForm.isActive ? (
                    <>
                      <ButtonModalDelete
                        buttonProps={{
                          icon: undefined,
                        }}
                        title="Are you sure that you want to deactivate this Agent"
                        description="This Agent will set to Inactive. He/She will no longer have access to system"
                        modalProps={{
                          centered: true,
                          okText: "Deactivate",
                        }}
                        textDelete="Deactivate"
                        loading={loadingDeactivate}
                        onConfirm={() => deActiveAgentApi(dataForm._id)}
                      />
                      <Button type="primary" onClick={() => form.submit()}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="btn-active"
                        type="primary"
                        onClick={() => activeAgentApi(dataForm._id)}
                        loading={loadingActive}
                      >
                        Active
                      </Button>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => form.submit()}>
                Send Invitation Email
              </Button>
            </>
          )}
        </Space>
      }
    >
      <div>
        <Header
          title={
            dataForm?._id ? (
              <div className="flex items-center gap-2">
                <span>{`${dataForm.firstName} ${dataForm.lastName}`}</span>
                <Tag color={agentStatus.color}>{agentStatus.label}</Tag>
              </div>
            ) : (
              <span>Create new agent</span>
            )
          }
        ></Header>
        <Loading spinning={loadingSentMail || loadingUpdate || loadingCreate}>
          <AgentForm
            initialValues={dataForm}
            disabledEmail={!!dataForm?._id}
            enableLoadForm
            enableReinitialize
            disabled={
              dataForm && dataForm._id
                ? (dataForm.isActive && !dataForm?.emailConfirmed) ||
                  !dataForm.isActive
                : false
            }
            form={form}
            onFinish={handleFinish}
          />
          {!dataForm?.emailConfirmed && dataForm?._id && (
            <div className="flex items-center">
              <div
                className={classNames([
                  { "text-gray-400 cursor-default": isSendingMail },
                  "link mr-2",
                ])}
                onClick={() => !isSendingMail && resendMail()}
              >
                <span>Re-send Invitation Email</span>
              </div>
              {isSendingMail && !loadingGetDetail && (
                <span className="font-semibold">({countDown})</span>
              )}
            </div>
          )}
        </Loading>
      </div>
    </Modal>
  );
};

export default PopupAgent;
