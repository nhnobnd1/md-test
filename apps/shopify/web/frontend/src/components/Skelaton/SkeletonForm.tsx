import {
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { Fragment } from "react";
interface IProps {
  noHeading?: boolean;
  listLabels: string[];
}
const SkeletonForm = ({ noHeading = false, listLabels }: IProps) => {
  return (
    <Fragment>
      <LegacyCard>
        {!noHeading && (
          <LegacyCard.Section>
            <TextContainer>
              <SkeletonDisplayText size="medium" />
            </TextContainer>
          </LegacyCard.Section>
        )}
        <LegacyCard.Section>
          {listLabels.map((text: string, index) => (
            <div style={{ marginBottom: 8 }} key={index}>
              <TextContainer>
                <div style={{ marginBottom: 4 }}>
                  <Text as="span" variant="bodyMd">
                    {text}
                  </Text>
                </div>
                <SkeletonBodyText lines={1} />
              </TextContainer>
            </div>
          ))}
        </LegacyCard.Section>
        {/* <LegacyCard.Section>
          <TextContainer>
            <SkeletonBodyText lines={1} />
          </TextContainer>
        </LegacyCard.Section> */}
      </LegacyCard>
    </Fragment>
  );
};

export default SkeletonForm;
