import {
  generatePath,
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
  Card,
  Layout,
  Link,
  Loading,
  Page,
  Stack,
  Text,
} from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";
import { FormikProps } from "formik";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const { state } = useLocation();
  const { id } = useParams();

  const { run: getDetailAgentApi, processing: loadingGetDetail } = useJob(
    (id: string) => {
      return AgentRepository()
        .getOne(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                setAgentSaved(data.data);
              } else {
                showBanner("critical", {
                  message: "Get data agent failed",
                });
                show("Get data agent failed", { isError: true });
              }
            },
            catchError((err) => {
              showBanner("critical", {
                message: "Get data agent failed",
              });
              show("Get data agent failed", { isError: true });
              return of(err);
            })
          )
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
        message: "Get data agent failed",
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

  const { run: updateAgentApi } = useJob(
    (id: string, payload: UpdateAgentRequest) => {
      return AgentRepository()
        .update(id, payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                showBanner("success", {
                  title: `Update ${data.data?.firstName} ${data.data?.lastName}`,
                  message: "Agent has been updated successfully",
                });
                setAgentSaved(data.data);
                show("Agent has been updated successfully");
              } else {
                showBanner("critical", {
                  title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                  message: "Agent has been updated failed",
                });
                show("Agent has been updated failed", { isError: true });
              }
            },
            catchError((err) => {
              showBanner("critical", {
                title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                message: "Agent has been updated failed",
              });
              show("Agent has been updated failed", { isError: true });
              return of(err);
            })
          )
        );
    }
  );

  const { run: resendMailApi } = useJob(
    (payload: ResendEmailInvitationRequest) => {
      return AgentRepository()
        .resendEmailInvitation(payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                showBanner("success", {
                  title: `Resend invitation ${payload.email}`,
                  message: "Resend invitation mail success",
                });
                show("Resend mail success");
              } else {
                showBanner("critical", {
                  message: "Resend invitation email failed",
                });
                show("Resend mail failed", { isError: true });
              }
            },

            catchError((err) => {
              showBanner("critical", {
                message: "Resend invitation email failed",
              });
              show("Resend mail failed", { isError: true });
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );

  const { run: activeAgentApi, processing: loadingActive } = useJob(
    (id: string) => {
      return AgentRepository()
        .reActiveAgent(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                showBanner("success", {
                  message: "Agent has been activated successfully.",
                });
                show("Active agent success");
                getDetailAgentApi(id);
              } else {
                showBanner("critical", {
                  message: "Active agent failed",
                });
                show("Active agent failed", { isError: true });
              }
            },
            catchError((err) => {
              showBanner("critical", {
                message: "Active agent failed",
              });
              show("Active agent failed", { isError: true });
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );

  const { run: deActiveAgentApi, processing: loadingDeactivate } = useJob(
    (id: string) => {
      return AgentRepository()
        .deActiveAgent(id)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                showBanner("success", {
                  message: "Agent has been deactivated successfully.",
                });
                show("Deactivate agent success");
                getDetailAgentApi(id);
              } else {
                showBanner("critical", {
                  message: "Deactivate agent failed",
                });
                show("Deactivate agent failed", { isError: true });
              }
            },
            catchError((err) => {
              showBanner("critical", {
                message: "Deactivate agent failed",
              });
              show("Deactivate agent failed", { isError: true });
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
              show("Remove Agent Success");
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
                title: "There is an error with remove agent",
                message: "Remove agent failed",
              });
              show("Remove Agent Failed", { isError: true });
            }
          }),
          catchError((err) => {
            showBanner("critical", {
              title: "There is an error with remove agent",
              message: "Remove agent failed",
            });
            show("Remove Agent Failed", { isError: true });
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
        title: "There is an error with remove agent",
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
        message: "Resend invitation email failed",
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
      <Suspense
        fallback={
          <div
            className="flex items-center content-center w"
            style={{ width: "100vw", height: "100vh" }}
          >
            <Loading />
          </div>
        }
      >
        {agentSaved && (
          <Page
            breadcrumbs={[
              { content: "Agents", url: generatePath(AgentRoutePaths.Index) },
            ]}
            title={`${agentSaved?.firstName} ${agentSaved?.lastName}`}
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
                <Card>
                  <Card.Section>
                    <AgentForm
                      innerRef={formRef}
                      initialValues={agentSaved}
                      disableForm={
                        (agentSaved.isActive && !agentSaved?.emailConfirmed) ||
                        !agentSaved.isActive
                      }
                      enableReinitialize
                      onSubmit={handleSubmit}
                    />
                    {!agentSaved?.emailConfirmed && (
                      <div className="pt-4">
                        <Link dataPrimaryLink onClick={resendMail}>
                          <Text variant="bodyLg" as="p">
                            Re-send Invitation Email
                          </Text>
                        </Link>
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
                            {agentSaved.isActive && (
                              <Button
                                onClick={() => formRef.current?.submitForm()}
                                loading={loadingDelete}
                                primary
                              >
                                Save
                              </Button>
                            )}
                          </ButtonGroup>
                        )}
                      </Stack>
                    </div>
                  </Card.Section>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        )}
      </Suspense>
    </>
  );
};

export default DetailAgent;
