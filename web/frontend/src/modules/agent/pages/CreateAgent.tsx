import {
  Button,
  ButtonGroup,
  Card,
  Link,
  Page,
  Stack,
  Text,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef, useState } from "react";
import { generatePath } from "react-router-dom";
import AgentForm from "src/modules/agent/components/AgentForm/AgentForm";
import ModalSetPassword from "src/modules/agent/components/Modal/ModalSetPassword/ModalSetPassword";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface CreateAgentProps {}

const CreateAgent = (props: CreateAgentProps) => {
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [invited, setInvited] = useState(false);
  const [modalSetPassword, setModalSetPassword] = useState(false);
  const formRef = useRef<FormikProps<any>>(null);

  const handleSubmit = useCallback(
    (values: any) => {
      console.log(values);
      if (!isFirstSubmit) {
        setIsFirstSubmit(false);
      }
      setInvited(true);
    },
    [isFirstSubmit]
  );

  return (
    <Page
      fullWidth
      breadcrumbs={[
        { content: "Agents", url: generatePath(AgentRoutePaths.Index) },
      ]}
      title="Create new agent"
    >
      <Card>
        <Card.Section>
          <AgentForm innerRef={formRef} onSubmit={handleSubmit} />
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
                  <Button onClick={() => console.log("remove")} destructive>
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
                  <Button onClick={() => formRef.current?.submitForm()} primary>
                    Send Invitation Email
                  </Button>
                </ButtonGroup>
              )}
            </Stack>
          </div>
        </Card.Section>
      </Card>
    </Page>
  );
};

export default CreateAgent;
