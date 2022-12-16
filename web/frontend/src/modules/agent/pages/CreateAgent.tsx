import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Button,
  ButtonGroup,
  Card,
  Layout,
  Link,
  Page,
  Stack,
  Text,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import { useJob } from "src/core/hooks";
import useAuth from "src/hooks/useAuth";
import { useBanner } from "src/hooks/useBanner";
import AgentForm, {
  AgentFormValues,
} from "src/modules/agent/components/AgentForm/AgentForm";
import ModalSetPassword from "src/modules/agent/components/Modal/ModalSetPassword/ModalSetPassword";
import { Agent, CreateAgentRequest } from "src/modules/agent/models/Agent";
import AgentRepository from "src/modules/agent/repositories/AgentRepository";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface CreateAgentProps {}

const CreateAgent = (props: CreateAgentProps) => {
  const [invited, setInvited] = useState(false);
  const [modalSetPassword, setModalSetPassword] = useState(false);
  const { show } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<FormikProps<any>>(null);
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const [agentSaved, setAgentSaved] = useState<Agent>();

  const { run: createAgentApi, processing: loadingCreate } = useJob(
    (payload: CreateAgentRequest) => {
      return AgentRepository.create(payload).pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setAgentSaved(data.data);
            showBanner("success", {
              title: `Add ${data.data.lastName} ${data.data.firstName}`,
              message: data.message ?? "Add agent success",
            });
            show("Create Agent Success");
            setInvited(true);
          } else {
            showBanner("critical", {
              title: "There is an error with this agent",
              message: data.message ?? "Add agent failed",
            });
          }
        }),
        catchError((err) => {
          showBanner("critical", {
            title: "There is an error with configuration",
            message: "Add agent failed",
          });
          return of(err);
        })
      );
    },
    {
      showLoading: true,
    }
  );

  const { run: deleteAgentApi, processing: loadingDelete } = useJob(
    (id: string) => {
      return AgentRepository.delete(id).pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            showBanner("success", {
              title: `Remove ${agentSaved?.firstName} ${agentSaved?.lastName}`,
              message: data.message ?? "Remove agent success",
            });
            show("Remove Agent Success");
            navigate(generatePath(AgentRoutePaths.Index));
          } else {
            showBanner("critical", {
              title: "There is an error with remove agent",
              message: data.message ?? "Remove agent failed",
            });
          }
        })
      );
    }
  );

  const handleSubmit = useCallback(
    (values: AgentFormValues) => {
      const payload: CreateAgentRequest = {
        ...values,
        storeId: user?.id ?? null,
      };
      createAgentApi(payload);
    },
    [user]
  );

  const handleDeleteAgent = useCallback(() => {
    if (agentSaved) {
      deleteAgentApi(agentSaved?._id);
    }
  }, [agentSaved]);

  return (
    <Page
      breadcrumbs={[
        { content: "Agents", url: generatePath(AgentRoutePaths.Index) },
      ]}
      title="Create new agent"
    >
      <Layout>
        {banner.visible && (
          <Layout.Section>
            <Banner
              title={banner.title}
              status={banner.status}
              onDismiss={() => closeBanner()}
            >
              <Text variant="bodyMd" as="p" color="subdued">
                {banner.message}
              </Text>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <Card.Section>
              <AgentForm
                disableForm={invited}
                innerRef={formRef}
                onSubmit={handleSubmit}
              />
              {invited && (
                <div className="pt-4">
                  <Link dataPrimaryLink>
                    <Text variant="bodyLg" as="p">
                      Re-send Invitation Email
                    </Text>
                  </Link>
                </div>
              )}
              <div className="pt-6">
                <Stack distribution="trailing">
                  {invited ? (
                    <ButtonGroup>
                      <Button onClick={() => formRef.current?.resetForm()}>
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
                      <Button onClick={() => formRef.current?.resetForm()}>
                        Cancel
                      </Button>
                      <ModalSetPassword
                        activator={
                          <Button onClick={() => setModalSetPassword(true)}>
                            Set Password
                          </Button>
                        }
                        open={modalSetPassword}
                        onClose={() => setModalSetPassword(false)}
                      />
                      <Button
                        onClick={() => formRef.current?.submitForm()}
                        primary
                        loading={loadingCreate}
                      >
                        Send Invitation Email
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

export default CreateAgent;
