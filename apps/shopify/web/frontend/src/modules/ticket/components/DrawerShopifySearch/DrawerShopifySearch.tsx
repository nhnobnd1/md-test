import { Modal } from "@shopify/polaris";
import { memo } from "react";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
// import { MDDrawer } from "src/components/UI/MDDrawer";
interface IProps {
  visible: boolean;
  onClose: () => void;
}
const DrawerShopifySearch = ({ visible, onClose }: IProps) => {
  return (
    <Modal title="" open={visible} onClose={onClose} titleHidden fullScreen>
      <ContentShopifySearch />
    </Modal>
  );
};
export default memo(DrawerShopifySearch);
