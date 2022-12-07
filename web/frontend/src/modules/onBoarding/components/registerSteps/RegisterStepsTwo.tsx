import {
  Button,
  Card,
  Page,
  RadioButton,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
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

  const ContentOwnEmail = () => {
    return (
      <div className="mt-2">
        <Stack spacing="baseTight">
          <Button
            size="medium"
            disabled={disableButtonOwnEmail}
            icon={<LogosGoogleIcon />}
          >
            Gmail
          </Button>
          <Button
            size="medium"
            disabled={disableButtonOwnEmail}
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
