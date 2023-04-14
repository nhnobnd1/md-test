import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import {
  EmailIntegration,
  GetOneEmailResponse,
  Priority,
} from "@moose-desk/repo";
import { Tooltip } from "antd";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Header } from "src/components/UI/Header";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import { emailIntegrationApi } from "src/modules/ticket/helper/api";
import styles from "./styles.module.scss";
interface CreateTicketProps {}

const CreateTicket = () => {
  const { visible, setVisible } = useToggleGlobal();
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();
  const initialValues = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      from: primaryEmail?._id,
      content: "",
      to: "",
    };
  }, [primaryEmail?._id]);

  const { isLoading } = useQuery({
    queryKey: ["getPrimaryEmail"],
    queryFn: () => emailIntegrationApi(),
    retry: 3,
    onSuccess: (data: GetOneEmailResponse) => {
      setPrimaryEmail(data.data);
    },
    onError: () => {},
  });

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);
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
  return (
    <section className={classNames(styles.container, { "d-flex": visible })}>
      <div className={styles.wrapContent}>
        <div className={styles.wrapSearchToggle}>
          <Tooltip title={visible ? "Close" : "Search Order Shopify"}>
            {_renderButtonToggle()}
          </Tooltip>
        </div>
        <Header className="mb-[40px]" title="New Ticket" back></Header>

        {isLoading ? (
          <></>
        ) : (
          <TicketForm
            primaryEmail={primaryEmail}
            initialValues={initialValues}
          />
        )}
      </div>
      <div className={visible ? "" : "d-none"}>
        <ContentShopifySearch />
      </div>
    </section>
  );
};

export default CreateTicket;
