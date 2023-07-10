import { TitleBar } from "@shopify/app-bridge-react";
import {
  Heading,
  Layout,
  LegacyCard,
  Page,
  TextContainer,
} from "@shopify/polaris";

export default function PageName() {
  return (
    <Page>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: "Primary action",
        }}
        secondaryActions={[
          {
            content: "Secondary action",
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </LegacyCard>
          <LegacyCard sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
