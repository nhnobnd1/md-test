import { Button, ButtonGroup, Card, Page, Stack } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef, useState } from "react";
import { generatePath } from "react-router-dom";
import AgentForm from "src/modules/agent/components/AgentForm/AgentForm";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface CreateAgentProps {}

const CreateAgent = (props: CreateAgentProps) => {
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const formRef = useRef<FormikProps<any>>(null);

  const handleSubmit = useCallback(
    (values: any) => {
      if (!isFirstSubmit) {
        setIsFirstSubmit(false);
      }
      console.log(values);
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
          <AgentForm
            innerRef={formRef}
            initialValues={{}}
            onSubmit={handleSubmit}
          />
          <div className="mt-4">
            <Stack distribution="trailing">
              <ButtonGroup>
                <Button onClick={() => formRef.current?.resetForm()}>
                  Cancel
                </Button>
                <Button>Set Password</Button>
                <Button onClick={() => formRef.current?.submitForm()} primary>
                  Send Invitation Email
                </Button>
              </ButtonGroup>
            </Stack>
          </div>
        </Card.Section>
      </Card>
    </Page>
  );
};

export default CreateAgent;
