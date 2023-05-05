import {
  generatePath,
  useJob,
  useMount,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import {
  EmailIntegration,
  EmailIntegrationRepository,
  Priority,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Layout, LegacyCard, Page } from "@shopify/polaris";
import { CircleLeftMajor, CircleRightMajor } from "@shopify/polaris-icons";
import classNames from "classnames";
import { FormikProps } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Banner } from "src/components/Banner";
import { useBanner } from "src/hooks/useBanner";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import styles from "./style.module.scss";
interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const { toggle: updateForm } = useToggle();
  const { show } = useToast();
  const { visible, setVisible } = useToggleGlobal();
  const { dataSaved, setDataSaved }: any = useSaveDataGlobal();

  const formRef = useRef<FormikProps<any>>(null);
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();
  const initialValuesForm = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      from: primaryEmail?._id,
      content: "",
      to: "",
      subject: "",
    };
  }, [primaryEmail?._id]);
  const { run: getPrimaryEmail } = useJob(() => {
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

  useMount(() => {
    updateForm();
  });
  useUnMount(() => {
    setVisible(false);
    setDataSaved(undefined);
  });
  useEffect(() => {
    getPrimaryEmail();
  }, []);
  const handleOpenDrawerSearch = () => {
    setVisible(true);
  };
  const handleCloseDrawerSearch = () => {
    setVisible(false);
  };
  const _renderButtonToggle = () => {
    return !visible ? (
      <CircleLeftMajor
        className={classNames(styles.toggleButton, styles.toggleButtonOpen)}
        onClick={handleOpenDrawerSearch}
      />
    ) : (
      <CircleRightMajor
        className={classNames(styles.toggleButton, styles.toggleButtonClose)}
        onClick={handleCloseDrawerSearch}
      />
    );
  };
  return (
    <>
      <Page
        breadcrumbs={[
          { content: "Ticket", url: generatePath(TicketRoutePaths.Index) },
        ]}
        title="New Ticket"
        fullWidth
      >
        <Layout>
          {banner.visible && (
            <Layout.Section>
              <Banner banner={banner} onDismiss={closeBanner}></Banner>
            </Layout.Section>
          )}

          <Layout.Section>
            <LegacyCard sectioned>
              <div className={visible ? "d-flex" : ""}>
                <div className={visible ? styles.wrapContent : ""}>
                  <div className={styles.wrapSearchToggle}>
                    {_renderButtonToggle()}
                  </div>
                  <TicketForm
                    innerRef={formRef}
                    initialValues={initialValuesForm}
                    enableReinitialize
                    onValuesChange={updateForm}
                    primaryEmail={primaryEmail}
                  />
                </div>
                <div className={visible ? styles.wrapSearch : "d-none"}>
                  <ContentShopifySearch />
                </div>
              </div>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default CreateTicket;
