import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import { Tooltip } from "antd";
import classNames from "classnames";
import { useEffect } from "react";
import DetailTicketForm from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import styles from "./styles.module.scss";
interface DetailTicketProps {}

const DetailTicket = (props: DetailTicketProps) => {
  const { visible, setVisible } = useToggleGlobal();

  const handleOpenDrawerSearch = () => {
    setVisible(true);
  };
  const handleCloseDrawerSearch = () => {
    setVisible(false);
  };
  const _renderButtonToggle = () => {
    return !visible ? (
      <LeftCircleOutlined
        className={styles.toggleButton}
        onClick={handleOpenDrawerSearch}
      />
    ) : (
      <RightCircleOutlined
        className={styles.toggleButton}
        onClick={handleCloseDrawerSearch}
      />
    );
  };
  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);
  return (
    <section className={classNames(styles.container, { "d-flex": visible })}>
      <div className={styles.wrapContent}>
        <div className={styles.wrapSearchToggle}>
          <Tooltip title={visible ? "Close" : "Search Order Shopify"}>
            {_renderButtonToggle()}
          </Tooltip>
        </div>
        <DetailTicketForm />
      </div>
      <div className={visible ? "" : "d-none"}>
        <ContentShopifySearch />
      </div>
    </section>
  );
};

export default DetailTicket;
