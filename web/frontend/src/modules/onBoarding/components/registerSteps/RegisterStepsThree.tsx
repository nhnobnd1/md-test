import { Card, Link, Page, Text, TextContainer } from "@shopify/polaris";
import { useCallback } from "react";
import "src/modules/onBoarding/assets/style/components/registerSteps/register-steps-three.scss";

interface RegisterStepsThreeProps {
  previousStep: () => void;
}

const RegisterStepsThree = ({ previousStep }: RegisterStepsThreeProps) => {
  const TitleCard = () => {
    return (
      <Text variant="headingXl" as="h1">
        You&apos;re ready to go
      </Text>
    );
  };

  const redirectLandingPage = useCallback(() => {
    console.log("landing page");
  }, []);
  return (
    <Page>
      <Card
        title={<TitleCard />}
        primaryFooterAction={{
          content: "Back",
          onAction: previousStep,
        }}
        sectioned
      >
        <Text variant="headingLg" as="h4">
          Your helpdesk portal has been setup successfully
        </Text>
        <div className="mt-4 content-container">
          <div className="mb-4">
            <TextContainer spacing="tight">
              <Text variant="bodyMd" as="p">
                Your Support Portal address:
              </Text>
              <Text fontWeight="bold" variant="bodyMd" as="p">
                <span className="ml-4">Sub-domain.moosedesk.com</span>
              </Text>
            </TextContainer>
          </div>
          <div className="mb-4">
            <TextContainer spacing="tight">
              <Text variant="bodyMd" as="p">
                Support email address:
              </Text>
              <Text fontWeight="bold" variant="bodyMd" as="p">
                <span className="ml-4">email@mail.com</span>
              </Text>
            </TextContainer>
          </div>
          <Text variant="bodyMd" as="p">
            Any emails sent to this email address will automatically create new
            ticket in your support portal
          </Text>
          <div className="mt-4">
            <Link onClick={redirectLandingPage} external>
              Click here to start using your portal
            </Link>
          </div>
        </div>
      </Card>
    </Page>
  );
};

export default RegisterStepsThree;
