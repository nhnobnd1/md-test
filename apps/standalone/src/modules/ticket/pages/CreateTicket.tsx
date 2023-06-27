import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useJob } from "@moose-desk/core";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import {
  EmailIntegration,
  EmailIntegrationRepository,
  Priority,
} from "@moose-desk/repo";
import { Skeleton } from "antd";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Header } from "src/components/UI/Header";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import styles from "./styles.module.scss";

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
  const { run: getListEmailApi, processing: loadingList } = useJob(
    (payload: any) => {
      return EmailIntegrationRepository()
        .getListEmail(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setPrimaryEmail(data.data[0]);
            }
          })
        );
    }
  );
  const { run: getPrimaryEmail, processing } = useJob(() => {
    return EmailIntegrationRepository()
      .getPrimaryEmail()
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            if (Object.keys(data.data).length) {
              setPrimaryEmail(data.data);
            } else {
              getListEmailApi({ page: 1, limit: 10 });
            }
          }
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });

  useEffect(() => {
    getPrimaryEmail();
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
