import {
  Button,
  ButtonGroup,
  Layout,
  LegacyCard,
  Page,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import { useCallback } from "react";
import Images from "src/assets/images";

interface RegisterStepsOneProps {
  nextStep: () => void;
}

const RegisterStepsOne = ({ nextStep }: RegisterStepsOneProps) => {
  const handleStart = useCallback(() => {
    nextStep();
  }, []);

  return (
    <Page fullWidth>
      <LegacyCard sectioned>
        <Layout>
          <Layout.Section oneThird>
            <div className="flex items-center justify-center">
              <img
                alt=""
                width="80%"
                height="80%"
                src={Images.Logo.onBoardingLogo}
              />
            </div>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Layout>
              <Layout.Section>
                <TextContainer spacing="tight">
                  <div className="pt-8 pb-8 pr-8">
                    <TextContainer spacing="loose">
                      <p>2023 MooseDesk. All Rights Reserved.</p>
                      <p>
                        Designed to unify all customer tickets from different
                        channels into one seamless helpdesk.
                      </p>
                      <p>
                        {` Happier customers > more sales > faster growth.`}
                      </p>
                    </TextContainer>
                  </div>
                </TextContainer>
              </Layout.Section>
              <Layout.Section fullWidth>
                <div className="mr-8">
                  <Stack distribution="trailing">
                    <ButtonGroup>
                      <Button onClick={handleStart}>Click here to start</Button>
                    </ButtonGroup>
                  </Stack>
                </div>
              </Layout.Section>
            </Layout>
          </Layout.Section>
        </Layout>
      </LegacyCard>
    </Page>
  );
};

export default RegisterStepsOne;
