import { MediaScreen } from "@moose-desk/core";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import { Priority } from "@moose-desk/repo";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import Icon from "src/components/UI/Icon";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useViewport from "src/hooks/useViewport";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import DrawerShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/DrawerShopifySearch";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import {
  emailIntegrationApi,
  getListEmailIntegration,
} from "src/modules/ticket/helper/api";
import styles from "./styles.module.scss";

const CreateTicket = () => {
  const { isMobile } = useViewport(MediaScreen.LG);
  const { visible, setVisible } = useToggleGlobal();
  // const stateCreate = useFormCreateTicket((state) => state);

  const { data: dataPrimaryEmail, isLoading: processing } = useQuery({
    queryKey: ["emailIntegrationApi"],
    queryFn: () => emailIntegrationApi(),
    retry: 3,
    staleTime: 10000,
    onError: () => {},
  });
  const { data: dataEmailIntegration, isLoading: loadingList } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {},
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
      content: primaryEmail?.signature
        ? `<div class='signature'> <br/> <br/> <br/> ${primaryEmail?.signature}</div>`
        : "",
      to: "",
      tags: [],
      subject: "",
      assignee: "",
      signature: primaryEmail?.signature,
      from: primaryEmail?._id,
    };
  }, [primaryEmail]);

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);
  return (
    <section
      className={classNames(styles.container, {
        "d-flex": visible && !isMobile,
      })}
    >
      <div className={styles.wrapContent}>
        <div className={styles.wrapSearchToggle}>
          <MDButton
            onClick={() => setVisible(!visible)}
            icon={<Icon name="findOrder" />}
          />
        </div>
        <Header title="New Ticket" back className="mb-5"></Header>

        {processing || loadingList ? (
          <>
            <MDSkeleton lines={10} />
          </>
        ) : (
          <TicketForm
            primaryEmail={primaryEmail}
            initialValues={initialValues}
          />
        )}
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

export default CreateTicket;
