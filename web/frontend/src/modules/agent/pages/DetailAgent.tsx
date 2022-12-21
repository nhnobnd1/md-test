import { useToast } from "@shopify/app-bridge-react";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Layout,
  Link,
  Page,
  Stack,
  Text,
} from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { catchError, map, of } from "rxjs";
import Banner from "src/components/Banner/Banner";
import { useJob, useMount } from "src/core/hooks";
import { useBanner } from "src/hooks/useBanner";
import AgentForm, {
  AgentFormValues,
} from "src/modules/agent/components/AgentForm/AgentForm";
import {
  Agent,
  ResendEmailInvitationRequest,
  UpdateAgentRequest,
} from "src/modules/agent/models/Agent";
import AgentRepository from "src/modules/agent/repositories/AgentRepository";
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

  const { run: getDetailAgentApi } = useJob((id: string) => {
    return AgentRepository.getOne(id).pipe(
      map(
        ({ data }) => {
          if (data.statusCode === 200) {
            setAgentSaved(data.data);
          } else {
            showBanner("critical", {
              title: "There is an error with information agent",
              message: "Get data agent failed",
            });
          }
        },
        catchError((err) => {
          showBanner("critical", {
            title: "There is an error with information agent",
            message: "Get data agent failed",
          });
          return of(err);
        })
      )
    );
  });

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
      return AgentRepository.update(id, payload).pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            console.log(data);
            showBanner("success", {
              title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              message: "Update agent success",
            });
            show("Update Agent Success");
          } else {
            showBanner("critical", {
              title: `Update ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              message: "Update agent failed",
            });
            show("Update Agent Failed");
          }
        })
      );
    }
  );

  const { run: resendMailApi } = useJob(
    (payload: ResendEmailInvitationRequest) => {
      return AgentRepository.resendEmailInvitation(payload).pipe(
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
                title: "There is an error with resend invitation email",
                message: "Resend invitation email failed",
              });
            }
          },

          catchError((err) => {
            showBanner("critical", {
              title: "There is an error with resend invitation email",
              message: "Resend invitation email failed",
            });
            return of(err);
          })
        )
      );
    },
    { showLoading: true }
  );

  const { run: activeAgentApi, processing: loadingActive } = useJob(
    (id: string) => {
      return AgentRepository.reActiveAgent(id).pipe(
        map(
          ({ data }) => {
            if (data.statusCode === 200) {
              showBanner("success", {
                title: `Active agent ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                message: "Active agent success",
              });
              show("Active agent success");
              getDetailAgentApi(id);
            } else {
              showBanner("critical", {
                title: `Active agent ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                message: "Active agent failed",
              });
              show("Active agent failed");
            }
          },
          catchError((err) => {
            showBanner("critical", {
              title: `Active agent ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              message: "Active agent failed",
            });
            show("Active agent failed");
            return of(err);
          })
        )
      );
    },
    { showLoading: true }
  );

  const { run: deActiveAgentApi, processing: loadingDeactivate } = useJob(
    (id: string) => {
      return AgentRepository.deActiveAgent(id).pipe(
        map(
          ({ data }) => {
            if (data.statusCode === 200) {
              showBanner("success", {
                title: `Deactivate agent ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                message: "Deactivate agent success",
              });
              show("Deactivate agent success");
              getDetailAgentApi(id);
            } else {
              showBanner("critical", {
                title: `Deactivate agent ${agentSaved?.firstName} ${agentSaved?.lastName}`,
                message: "Deactivate agent failed",
              });
              show("Deactivate agent failed");
            }
          },
          catchError((err) => {
            showBanner("critical", {
              title: `Deactivate agent ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              message: "Deactivate agent failed",
            });
            show("Deactivate agent failed");
            return of(err);
          })
        )
      );
    },
    { showLoading: true }
  );

  const { run: deleteAgentApi, processing: loadingDelete } = useJob(
    (id: string) => {
      return AgentRepository.delete(id).pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            showBanner("success", {
              title: `Remove ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              message: "Remove agent success",
            });
            show("Remove Agent Success");
            navigate(generatePath(AgentRoutePaths.Index));
          } else {
            showBanner("critical", {
              title: "There is an error with remove agent",
              message: "Remove agent failed",
            });
            show("Remove Agent Failed");
          }
        }),
        catchError((err) => {
          showBanner("critical", {
            title: "There is an error with remove agent",
            message: "Remove agent failed",
          });
          show("Remove Agent Failed");
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
    console.log(agentSaved, "agentSaved");
    if (agentSaved?.isActive) {
      if (agentSaved.emailConfirmed) {
        return {
          label: "Active",
          status: "success",
        };
      } else
        return {
          label: "Invited",
          status: "info",
        };
    } else
      return {
        label: "Deactivate",
        status: "critical",
      };
  }, [agentSaved]);

  return (
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
                disableForm={!agentSaved?.emailConfirmed}
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
                      <Button
                        onClick={handleDeleteAgent}
                        loading={loadingDelete}
                        destructive
                      >
                        Remove
                      </Button>
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
                        <Button
                          primary={!agentSaved?.isActive}
                          destructive={agentSaved?.isActive}
                          loading={loadingActive || loadingDeactivate}
                          onClick={() =>
                            agentSaved?.isActive
                              ? deActiveAgentApi(agentSaved._id ?? id)
                              : activeAgentApi(agentSaved._id ?? id)
                          }
                        >
                          {agentSaved?.isActive ? "Deactivate" : "Active"}
                        </Button>
                      )}

                      <Button
                        onClick={() => formRef.current?.submitForm()}
                        loading={loadingDelete}
                        primary
                      >
                        Save
                      </Button>
                    </ButtonGroup>
                  )}
                </Stack>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default DetailAgent;
