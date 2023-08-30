import { Button, LegacyCard, Link, Page, Text } from "@shopify/polaris";
import classNames from "classnames";
import { useCallback } from "react";
import { useSubdomain } from "src/hooks/useSubdomain";
import styles from "./styles.module.scss";
interface RegisterStepsTwoProps {
  nextStep: () => void;
  preStep: () => void;
}

enum RadioButtonValue {
  OwnEmail = "ownEmail",
  AccountEmail = "accountEmail",
}

const RegisterStepsTwo = ({ nextStep, preStep }: RegisterStepsTwoProps) => {
  const { getSubDomain, getDomainStandalone } = useSubdomain();
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
      <LegacyCard
        title={<TitleCard />}
        // primaryFooterAction={{
        //   content: "Next",
        //   onAction: handleActionStep,
        // }}
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
              {getSubDomain()}@email{getDomainStandalone()}
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
        <div className={classNames(styles.groupButtonStep2, "mt-4")}>
          <Link onClick={preStep}>Back</Link>
          <Button onClick={handleActionStep} primary>
            Next
          </Button>
        </div>
      </LegacyCard>
    </Page>
  );
};

export default RegisterStepsTwo;
