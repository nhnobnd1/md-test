import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  ButtonGroup,
  Card,
  Layout,
  Page,
  Stack,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import Banner from "src/components/Banner/Banner";
import { useJob } from "src/core/hooks";
import useAuth from "src/hooks/useAuth";
import { useBanner } from "src/hooks/useBanner";
import AgentForm, {
  AgentFormValues,
} from "src/modules/agent/components/AgentForm/AgentForm";
import ModalSetPassword from "src/modules/agent/components/Modal/ModalSetPassword/ModalSetPassword";
import { CreateAgentRequest } from "src/modules/agent/models/Agent";
import AgentRepository from "src/modules/agent/repositories/AgentRepository";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface CreateAgentProps {}

const CreateAgent = (props: CreateAgentProps) => {
  const [modalSetPassword, setModalSetPassword] = useState(false);
  const { show } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<FormikProps<any>>(null);
  const { banner, show: showBanner, close: closeBanner } = useBanner();

  const { run: createAgentApi, processing: loadingCreate } = useJob(
    (payload: CreateAgentRequest) => {
      return AgentRepository.create(payload).pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            showBanner("success", {
              title: `Add ${data.data.firstName} ${data.data.lastName}`,
              message: "Add agent success",
            });
            show("Create Agent Success");
            navigate(
              generatePath(AgentRoutePaths.Detail, { id: data.data._id }),
              {
                state: {
                  banner: {
                    status: "success",
                    title: `Add agent ${data.data.firstName} ${data.data.lastName}`,
                    message:
                      "Invitation Email has been sent to Agent’s email address.",
                  },
                },
              }
            );
          } else {
            showBanner("critical", {
              title: "There is an error with this agent",
              message: "Add agent failed",
            });
          }
        }),
        catchError((err) => {
          showBanner("critical", {
            title: "There is an error with this agent",
            message: "Add agent failed",
          });
          return of(err);
        })
      );
    },
    { showLoading: true }
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
            <Banner banner={banner} onDismiss={closeBanner}></Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <Card.Section>
              <AgentForm innerRef={formRef} onSubmit={handleSubmit} />
              <div className="pt-6">
                <Stack distribution="trailing">
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
