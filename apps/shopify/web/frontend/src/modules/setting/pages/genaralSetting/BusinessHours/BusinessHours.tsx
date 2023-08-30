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

  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const { subDomain } = useSubdomain();
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
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
      show(t("messages:success.update_business_calendar"));

      refetchBusinessCalendar();

      refetchGlobal();
    },

    onError: () => {
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
    setLoading(true);
    update.mutate(data);
  }, []);

  // handle Effect
  // useMount(() => fetchListBusinessCalendar());
  useEffect(() => {
    // console.log("change value", formRef.current?.values);
    setDataBusinessHoursAutoReplyCode(
      formRef.current?.values?.businessHoursAutoReplyCode
    );
  }, [formRef.current?.values?.businessHoursAutoReplyCode]);

  const handleSave = () => {
    formRef.current?.submitForm();
  };
  return (
    <>
      {formRef.current?.dirty && !loading && (
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
            <Layout.Section>
              <Form
                initialValues={dataBusinessCalendar || {}}
                ref={formRef}
                onSubmit={handleSubmit}
                onValuesChange={handleChangeValues}
                enableReinitialize
              >
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
                            <FormItem name="autoReply">
                              <AutoReplyTab
                                handleSave={handleSave}
                                dataHolidays={dataHolidays}
                                dataBusinessHoursAutoReplyCode={
                                  dataBusinessHoursAutoReplyCode
                                }
                              />
                            </FormItem>
                          </div>
                          <div
                            className={selected === 2 ? undefined : "hidden"}
                          >
                            <FormItem name="holidays">
                              <HolidayTab
                                handleSave={handleSave}
                                dataAutoReply={dataAutoReply}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </Tabs>
                      <div
                        className={!disabled && selected === 0 ? "" : "hidden"}
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
                              <span
                                style={{ fontSize: 13 }}
                                className="text-gray-400"
                              >
                                Choose your auto-reply outside of business
                                hours. You can set up new message in the{" "}
                                <span
                                  onClick={() => {
                                    setSelected(1);
                                  }}
                                  className="cursor-pointer hover:underline text-blue-500 opacity-1"
                                >
                                  Auto-Reply
                                </span>{" "}
                                Tab
                              </span>
                            </div>
                          </div>
                        </LegacyCard.Section>
                      </div>
                    </LegacyCard>
                  </Layout.Section>
                </Layout>
              </Form>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </>
  );
};

export default BusinessHours;
