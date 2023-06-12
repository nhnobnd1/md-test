import { useCountDown, useJob, useToggle } from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  ResendEmailInvitationRequest,
  UpdateAgentRequest,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Badge,
  Button,
  ButtonGroup,
  Icon,
  Link,
  Modal,
  Stack,
  Text,
} from "@shopify/polaris";
import { EditMinor } from "@shopify/polaris-icons";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";
import classNames from "classnames";
import { FormikProps } from "formik";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import useAuth from "src/hooks/useAuth";
import AgentForm, {
  AgentFormValues,
} from "src/modules/agent/components/AgentForm/AgentForm";
import { getStatusAgent } from "src/modules/agent/constant";

interface ModalDetailAgentProps {
  agentSaved: Agent;
  getListAgentApi: () => void;
}

export const ModalDetailAgent: FC<ModalDetailAgentProps> = ({
  agentSaved,
  getListAgentApi,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const formRef = useRef<FormikProps<any>>(null);
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const { toggle } = useToggle();
  const { user } = useAuth();
  const {
    state: countDown,
    clearCountDown,
    initCountdown,
    checkTimerProcess,
  } = useCountDown({
    initValue: 300,
    key: agentSaved._id ?? "",
  });
  const { run: updateAgentApi, processing: loadingUpdate } = useJob(
    (id: string, payload: UpdateAgentRequest) => {
      return AgentRepository()
        .update(id, payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                show(t("messages:success.agent_update"));
                setActive(false);
                getListAgentApi();
              } else {
                // showBanner("critical", {
                //   title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                //   message: t("messages:error.agent_update"),
                // });

                show(t("messages:error.agent_update"), { isError: true });
              }
            },
            catchError((err) => {
              //   showBanner("critical", {
              //     title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              //     message: t("messages:error.agent_update"),
              //   });
              show(t("messages:error.agent_update"), { isError: true });
              return of(err);
            })
          )
        );
    },
    {
      showLoading: true,
    }
  );
  const { run: activeAgentApi, processing: loadingActive } = useJob(
    (id: string) => {
      return AgentRepository()
        .reActiveAgent(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                show(t("messages:success.active_agent"));
                // getDetailAgentApi(id);
                getListAgentApi();
                setActive(false);
              } else {
                show(t("messages:error.active_agent"), { isError: true });
              }
            },
            catchError((err) => {
              show(t("messages:error.active_agent"), { isError: true });
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );
  const { run: deleteAgentApi, processing: loadingDelete } = useJob(
    (id: string) => {
      return AgentRepository()
        .delete(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              getListAgentApi();
              setActive(false);
              show(t("messages:success.deleted_agent"));
            } else {
              show(t("messages:error.deleted_agent"), { isError: true });
            }
          }),
          catchError((err) => {
            show(t("messages:error.deleted_agent"), { isError: true });
            return of(err);
          })
        );
    }
  );
  const { run: deActiveAgentApi, processing: loadingDeactivate } = useJob(
    (id: string) => {
      return AgentRepository()
        .deActiveAgent(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                show(t("messages:success.deactivate_agent"));
                // getDetailAgentApi(id);
                getListAgentApi();
                setActive(false);
              } else {
                show(t("messages:error.deactivate_agent"), { isError: true });
              }
            },
            catchError((err) => {
              show(t("messages:error.deactivate_agent"), { isError: true });
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );
  const isSendingMail = useMemo(() => {
    return checkTimerProcess;
  }, [agentSaved._id, checkTimerProcess]);
  const { run: resendMailApi } = useJob(
    (payload: ResendEmailInvitationRequest) => {
      return AgentRepository()
        .resendEmailInvitation(payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                initCountdown(agentSaved?._id ?? "");

                show(t("messages:success.resend_invitation_email"));
              } else {
                show(t("messages:error.resend_invitation_email"), {
                  isError: true,
                });
              }
            },

            catchError((err) => {
              show(t("messages:error.resend_invitation_email"), {
                isError: true,
              });
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );
  const handleSubmit = useCallback(
    (values: AgentFormValues) => {
      const payload: UpdateAgentRequest = {
        ...values,
      };
      const idPayload = agentSaved?._id;
      if (idPayload) updateAgentApi(idPayload, payload);
      else {
        show(t("messages:error.agent_update"), { isError: true });
      }
    },
    [agentSaved]
  );
  const handleDeleteAgent = useCallback(() => {
    if (agentSaved) {
      deleteAgentApi(agentSaved?._id);
    } else {
      show(t("messages:error.deleted_agent"), { isError: true });
    }
  }, [agentSaved]);
  const resendMail = useCallback(() => {
    if (agentSaved && agentSaved.storeId) {
      resendMailApi({
        email: agentSaved.email,
        storeId: agentSaved.storeId,
      });
    } else {
      show(t("messages:error.resend_invitation_email"), { isError: true });
    }
  }, [agentSaved]);
  const agentStatus = useMemo<{
    label: string;
    status: Status;
  }>(() => {
    if (agentSaved) {
      return getStatusAgent(agentSaved?.isActive, agentSaved?.emailConfirmed);
    }
    return {
      label: "",
      status: "warning",
    };
  }, [agentSaved]);

  const activator = (
    <Button
      //   primary
      onClick={() => {
        setActive(true);
      }}
      icon={<Icon source={EditMinor} color="base" />}
    ></Button>
  );

  const {
    state: modalRemove,
    on: showModalRemove,
    off: closeModalRemove,
  } = useToggle();

  const {
    state: modalDeactivate,
    on: showModalDeactivate,
    off: closeModalDeactivate,
  } = useToggle();

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title={
          agentSaved.lastName === "admin" ? (
            <div className="flex gap-2 flex-wrap">
              {agentSaved.firstName}
              <Badge status={agentStatus.status}>{agentStatus.label}</Badge>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {agentSaved?.firstName} {agentSaved?.lastName}
              <Badge status={agentStatus.status}>{agentStatus.label}</Badge>
            </div>
          )
        }
      >
        <Modal.Section>
          <AgentForm
            innerRef={formRef}
            initialValues={agentSaved}
            disableForm={
              (agentSaved.isActive && !agentSaved?.emailConfirmed) ||
              !agentSaved.isActive
            }
            enableReinitialize
            onValuesChange={toggle}
            onSubmit={handleSubmit}
          />
          {!agentSaved?.emailConfirmed && (
            <div className="pt-4 flex gap-2 items-center">
              {!isSendingMail ? (
                <Link
                  dataPrimaryLink
                  onClick={() => !isSendingMail && resendMail()}
                >
                  <Text variant="bodyLg" as="p">
                    Re-send Invitation Email
                  </Text>
                </Link>
              ) : (
                <Text variant="bodyLg" as="p">
                  <div
                    className={classNames({
                      "text-[#9CA3AF]": isSendingMail,
                    })}
                  >
                    Re-send Invitation Email
                  </div>
                </Text>
              )}

              {isSendingMail && (
                <Text as="span" variant="bodyLg">
                  ({countDown})
                </Text>
              )}
            </div>
          )}
          <div className="pt-6">
            <Stack distribution="trailing">
              {!agentSaved?.emailConfirmed && agentSaved?.isActive ? (
                <ButtonGroup>
                  <Button onClick={() => setActive(false)}>Cancel</Button>
                  <ModalDelete
                    open={modalRemove}
                    activator={
                      <Button onClick={showModalRemove} destructive>
                        Remove
                      </Button>
                    }
                    onClose={closeModalRemove}
                    title="Are you sure that you want to permanently remove this Agent"
                    content="This Agent will be removed permanently. This action cannot be undone"
                    loading={loadingDelete}
                    deleteAction={handleDeleteAgent}
                  />
                </ButtonGroup>
              ) : (
                <ButtonGroup>
                  <Button
                    onClick={() =>
                      //   navigate(generatePath(AgentRoutePaths.Index))
                      setActive(false)
                    }
                  >
                    Cancel
                  </Button>
                  {agentSaved?._id && (
                    <>
                      {agentSaved.isActive ? (
                        <div className="flex gap-2">
                          <ModalDelete
                            open={modalDeactivate}
                            textConfirm="Deactivate"
                            activator={
                              <Button
                                destructive
                                loading={loadingDeactivate}
                                onClick={showModalDeactivate}
                              >
                                Deactivate
                              </Button>
                            }
                            onClose={closeModalDeactivate}
                            title="Are you sure that you want to deactivate this Agent"
                            content="This Agent will set to Inactive. He/She will no longer have access to system"
                            loading={loadingDeactivate}
                            deleteAction={() =>
                              deActiveAgentApi(agentSaved._id)
                            }
                          />
                          <Button
                            primary
                            onClick={() => {
                              formRef.current?.submitForm();
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Button
                          primary
                          loading={loadingActive}
                          onClick={() => activeAgentApi(agentSaved._id)}
                        >
                          Active
                        </Button>
                      )}
                    </>
                  )}
                </ButtonGroup>
              )}
            </Stack>
          </div>
        </Modal.Section>
      </Modal>
    </div>
  );
};
