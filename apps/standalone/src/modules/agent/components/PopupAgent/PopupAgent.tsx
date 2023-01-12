import { useJob } from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  CreateAgentRequest,
  ErrorCodeCreate,
  ResendEmailInvitationRequest,
} from "@moose-desk/repo";
import { Button, Modal, ModalProps, Space } from "antd";
import { useCallback } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonModalDelete } from "src/components/UI/Button/ButtonModalDelete";
import Form from "src/components/UI/Form/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import {
  AgentForm,
  AgentFormValues,
} from "src/modules/agent/components/AgentForm";
import { useStore } from "src/providers/StoreProviders";

interface PopupAgentProps extends Omit<ModalProps, "onCancel"> {
  dataForm?: Agent;
  onChange?: () => void;
  onCancel?: () => void;
}

export const PopupAgent = ({
  dataForm,
  onChange,
  onCancel,
  ...props
}: PopupAgentProps) => {
  const [form] = Form.useForm();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();

  const { run: createAgent } = useJob(
    (payload: CreateAgentRequest) => {
      message.loading.show("Creating Agent");
      return AgentRepository()
        .create(payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                onChange && onChange();
                message.loading.hide();
                notification.success(
                  "Invitation Email has been sent to Agent's email address."
                );
              } else {
                if (data.errorCode) {
                  notification.error(
                    getMessageCreateError(data.errorCode as ErrorCodeCreate)
                  );
                }
              }
            },
            catchError((err) => {
              const errorCode = err.response.data.errorCode;
              if (errorCode) {
                notification.error(
                  getMessageCreateError(errorCode as ErrorCodeCreate)
                );
              }
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );

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
    createAgent({
      ...values,
      storeId: storeId,
    });
  };

  const { run: resendMailApi } = useJob(
    (payload: ResendEmailInvitationRequest) => {
      return AgentRepository()
        .resendEmailInvitation(payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                notification.success(`Resend invitation ${payload.email}`, {
                  description: "Resend invitation mail success",
                  style: {
                    width: 450,
                  },
                });
              } else {
                notification.error("Resend invitation email failed");
              }
            },

            catchError((err) => {
              notification.error("Resend invitation email failed");
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );

  const { run: deleteAgentApi, processing: loadingDelete } = useJob(
    (id: string) => {
      message.loading.show("Removing agent");
      return AgentRepository()
        .delete(id)
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              notification.success(
                "The selected agent has been removed from the system."
              );
              onChange && onChange();
            } else {
              notification.error("There is an error with remove agent", {
                description: "Remove agent failed",
                style: {
                  width: 450,
                },
              });
            }
          }),
          catchError((err) => {
            notification.error("There is an error with remove agent", {
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

  const resendMail = useCallback(() => {
    if (dataForm && dataForm.storeId) {
      resendMailApi({
        email: dataForm.email,
        storeId: dataForm.storeId,
      });
    } else {
      notification.error("There is an error with resend invitation email", {
        description: "Resend invitation email failed",
        style: {
          width: 450,
        },
      });
    }
  }, [dataForm]);

  const handleDeleteAgent = useCallback(() => {
    if (dataForm?._id) {
      deleteAgentApi(dataForm?._id);
    } else {
      notification.error("There is an error with remove agent", {
        description: "Remove agent failed",
      });
    }
  }, [dataForm]);

  return (
    <Modal
      {...props}
      destroyOnClose
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={() => form.resetFields()}>Cancel</Button>
          {dataForm?._id ? (
            <>
              {!dataForm.emailConfirmed && dataForm.isActive ? (
                <>
                  <ButtonModalDelete
                    title="Are you sure that you want to permanently remove this Agent"
                    description="This Agent will be removed permanently. This action cannot be undone"
                    onConfirm={handleDeleteAgent}
                  >
                    Remove
                  </ButtonModalDelete>
                </>
              ) : (
                <>
                  {dataForm.isActive ? (
                    <ButtonModalDelete
                      title="Are you sure that you want to deactivate this Agent"
                      description="This Agent will set to Inactive. He/She will no longer have access to system"
                    >
                      Deactivate
                    </ButtonModalDelete>
                  ) : (
                    <>
                      <Button type="primary">Active</Button>
                      <Button type="primary" onClick={() => form.submit()}>
                        Save
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
        <Header title="Create new agent"></Header>
        <AgentForm
          initialValues={dataForm}
          enableLoadForm
          enableReinitialize
          form={form}
          onFinish={handleFinish}
        />
        {!dataForm?.emailConfirmed && dataForm?._id && (
          <div className="link" onClick={resendMail}>
            Re-send Invitation Email
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PopupAgent;
