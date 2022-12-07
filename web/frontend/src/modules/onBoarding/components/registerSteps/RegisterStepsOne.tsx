import { Layout, MediaCard, Page } from "@shopify/polaris";
import { useCallback } from "react";

interface RegisterStepsOneProps {
  nextStep: () => void;
}

const RegisterStepsOne = ({ nextStep }: RegisterStepsOneProps) => {
  const handleStart = useCallback(() => {
    nextStep();
  }, []);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <MediaCard
            title="Getting Started"
            size="medium"
            primaryAction={{
              content: "Click here to start",
              onAction: handleStart,
            }}
            description="Start app shopify"
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
            />
          </MediaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default RegisterStepsOne;
