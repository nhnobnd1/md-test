import {
  Button,
  Card,
  Page,
  RadioButton,
  Stack,
  Text,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Form, { RefProperties } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import LogosMicrosoftWindows from "~icons/logos/microsoft-windows";

interface RegisterStepsTwoProps {
  nextStep: () => void;
}

enum RadioButtonValue {
  OwnEmail = "ownEmail",
  AccountEmail = "accountEmail",
}

const RegisterStepsTwo = ({ nextStep }: RegisterStepsTwoProps) => {
  const [value, setValue] = useState<RadioButtonValue>(
    RadioButtonValue.OwnEmail
  );
  const handleChange = useCallback((_checked, newValue) => {
    setValue(newValue);
  }, []);

  const callBackLoginGoogle = (
    state: "success" | "failure",
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    return state;
  };

  const ContentOwnEmail = () => {
    return (
      <div className="mt-2">
        <Stack spacing="baseTight">
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(response) => callBackLoginGoogle("success", response)}
            onFailure={(response) => callBackLoginGoogle("failure", response)}
            cookiePolicy={"single_host_origin"}
          />
          <Button
            size="medium"
            onClick={submit}
            icon={<LogosMicrosoftWindows />}
          >
            Microsoft
          </Button>
        </Stack>
        <p className="mt-2">
          If you want to use your own custom mail server, you can configure
          those settings using IMAP and SMTP in Application Settings
        </p>
      </div>
    );
  };

  const ContentAccountEmail = () => {
    return (
      <div className="mt-2">
        <TextContainer spacing="tight">
          <Text variant="headingMd" as="h2" color="critical">
            support@%sub-domain%.moosedesk.com
          </Text>
          <p>
            This email will be your receiver. Any emails sent to this email
            address will become a ticket in your helpdesk
          </p>
        </TextContainer>
      </div>
    );
  };

  const formRef = useRef<RefProperties>();

  const handleSubmit = (values: any) => {
    return values;
  };

  const submit = () => {
    formRef.current?.form.submitForm();
  };

  const TitleCard = () => {
    return (
      <Text variant="headingXl" as="h1">
        Just a moment before coming to MooseDesk
      </Text>
    );
  };

  return (
    <Page>
      <Card
        title={<TitleCard />}
        primaryFooterAction={{
          content: "Next",
          onAction: nextStep,
        }}
        sectioned
      >
        <Text variant="headingLg" as="h4">
          How would you like your support email works?
        </Text>

        <Form ref={formRef} initialValues={{}} onSubmit={handleSubmit}>
          <FormItem name="keyword">
            <TextField label="Store name" autoComplete="off" />
          </FormItem>
        </Form>

        <Card.Section>
          <RadioButton
            label="Using your own email"
            helpText={<ContentOwnEmail />}
            id={RadioButtonValue.OwnEmail}
            checked={value === RadioButtonValue.OwnEmail}
            name="emailSetup"
            onChange={handleChange}
          />
        </Card.Section>
        <Card.Section>
          <RadioButton
            label="Use the email we have setup for your account"
            helpText={<ContentAccountEmail />}
            id={RadioButtonValue.AccountEmail}
            checked={value === RadioButtonValue.AccountEmail}
            name="emailSetup"
            onChange={handleChange}
          />
        </Card.Section>
      </Card>
    </Page>
  );
};

export default RegisterStepsTwo;
