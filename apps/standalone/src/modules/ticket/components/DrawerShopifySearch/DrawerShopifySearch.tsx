import { memo } from "react";
import { MDDrawer } from "src/components/UI/MDDrawer";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
interface IProps {
  visible: boolean;
  onClose: () => void;
}
const DrawerShopifySearch = ({ visible, onClose }: IProps) => {
  return (
    <MDDrawer
      title="Shopify Orders"
      visible={visible}
      onClose={onClose}
      content={<ContentShopifySearch />}
    />
  );
};
export default memo(DrawerShopifySearch);
