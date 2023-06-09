import {
  Grid,
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";
import styles from "./styles.module.scss";
interface IProps {
  columnsCount?: number;
  rowsCount?: number;
}
export const SkeletonTable = ({ columnsCount = 5, rowsCount = 10 }: IProps) => {
  const listRow = Array.from({ length: rowsCount });
  const listColumns = Array.from({ length: columnsCount });

  return (
    <LegacyCard>
      <LegacyCard.Section>
        <Grid
          columns={{
            xs: columnsCount,
            sm: columnsCount,
            md: columnsCount,

            lg: columnsCount,
            xl: columnsCount,
          }}
        >
          {listColumns.map((__, index) => (
            <Grid.Cell
              key={index}
              columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
            >
              {/* <TextContainer> */}
              <div className={styles.heading}>
                <SkeletonDisplayText size="small" />
              </div>
              {/* </TextContainer> */}

              {listRow.map((_, index) => (
                <div style={{ padding: "8px 16px" }} key={index}>
                  <TextContainer>
                    <SkeletonBodyText lines={1} />
                  </TextContainer>
                </div>
              ))}
            </Grid.Cell>
          ))}
        </Grid>
      </LegacyCard.Section>
    </LegacyCard>
  );
};
