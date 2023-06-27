import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import { Priority } from "@moose-desk/repo";
import { Skeleton } from "antd";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Header } from "src/components/UI/Header";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import {
  emailIntegrationApi,
  getListEmailIntegration,
} from "src/modules/ticket/helper/api";
import styles from "./styles.module.scss";

const CreateTicket = () => {
  const { visible, setVisible } = useToggleGlobal();
  const { data: dataPrimaryEmail, isLoading: processing } = useQuery({
    queryKey: ["emailIntegrationApi"],
    queryFn: () => emailIntegrationApi(),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      // message.error(t("messages:error.get_customer"));
    },
  });
  const { data: dataEmailIntegration, isLoading: loadingList } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      //  message.error(t("messages:error.get_customer"));
    },
  });

  const primaryEmail = useMemo(() => {
    if (dataPrimaryEmail?._id) {
      return dataPrimaryEmail;
    }
    if (!dataEmailIntegration) {
      return undefined;
    }
    return dataEmailIntegration?.length > 0
      ? dataEmailIntegration[0]
      : undefined;
  }, [dataPrimaryEmail, dataEmailIntegration]);

  const initialValues = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      from: primaryEmail?._id,
      content: "",
      to: "",
    };
  }, [primaryEmail?._id]);

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
        className={classNames(styles.toggleButton, styles.toggleButtonOpen)}
        onClick={handleOpenDrawerSearch}
      />
    ) : (
      <RightCircleOutlined
        className={classNames(styles.toggleButton, styles.toggleButtonClose)}
        onClick={handleCloseDrawerSearch}
      />
    );
  };
  return (
    <section className={classNames(styles.container, { "d-flex": visible })}>
      <div className={styles.wrapContent}>
        <div className={styles.wrapSearchToggle}>{_renderButtonToggle()}</div>
        <Header title="New Ticket" back></Header>

        {processing || loadingList ? (
          <>
            <Skeleton className="mt-5" />
          </>
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
