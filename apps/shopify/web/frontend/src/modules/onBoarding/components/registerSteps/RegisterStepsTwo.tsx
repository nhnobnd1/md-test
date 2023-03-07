import { Card, LegacyCard, Page, Text } from "@shopify/polaris";
import { useCallback } from "react";
import { useSubdomain } from "src/hooks/useSubdomain";

interface RegisterStepsTwoProps {
  nextStep: () => void;
}

enum RadioButtonValue {
  OwnEmail = "ownEmail",
  AccountEmail = "accountEmail",
}

const RegisterStepsTwo = ({ nextStep }: RegisterStepsTwoProps) => {
  const { getSubDomain } = useSubdomain();
  const TitleCard = () => {
    return (
      <Text variant="headingXl" as="h1">
        Just a moment before coming to MooseDesk
      </Text>
    );
  };

  const handleActionStep = useCallback(() => {
    nextStep();
  }, []);

  return (
    <Page>
      <Card
        title={<TitleCard />}
        primaryFooterAction={{
          content: "Next",
          onAction: handleActionStep,
        }}
        sectioned
      >
        <LegacyCard
          title={
            <Text as="h4" variant="headingLg" fontWeight="semibold">
              Default portal email address
            </Text>
          }
          sectioned
        >
          <div className="mb-2">
            <Text as="h4" variant="bodyLg" fontWeight="bold">
              support@{getSubDomain()}.moosedesk.com
            </Text>
          </div>
          <Text as="p" variant="bodyMd">
            This email will be your receiver. Any emails sent to this email
            address will become a ticket in your helpdesk.
          </Text>
        </LegacyCard>
        <div className="p-4 w-[76%]">
          <Text as="p" variant="bodyMd">
            You can also setup your own email address after finishing the
            onboarding process. To do this, please go to Settings {`->`} General
            Settings for email configuration.
          </Text>
        </div>
      </Card>
    </Page>
  );
};

export default RegisterStepsTwo;
