import { MediaScreen } from "@moose-desk/core";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import classNames from "classnames";
import { useEffect } from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import useViewport from "src/hooks/useViewport";
import DetailTicketForm from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import DrawerShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/DrawerShopifySearch";
import styles from "./styles.module.scss";

const DetailTicket = () => {
  const { visible, setVisible } = useToggleGlobal();
  const { isMobile } = useViewport(MediaScreen.LG);
  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);
  return (
    <section className={classNames(styles.container, { "d-flex": visible })}>
      <div
        className={classNames(styles.wrapContent, {
          [styles.maxWidthContent]: visible && !isMobile,
        })}
      >
        <div className={styles.wrapSearchToggle}>
          <MDButton
            onClick={() => setVisible(!visible)}
            icon={<Icon name="findOrder" />}
          />
        </div>
        <DetailTicketForm />
      </div>
      {isMobile ? (
        <DrawerShopifySearch
          visible={visible}
          onClose={() => setVisible(false)}
        />
      ) : (
        <div className={visible ? "" : "d-none"}>
          <ContentShopifySearch />
        </div>
      )}
    </section>
  );
};

export default DetailTicket;
