import {
  Button,
  ButtonGroup,
  Card,
  Layout,
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
      <Card sectioned>
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
                      <p>
                        {`Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.`}
                      </p>
                      <p>
                        {`Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.`}
                      </p>
                      <p>
                        {`Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.`}
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
      </Card>
    </Page>
  );
};

export default RegisterStepsOne;
