import { useToggle } from "@moose-desk/core";
import {
  AutoReply,
  BusinessCalendar,
  BusinessHoursType,
  GetListBusinessCalendarResponse,
  Holidays,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  ContextualSaveBar,
  Layout,
  LegacyCard,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Tabs,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import AutoReplyTab from "src/modules/setting/component/AutoReply/AutoReplyTab";
import BoxSelectAutoReply from "src/modules/setting/component/BusinessHours/BoxSelectAutoReply";
import BusinessHoursTab from "src/modules/setting/component/BusinessHours/BusinessHoursTab";
import HolidayTab from "src/modules/setting/component/Holidays/HolidayTab";
import SelectTimeZone from "src/modules/setting/component/SelectTimeZone/SelectTimeZone";
import { tabs } from "src/modules/setting/constaint/constaint";
import {
  getListBusinessCalendar,
  updateListBusinessCalendar,
} from "src/modules/setting/helper/api";
import "./BusinessHours.scss";
interface BusinessHoursProps {}

const BusinessHours = (props: BusinessHoursProps) => {
  // banner
  const [banner, setBanner] = useState<{
    isShow: boolean;
    message: string;
    type: BannerStatus;
  }>({
    isShow: false,
    message: "",
    type: "success",
  });
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const { subDomain } = useSubdomain();

  const { refetchGlobal } = useGlobalData(false, subDomain || ""); // main code

  const {
    data,
    refetch: refetchBusinessCalendar,
    isLoading: processing,
  } = useQuery({
    queryKey: ["getListBusinessCalendar"],
    queryFn: () => getListBusinessCalendar(),
    retry: 3,

    onSuccess: (data: GetListBusinessCalendarResponse) => {
      setDataBusinessCalendar({ ...data.data[0] });
      setDataAutoReply([...data.data[0].autoReply]);
      setDataHolidays([...data.data[0].holidays]);
      setDataBusinessHoursAutoReplyCode(
        data.data[0].businessHoursAutoReplyCode
      );
    },
    onError: () => {
      show(t("messages:error.something_went_wrong"), {
        isError: true,
      });
    },
  });

  const update = useMutation({
    mutationFn: (payload) => updateListBusinessCalendar(payload),
    onSuccess: () => {
      refetchBusinessCalendar();
      setBanner({
        isShow: true,
        message: t("messages:success.update_business_calendar"),
        type: "success",
      });
      refetchGlobal();
      show(t("messages:success.update_business_calendar"));
    },

    onError: () => {
      setBanner({
        isShow: true,
        type: "critical",
        message: t("messages:success.update_business_calendar"),
      });
      show(t("messages:success.update_business_calendar"), {
        isError: true,
      });
    },
  });

  const [dataBusinessCalendar, setDataBusinessCalendar] = useState<
    BusinessCalendar | undefined
  >(data ? { ...data.data[0] } : undefined);
  const { toggle: updateForm } = useToggle();
  const [dataAutoReply, setDataAutoReply] = useState<AutoReply[]>(
    data ? [...data.data[0].autoReply] : []
  );
  const [dataHolidays, setDataHolidays] = useState<Holidays[]>(
    data ? [...data.data[0].holidays] : []
  );
  const [dataBusinessHoursAutoReplyCode, setDataBusinessHoursAutoReplyCode] =
    useState(data ? data.data[0].businessHoursAutoReplyCode : "");
  const [selected, setSelected] = useState(0);
  const formRef = useRef<FormikProps<any>>(null);
  const [disabled, setDisabled] = useState(false);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  // handle Data in tabs
  const handleChangeValues = useCallback((value) => {
    updateForm();
    if (value.businessHoursType) {
      switch (value.businessHoursType) {
        case BusinessHoursType.Full:
          setDisabled(true);
          break;
        case BusinessHoursType.Custom:
          setDisabled(false);
          break;
        default:
          break;
      }
    }
    if (value.autoReply) {
      setDataAutoReply([...value.autoReply]);
    }
    if (value.holidays) {
      setDataHolidays([...value.holidays]);
    }
  }, []);
  useEffect(() => {
    dataBusinessCalendar?.businessHoursType === BusinessHoursType.Full
      ? setDisabled(true)
      : setDisabled(false);
  }, [dataBusinessCalendar]);

  const handleSubmit = useCallback((data: any) => {
    // updateBusinessCalendar(data);
    update.mutate(data);
  }, []);

  // handle Effect
  // useMount(() => fetchListBusinessCalendar());
  return (
    <>
      {formRef.current?.dirty && (
        <ContextualSaveBar
          fullWidth
          message={"Unsaved changes"}
          saveAction={{
            onAction: () => formRef.current?.submitForm(),
            disabled: !formRef.current?.dirty,
            loading: update.isLoading,
          }}
          discardAction={{
            onAction: () => formRef.current?.resetForm(),
          }}
        />
      )}
      {processing ? (
        <Page fullWidth>
          <SkeletonPage />
          <Layout>
            <Layout.Section>
              <LegacyCard sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="extraLarge" />
                  <SkeletonBodyText />
                </TextContainer>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      ) : (
        <Page title="Business Hours" fullWidth>
          <Layout>
            {banner.isShow ? (
              <Layout.Section>
                <Banner
                  title={undefined}
                  status={banner.type}
                  onDismiss={() => setBanner({ ...banner, isShow: false })}
                >
                  {banner.message}
                </Banner>
              </Layout.Section>
            ) : null}
            <Layout.Section>
              <Form
                initialValues={dataBusinessCalendar || {}}
                ref={formRef}
                onSubmit={handleSubmit}
                onValuesChange={handleChangeValues}
                enableReinitialize
              >
                <LegacyCard sectioned>
                  <Layout>
                    <Layout.Section>
                      <div className="flex items-center content-between">
                        <Text as="span" variant="bodyMd">
                          Time zone:
                        </Text>
                        <div className="w-3/6 ml-4">
                          <FormItem name="timezone">
                            <SelectTimeZone />
                          </FormItem>
                        </div>
                      </div>
                    </Layout.Section>
                    <Layout.Section>
                      <LegacyCard>
                        <Tabs
                          tabs={tabs}
                          selected={selected}
                          onSelect={handleTabChange}
                        >
                          <div className="tabs">
                            {selected === 0 ? (
                              <BusinessHoursTab disabled={disabled} />
                            ) : null}
                            <div
                              className={selected === 1 ? undefined : "hidden"}
                            >
                              <FormItem name="holidays">
                                <HolidayTab dataAutoReply={dataAutoReply} />
                              </FormItem>
                            </div>
                            <div
                              className={selected === 2 ? undefined : "hidden"}
                            >
                              <FormItem name="autoReply">
                                <AutoReplyTab
                                  dataHolidays={dataHolidays}
                                  dataBusinessHoursAutoReplyCode={
                                    dataBusinessHoursAutoReplyCode
                                  }
                                />
                              </FormItem>
                            </div>
                          </div>
                        </Tabs>
                        <div
                          className={
                            !disabled && selected === 0 ? "" : "hidden"
                          }
                        >
                          <LegacyCard.Section>
                            <div className="flex items-start content-between">
                              <div className="mr-4 w-[100px] mt-2">
                                <Text as="span" variant="bodyMd">
                                  Auto-Reply
                                </Text>
                              </div>
                              <div className="w-full">
                                <FormItem name="businessHoursAutoReplyCode">
                                  <BoxSelectAutoReply
                                    placeholder=""
                                    dataAutoReply={dataAutoReply}
                                  />
                                </FormItem>
                                <span>
                                  Choose your auto-reply outside of business
                                  hours. You can set up new message in the
                                  “Auto-Reply” Tab
                                </span>
                              </div>
                            </div>
                          </LegacyCard.Section>
                        </div>
                      </LegacyCard>
                    </Layout.Section>
                  </Layout>
                </LegacyCard>
              </Form>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </>
  );
};

export default BusinessHours;
