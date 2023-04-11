import { LeftCircleOutlined } from "@ant-design/icons";
import { useJob, useToggle } from "@moose-desk/core";
import {
  EmailIntegration,
  EmailIntegrationRepository,
  Priority,
} from "@moose-desk/repo";
import { Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Header } from "src/components/UI/Header";
import DrawerShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/DrawerShopifySearch";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import styles from "./styles.module.scss";
interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const {
    state: visibleDrawer,
    on: openDrawer,
    off: closeDrawer,
  } = useToggle(false);
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();

  const initialValues = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      from: primaryEmail?._id,
      content: "",
      to: "",
    };
  }, [primaryEmail?._id]);

  const { run: getPrimaryEmail, processing } = useJob(() => {
    return EmailIntegrationRepository()
      .getPrimaryEmail()
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setPrimaryEmail(data.data);
          }
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });

  useEffect(() => {
    getPrimaryEmail();
  }, []);
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
      <Header className="mb-[40px]" title="New Ticket" back></Header>

      {processing ? (
        <></>
      ) : (
        <TicketForm primaryEmail={primaryEmail} initialValues={initialValues} />
      )}
      <DrawerShopifySearch
        visible={visibleDrawer}
        onClose={handleCloseDrawerSearch}
      />
    </div>
  );
};

export default CreateTicket;
