import {
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";
import { Fragment } from "react";
interface IProps {
  lines?: number;
  count?: number;
  noHeading?: boolean;
}
const SkeletonCard = ({ lines = 3, count = 1, noHeading = false }: IProps) => {
  const listSkeleton = Array.from({ length: count });
  return (
    <Fragment>
      {listSkeleton.map((_, index) => (
        <LegacyCard key={index}>
          <LegacyCard.Section>
            <TextContainer>
              {!noHeading && <SkeletonDisplayText size="medium" />}
              <SkeletonBodyText lines={lines} />
            </TextContainer>
          </LegacyCard.Section>
        </LegacyCard>
      ))}
    </Fragment>
  );
};

export default SkeletonCard;
