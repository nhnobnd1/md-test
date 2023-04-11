import { LeftCircleOutlined } from "@ant-design/icons";
import { useToggle } from "@moose-desk/core";
import { Tooltip } from "antd";
import DetailTicketForm from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import DrawerShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/DrawerShopifySearch";
import styles from "./styles.module.scss";
interface DetailTicketProps {}

const DetailTicket = (props: DetailTicketProps) => {
  const {
    state: visibleDrawer,
    on: openDrawer,
    off: closeDrawer,
  } = useToggle(false);

  const handleOpenDrawerSearch = () => {
    openDrawer();
  };
  const handleCloseDrawerSearch = () => {
    closeDrawer();
  };
  return (
    <div className={styles.wrapContent}>
      <div className={styles.wrapSearchToggle}>
        <Tooltip title="Search Order Shopify">
          <LeftCircleOutlined
            className={styles.toggleButton}
            onClick={handleOpenDrawerSearch}
          />
        </Tooltip>
      </div>
      <DetailTicketForm />
      <></>
      <DrawerShopifySearch
        visible={visibleDrawer}
        onClose={handleCloseDrawerSearch}
      />
    </div>
  );
};

export default DetailTicket;
