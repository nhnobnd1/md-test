import { MediaScreen } from "@moose-desk/core";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import classNames from "classnames";
import { useEffect } from "react";
import useViewport from "src/hooks/useViewport";
import DetailTicketFormBeta from "src/modules/ticket/components/DetailTicketForm/DetailTicketFormBeta";
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
        className={classNames(
          styles.wrapContent,
          {
            [styles.maxWidthContent]: visible && !isMobile,
          },
          "flex-1"
        )}
      >
        <DetailTicketFormBeta />
      </div>
      {/* {isMobile ? (
        <DrawerShopifySearch
          visible={visible}
          onClose={() => setVisible(false)}
        />
      ) : (
        <div className={visible ? "" : "d-none"}>
          <ContentShopifySearch />
        </div>
      )} */}
    </section>
  );
};

export default DetailTicket;
