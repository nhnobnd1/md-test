import { useJob, useMount, useToggle } from "@moose-desk/core";
import {
  AutoReply,
  BusinessCalendar,
  BusinessHoursType,
} from "@moose-desk/repo";
import BusinessCalendarRepository from "@moose-desk/repo/businessCalendar/BusinessCalendarRepository";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  Button,
  ButtonGroup,
  Card,
  Layout,
  Page,
  Stack,
  Tabs,
  Text,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import AutoReplyTab from "src/modules/setting/component/AutoReply/AutoReplyTab";
import BoxSelectAutoReply from "src/modules/setting/component/BusinessHours/BoxSelectAutoReply";
import BusinessHoursTab from "src/modules/setting/component/BusinessHours/BusinessHoursTab";
import HolidayTab from "src/modules/setting/component/Holidays/HolidayTab";
import SelectTimeZone from "src/modules/setting/component/SelectTimeZone/SelectTimeZone";
import { tabs } from "src/modules/setting/constaint/constaint";
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
  // main code
  const [dataBusinessCalendar, setDataBusinessCalendar] =
    useState<BusinessCalendar>();
  const { toggle: updateForm } = useToggle();
  const [dataAutoReply, setDataAutoReply] = useState<AutoReply[]>([]);
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
  }, []);
  // fetch business calendar
  const { run: fetchListBusinessCalendar } = useJob(
    () => {
      return BusinessCalendarRepository()
        .getListBusinessCalendar({
          page: 1,
          limit: 10,
        })
        .pipe(
          map(({ data }) => {
            setDataBusinessCalendar({ ...data.data[0] });
            setDataAutoReply([...data.data[0].autoReply]);
          })
        );
    },
    { showLoading: false }
  );

  // update business calendar
  const { run: updateBusinessCalendar } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return BusinessCalendarRepository()
      .updateBusinessCalendar(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setBanner({
              isShow: true,
              message: "Business hours has been updated succcesfully.",
              type: "success",
            });
            show("Business hours has been updated succcesfully.");
          } else {
            setBanner({
              isShow: true,
              type: "critical",
              message: "Business hours has been updated failed.",
            });
            show("Business hours has been updated failed.", {
              isError: true,
            });
          }
        }),
        catchError((error) => {
          setBanner({
            isShow: true,
            type: "critical",
            message: `Business hours has been updated failed.`,
          });
          show(`Business hours has been updated failed.`, {
            isError: true,
          });
          return of(error);
        })
      );
  });

  const handleSubmit = useCallback((data: any) => {
    updateBusinessCalendar(data);
  }, []);

  // handle Effect
  useMount(() => fetchListBusinessCalendar());
  return (
    <>
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
              <Card sectioned>
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
                    <Card>
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
                              <AutoReplyTab />
                            </FormItem>
                          </div>
                        </div>
                      </Tabs>
                      <div
                        className={!disabled && selected === 0 ? "" : "hidden"}
                      >
                        <Card.Section>
                          <div className="flex items-center content-between">
                            <div className="mr-4">
                              <Text as="span" variant="bodyMd">
                                Auto-Reply
                              </Text>
                            </div>
                            <FormItem name="businessHoursAutoReplyCode">
                              <BoxSelectAutoReply
                                dataAutoReply={dataAutoReply}
                              />
                            </FormItem>
                          </div>
                        </Card.Section>
                      </div>
                    </Card>
                  </Layout.Section>
                  <Layout.Section>
                    <Stack distribution="trailing">
                      <ButtonGroup>
                        <Button onClick={() => formRef.current?.resetForm()}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => formRef.current?.submitForm()}
                          primary
                        >
                          Save
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </Layout.Section>
                </Layout>
              </Card>
            </Form>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default BusinessHours;
