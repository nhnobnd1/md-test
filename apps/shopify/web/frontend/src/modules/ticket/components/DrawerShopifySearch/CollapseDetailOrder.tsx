import {
  Collapsible,
  LegacyCard,
  LegacyStack,
  TextContainer,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { DetailOrderCustomer } from "src/modules/ticket/components/DrawerShopifySearch/DetailOrderCustomer";

interface IProps {
  order: any;
  uniqueIndex: number;
}
const CollapseDetailOrder = ({ order, uniqueIndex }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  return (
    <LegacyCard sectioned>
      <LegacyStack vertical>
        {/* <Button
          onClick={handleToggle}
          ariaExpanded={open}
          ariaControls={`basic-collapsible-${uniqueIndex}`}
          fullWidth
        >
          <div className="d-flex justify-between">
                <p className={styles.orderName}>{order?.name}</p>
                <p className={styles.total}>
                  {order?.currency}
                  {order?.total}
                </p>
              </div>
        </Button> */}
        <div onClick={handleToggle}>
          <div className="d-flex justify-between">
            <p>{order?.name}</p>
            <p>
              {order?.currency}
              {order?.total}
            </p>
          </div>
        </div>
        <Collapsible
          open={open}
          id={`basic-collapsible-${uniqueIndex}`}
          transition={{ duration: "300ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
          <TextContainer>
            <DetailOrderCustomer dataOrder={order} />
          </TextContainer>
        </Collapsible>
      </LegacyStack>
    </LegacyCard>
  );
};
export default React.memo(CollapseDetailOrder);
