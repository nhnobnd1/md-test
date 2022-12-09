import {
  Button,
  Card,
  FormLayout,
  Page,
  RadioButton,
  Stack,
  Text,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import * as Yup from "yup";
import LogosGoogleIcon from "~icons/logos/google-icon";
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

  const disableButtonOwnEmail = useMemo(() => {
    return value !== RadioButtonValue.OwnEmail;
  }, [value]);

  // View Options Own Account Social
  const [typeSignEmail, setTypeSignEmail] = useState<
    "gmail" | "microsoft" | null
  >(null);
  const SignupAccountSchema = Yup.object().shape({
    username: Yup.string().required("You must enter an account"),
    password: Yup.string().required("You must enter password").min(6).max(125),
  });

  const formRef = useRef<FormikProps<any>>(null);

  const handleSubmitForm = useCallback((values: any) => {
    return values;
  }, []);

  const ContentOwnEmail = () => {
    return (
      <div className="mt-2 owner-account">
        <Stack spacing="baseTight">
          <Button
            size="medium"
            disabled={disableButtonOwnEmail}
            icon={<LogosGoogleIcon />}
            primary={typeSignEmail === "gmail"}
            onClick={() => setTypeSignEmail("gmail")}
          >
            Gmail
          </Button>
          <Button
            size="medium"
            disabled={disableButtonOwnEmail}
            icon={<LogosMicrosoftWindows />}
            primary={typeSignEmail === "microsoft"}
            onClick={() => setTypeSignEmail("microsoft")}
          >
            Microsoft
          </Button>
        </Stack>
        <p className="mt-2">
          If you want to use your own custom mail server, you can configure
          those settings using IMAP and SMTP in Application Settings
        </p>
        {typeSignEmail && (
          <div className="mt-[32px]">
            <FormLayout>
              <FormItem name="username">
                <TextField
                  label="Email or phone"
                  autoComplete="off"
                  placeholder="Email or phone"
                ></TextField>
              </FormItem>
              <FormItem name="password">
                <TextField
                  label="Password"
                  autoComplete="off"
                  placeholder="Password"
                ></TextField>
              </FormItem>
            </FormLayout>
          </div>
        )}
      </div>
    );
  };

  // View Options Your Account
  const ContentAccountEmail = () => {
    return (
      <div className="mt-2">
        <TextContainer spacing="tight">
          <Text
            variant="headingMd"
            as="h2"
            color={disableButtonOwnEmail ? "critical" : "subdued"}
          >
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

  const TitleCard = () => {
    return (
      <Text variant="headingXl" as="h1">
        Just a moment before coming to MooseDesk
      </Text>
    );
  };

  const getActiveBtnAction = useCallback(
    (isValid: boolean, dirty: boolean) => {
      if (value === RadioButtonValue.AccountEmail) {
        return true;
      } else {
        return !dirty ? false : isValid;
      }
    },
    [value, typeSignEmail]
  );

  const handleActionStep = useCallback(() => {
    nextStep();
  }, []);

  useEffect(() => {
    if (value === RadioButtonValue.AccountEmail) {
      setTypeSignEmail(null);
      formRef.current?.resetForm();
    }
  }, [value]);

  return (
    <Page>
      <Form
        ref={formRef}
        validationSchema={SignupAccountSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmitForm}
      >
        {({ isValid, dirty }) => (
          <Card
            title={<TitleCard />}
            primaryFooterAction={{
              content: "Next",
              onAction: handleActionStep,
              disabled: !getActiveBtnAction(isValid, dirty),
            }}
            sectioned
          >
            <Text variant="headingLg" as="h4">
              How would you like your support email works?
            </Text>

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
        )}
      </Form>
    </Page>
  );
};

export default RegisterStepsTwo;
