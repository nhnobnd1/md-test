import {
  MediaScreen,
  useMount,
  useNavigate,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import { Priority } from "@moose-desk/repo";
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
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import useScreenType from "src/hooks/useScreenType";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import { getListEmailIntegration } from "src/modules/ticket/helper/api";
import styles from "./style.module.scss";
interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const { toggle: updateForm } = useToggle();
  const { visible, setVisible } = useToggleGlobal();
  const { dataSaved, setDataSaved }: any = useSaveDataGlobal();
  const [screenType, screenWidth] = useScreenType();
  const isMobileOrTablet = Boolean(screenWidth <= MediaScreen.LG);
  const formRef = useRef<FormikProps<any>>(null);
  // const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();

  const { data: dataEmailIntegration, isLoading: loadingList } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500, isLive: 1 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      show(t("messages:error.something_went_wrong"), { isError: true });
    },
  });
  const navigate = useNavigate();

  const primaryEmail = useMemo(() => {
    if (!dataEmailIntegration) {
      return undefined;
    }
    return dataEmailIntegration?.length > 0
      ? dataEmailIntegration[0]
      : undefined;
  }, [dataEmailIntegration]);

  const initialValuesForm = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      content: primaryEmail?.signature
        ? `<br/> <div class='divide'> - - - - - - - </div><div class='signature'>${primaryEmail?.signature}</div>`
        : "",
      to: "",
      tags: [],
      subject: "",
      assignee: "",
      signature: primaryEmail?.signature,
      from: primaryEmail?._id,
    };
  }, [primaryEmail?._id]);
  const { show } = useToast();
  const { t } = useTranslation();

  useMount(() => {
    updateForm();
  });
  useUnMount(() => {
    setVisible(false);
    setDataSaved(undefined);
  });

  const handleToggleSearch = () => {
    setVisible(!visible);
  };

  return (
    <>
      {loadingList ? (
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
            {
              content: "Ticket",
              // url: generatePath(TicketRoutePaths.Index),
              onAction: () => {
                navigate(-1);
              },
            },
          ]}
          title={(<span>New Ticket</span>) as unknown as string}
          fullWidth
        >
          <div className="form-ticket">
            <div className="bg-white p-4 h-full rounded-lg">
              <div className={styles.wrapSearchToggle}>
                <Button icon={PriceLookupMinor} onClick={handleToggleSearch} />
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
        </Page>
      )}
    </>
  );
};

export default CreateTicket;
