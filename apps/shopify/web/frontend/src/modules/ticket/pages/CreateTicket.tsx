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
import {
  Button,
  Layout,
  LegacyCard,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from "@shopify/polaris";
import { PriceLookupMinor } from "@shopify/polaris-icons";
import { FormikProps } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { catchError, map, of } from "rxjs";
import { Banner } from "src/components/Banner";
import { useBanner } from "src/hooks/useBanner";
import usePreventNav from "src/hooks/usePreventNav";
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
  const { visible, setVisible } = useToggleGlobal();
  const { dataSaved, setDataSaved }: any = useSaveDataGlobal();
  usePreventNav();

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
  const handleToggleSearch = () => {
    setVisible(!visible);
  };

  return (
    <>
      {processing || loadingList ? (
        <>
          <Page fullWidth>
            <SkeletonPage primaryAction />
            <Layout>
              <Layout.Section>
                <LegacyCard sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="extraLarge" />
                    <SkeletonBodyText />
                  </TextContainer>
                </LegacyCard>
                <LegacyCard sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="extraLarge" />
                    <SkeletonBodyText />
                  </TextContainer>
                </LegacyCard>
              </Layout.Section>
            </Layout>
          </Page>
        </>
      ) : isMobile && visible ? (
        <ContentShopifySearch />
      ) : (
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
                      <Button
                        icon={PriceLookupMinor}
                        onClick={handleToggleSearch}
                      />
                    </div>
                    {primaryEmail ? (
                      <TicketForm
                        innerRef={formRef}
                        initialValues={initialValuesForm}
                        enableReinitialize
                        onValuesChange={updateForm}
                        primaryEmail={primaryEmail}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className={visible ? styles.wrapSearch : "d-none"}>
                    <ContentShopifySearch />
                  </div>
                </div>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </>
  );
};

export default CreateTicket;
