import {
  generatePath,
  MediaScreen,
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
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { useBanner } from "src/hooks/useBanner";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import useScreenType from "src/hooks/useScreenType";
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
  // usePreventNav(MediaScreen.XL);
  const [screenType, screenWidth] = useScreenType();
  const isMobileOrTablet = Boolean(screenWidth <= MediaScreen.LG);
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
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const { run: getListEmailApi, processing: loadingList } = useJob(
    (payload: any) => {
      return EmailIntegrationRepository()
        .getListEmail(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setPrimaryEmail(data.data[0]);
            }
          }),
          catchError((err) => {
            show(t("messages:error.something_went_wrong"), { isError: true });
            return of(err);
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
          show(t("messages:error.something_went_wrong"), { isError: true });

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
      ) : isMobileOrTablet && visible ? (
        <ContentShopifySearch />
      ) : (
        <Page
          breadcrumbs={[
            { content: "Ticket", url: generatePath(TicketRoutePaths.Index) },
          ]}
          title={(<span>New Ticket</span>) as unknown as string}
          fullWidth
        >
          <Layout>
            <Layout.Section>
              <div className={visible ? "d-flex gap-5" : ""}>
                <LegacyCard sectioned>
                  <div className={""}>
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
                </LegacyCard>
                <div className={visible ? styles.wrapSearch : "d-none"}>
                  <ContentShopifySearch />
                </div>
              </div>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </>
  );
};

export default CreateTicket;
