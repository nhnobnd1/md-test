import {
  convertSecondsToMinutesAndSeconds,
  generatePath,
  useCountDown,
  useJob,
  useLocation,
  useMount,
  useNavigate,
  useParams,
  useToggle,
} from "@moose-desk/core";
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
  ContextualSaveBar,
  Layout,
  LegacyCard,
  Link,
  Page,
  Stack,
  Text,
} from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";
import classNames from "classnames";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import Banner from "src/components/Banner/Banner";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { useBanner } from "src/hooks/useBanner";
import AgentForm, {
  AgentFormValues,
} from "src/modules/agent/components/AgentForm/AgentForm";
import { getStatusAgent } from "src/modules/agent/constant";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface CreateAgentProps {}

const DetailAgent = (props: CreateAgentProps) => {
  const { show } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<FormikProps<any>>(null);
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const [agentSaved, setAgentSaved] = useState<Agent>();
  const { toggle } = useToggle();
  const { state } = useLocation();
  const { id } = useParams();
  const {
    state: countDown,
    clearCountDown,
    initCountdown,
    checkTimerProcess,
  } = useCountDown({
    initValue: 300,
    key: id ?? "",
  });
  const { t, i18n } = useTranslation();

  const isSendingMail = useMemo(() => {
    return checkTimerProcess;
  }, [id, checkTimerProcess]);

  const { run: getDetailAgentApi, processing: loadingGetDetail } = useJob(
    (id: string) => {
      return AgentRepository()
        .getOne(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setAgentSaved(data.data);
            } else {
              showBanner("critical", {
                message: t("messages:error.get_agent"),
              });
              show(t("messages:error.get_agent"), { isError: true });
            }
          }),
          catchError((err) => {
            showBanner("critical", {
              message: t("messages:error.get_agent"),
            });
            show(t("messages:error.get_agent"), { isError: true });
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  useMount(() => {
    if (id) {
      getDetailAgentApi(id);
    } else {
      showBanner("critical", {
        title: "There is an error with information agent",
        message: t("messages:error.get_agent"),
      });
    }
  });

  useEffect(() => {
    if (state?.banner && state.banner?.status) {
      showBanner(state.banner.status, {
        title: state.banner.title ?? "",
        message: state.banner.message ?? "",
      });
    }
  }, [state]);

  const { run: updateAgentApi, processing: loadingUpdate } = useJob(
    (id: string, payload: UpdateAgentRequest) => {
      return AgentRepository()
        .update(id, payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              showBanner("success", {
                title: `Update ${data.data?.firstName} ${data.data?.lastName}`,
                message: t("messages:success.agent_update"),
              });
              setAgentSaved(data.data);
              show(t("messages:success.agent_update"));
            } else {
              showBanner("critical", {
                title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                message: t("messages:error.agent_update"),
              });
              show(t("messages:error.agent_update"), { isError: true });
            }
          }),
          catchError((err) => {
            showBanner("critical", {
              title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              message: t("messages:error.agent_update"),
            });
            show(t("messages:error.agent_update"), { isError: true });
            return of(err);
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const { run: resendMailApi } = useJob(
    (payload: ResendEmailInvitationRequest) => {
      return AgentRepository()
        .resendEmailInvitation(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              initCountdown(agentSaved?._id ?? id ?? "");
              showBanner("success", {
                title: `Resend invitation ${payload.email}`,
                message: t("messages:success.resend_invitation_email"),
              });
              show(t("messages:success.resend_invitation_email"));
            } else {
              showBanner("critical", {
                message: t("messages:error.resend_invitation_email"),
              });
              show(t("messages:error.resend_invitation_email"), {
                isError: true,
              });
            }
          }),
          catchError((err) => {
            showBanner("critical", {
              message: t("messages:error.resend_invitation_email"),
            });
            show(t("messages:error.resend_invitation_email"), {
              isError: true,
            });
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const { run: activeAgentApi, processing: loadingActive } = useJob(
    (id: string) => {
      return AgentRepository()
        .reActiveAgent(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              showBanner("success", {
                message: "Agent has been activated successfully.",
              });
              show(t("messages:success.active_agent"));
              getDetailAgentApi(id);
            } else {
              showBanner("critical", {
                message: t("messages:error.active_agent"),
              });
              show(t("messages:error.active_agent"), { isError: true });
            }
          }),
          catchError((err) => {
            showBanner("critical", {
              message: t("messages:error.active_agent"),
            });
            show(t("messages:error.active_agent"), { isError: true });
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const { run: deActiveAgentApi, processing: loadingDeactivate } = useJob(
    (id: string) => {
      return AgentRepository()
        .deActiveAgent(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              showBanner("success", {
                message: t("messages:success.deactivate_agent"),
              });
              show(t("messages:success.deactivate_agent"));
              getDetailAgentApi(id);
            } else {
              showBanner("critical", {
                message: t("messages:error.deactivate_agent"),
              });
              show(t("messages:error.deactivate_agent"), { isError: true });
            }
          }),
          catchError((err) => {
            showBanner("critical", {
              message: t("messages:error.deactivate_agent"),
            });
            show(t("messages:error.deactivate_agent"), { isError: true });
            return of(err);
          })
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
              show(t("messages:success.deleted_agent"));
              navigate(generatePath(AgentRoutePaths.Index), {
                state: {
                  banner: {
                    status: "success",
                    message:
                      "The selected agent has been removed from the system.",
                  },
                },
              });
            } else {
              showBanner("critical", {
                title: t("messages:error.deleted_agent"),
                message: "Remove agent failed",
              });
              show(t("messages:error.deleted_agent"), { isError: true });
            }
          }),
          catchError((err) => {
            showBanner("critical", {
              title: t("messages:error.deleted_agent"),
              message: "Remove agent failed",
            });
            show(t("messages:error.deleted_agent"), { isError: true });
            return of(err);
          })
        );
    }
  );

  const handleSubmit = useCallback(
    (values: AgentFormValues) => {
      const payload: UpdateAgentRequest = {
        ...values,
      };
      const idPayload = id ?? agentSaved?._id;
      if (idPayload) updateAgentApi(idPayload, payload);
      else {
        showBanner("critical", {
          title: "There is an error with update agent",
          message: "update agent failed",
        });
      }
    },
    [agentSaved]
  );

  const handleDeleteAgent = useCallback(() => {
    if (agentSaved) {
      deleteAgentApi(agentSaved?._id);
    } else {
      showBanner("critical", {
        title: t("messages:error.deleted_agent"),
        message: "Remove agent failed",
      });
    }
  }, [agentSaved]);

  const resendMail = useCallback(() => {
    if (agentSaved && agentSaved.storeId) {
      resendMailApi({
        email: agentSaved.email,
        storeId: agentSaved.storeId,
      });
    } else {
      showBanner("critical", {
        title: "There is an error with resend invitation email",
        message: t("messages:error.resend_invitation_email"),
      });
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

  // MODAL
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
    <>
      {formRef.current?.dirty && (
        <ContextualSaveBar
          fullWidth
          message={"Unsaved changes"}
          saveAction={{
            onAction: () => formRef.current?.submitForm(),
            disabled: !formRef.current?.dirty,
            loading: loadingUpdate,
          }}
          discardAction={{
            onAction: () => formRef.current?.resetForm(),
          }}
        />
      )}
      {agentSaved && (
        <Page
          breadcrumbs={[
            { content: "Agents", url: generatePath(AgentRoutePaths.Index) },
          ]}
          title={
            agentSaved.lastName === "admin"
              ? `${agentSaved.firstName}`
              : `${agentSaved?.firstName} ${agentSaved?.lastName}`
          }
          titleMetadata={
            <Badge status={agentStatus.status}>{agentStatus.label}</Badge>
          }
        >
          <Layout>
            {banner.visible && (
              <Layout.Section>
                <Banner banner={banner} onDismiss={closeBanner}></Banner>
              </Layout.Section>
            )}

            <Layout.Section>
              <LegacyCard>
                <LegacyCard.Section>
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
                          ({convertSecondsToMinutesAndSeconds(countDown)})
                        </Text>
                      )}
                    </div>
                  )}

                  <div className="pt-6">
                    <Stack distribution="trailing">
                      {!agentSaved?.emailConfirmed && agentSaved?.isActive ? (
                        <ButtonGroup>
                          <Button
                            onClick={() =>
                              navigate(generatePath(AgentRoutePaths.Index))
                            }
                          >
                            Cancel
                          </Button>
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
                              navigate(generatePath(AgentRoutePaths.Index))
                            }
                          >
                            Cancel
                          </Button>
                          {agentSaved?._id && (
                            <>
                              {agentSaved.isActive ? (
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
                                    deActiveAgentApi(agentSaved._id ?? id)
                                  }
                                />
                              ) : (
                                <Button
                                  primary
                                  loading={loadingActive}
                                  onClick={() =>
                                    activeAgentApi(agentSaved._id ?? id)
                                  }
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
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </>
  );
};

export default DetailAgent;
