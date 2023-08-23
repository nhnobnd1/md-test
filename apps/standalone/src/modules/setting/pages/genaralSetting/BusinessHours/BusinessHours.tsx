import { useMount, useRole } from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  AutoReply,
  BusinessCalendar,
  BusinessHoursType,
  GetListBusinessCalendarResponse,
  Holidays,
} from "@moose-desk/repo";
import { Card, Input, Tabs } from "antd";
import { isEqual, keys, pick } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import timeZoneList from "src/constaint/timeZone";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useSubdomain } from "src/hooks/useSubdomain";
import { Role } from "src/models/Rule";
import AutoReplyTab from "src/modules/setting/component/AutoReply/AutoReplyTab";
import BusinessHoursTab from "src/modules/setting/component/BusinessHours/BusinessHoursTab";
import HolidayTab from "src/modules/setting/component/Holidays/HolidayTab";
import SelectTimeZone from "src/modules/setting/component/SelectTimeZone/SelectTimeZone";
import {
  getListBusinessCalendar,
  updateListBusinessCalendar,
} from "src/modules/setting/helper/api";
import useBusinessHour from "src/modules/setting/store/Businesshour";

const BusinessHours = () => {
  const message = useMessage();
  const notification = useNotification();
  const tabSelected = useBusinessHour((state) => state.tabSelected);
  const updateTabSelected = useBusinessHour((state) => state.updateTabSelected);
  const updateFormDirty = useBusinessHour((state) => state.updateFormDirty);
  const formChanged = useBusinessHour((state) => state.formChanged);
  const isReset = useBusinessHour((state) => state.isReset);
  const isSubmit = useBusinessHour((state) => state.isSubmit);
  const { subDomain } = useSubdomain();
  const { refetchGlobal } = useGlobalData(false, subDomain || "");
  // main code
  const {
    data,
    refetch: refetchBusinessCalendar,
    isLoading: processing,
    isSuccess,
  } = useQuery({
    queryKey: ["getListBusinessCalendar"],
    queryFn: () => getListBusinessCalendar(),
    retry: 3,
    enabled: false,
    onSuccess: (data: GetListBusinessCalendarResponse) => {
      setDataBusinessCalendar({ ...data.data[0] });
      setDataAutoReply([...data.data[0].autoReply]);
      setDataHolidays([...data.data[0].holidays]);
      setDataBusinessHoursAutoReplyCode(
        data.data[0].businessHoursAutoReplyCode
      );
    },
    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
  });
  const update = useMutation({
    mutationFn: (payload) => updateListBusinessCalendar(payload),
    onSuccess: () => {
      updateFormDirty(false);
      message.loading.hide();
      refetchBusinessCalendar();
      notification.success(t("messages:success.update_business_calendar"));
      refetchGlobal();
    },

    onError: () => {
      message.loading.hide();
      notification.error(t("messages:error.update_business_calendar"), {
        description: "Update failed!",
        style: {
          width: 450,
        },
      });
    },
  });
  const [dataBusinessCalendar, setDataBusinessCalendar] = useState<
    BusinessCalendar | undefined
  >(data ? { ...data.data[0] } : undefined);
  const [dataAutoReply, setDataAutoReply] = useState<AutoReply[]>(
    data ? [...data.data[0].autoReply] : []
  );
  const [dataHolidays, setDataHolidays] = useState<Holidays[]>(
    data ? [...data.data[0].holidays] : []
  );
  const [dataBusinessHoursAutoReplyCode, setDataBusinessHoursAutoReplyCode] =
    useState(data ? data.data[0].businessHoursAutoReplyCode : "");
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const role = useRole();

  const handleChangeValues = useCallback(
    (value) => {
      if (isSuccess) {
        updateFormDirty(
          !isEqual(pick(dataBusinessCalendar, keys(value)), value)
        );
      }
      if (value.autoReply) {
        setDataAutoReply([...value.autoReply]);
      }
      if (value.holidays) {
        setDataHolidays([...value.holidays]);
      }
    },
    [dataBusinessCalendar, isSuccess, tabSelected]
  );

  const disabled = useMemo(() => {
    return form.getFieldValue("businessHoursType") === BusinessHoursType.Full;
  }, [form.getFieldValue("businessHoursType"), formChanged]);

  const handleSubmit = useCallback((data: any) => {
    const revertTimeZome = timeZoneList.timeZone.find(
      (item) => item.description === data.timezone
    );
    data.timezone = revertTimeZome?.olsonName;
    message.loading.show(t("messages:loading.updating_business_calendar"));

    update.mutate(data);
  }, []);
  // UI Tabs
  // handle Effect
  useMount(() => {
    // eslint-disable-next-line no-unused-expressions
    role === Role.Admin ? refetchBusinessCalendar() : "";
  });

  useEffect(() => {
    setDataBusinessHoursAutoReplyCode(
      form.getFieldsValue()?.businessHoursAutoReplyCode
    );
  }, [form.getFieldsValue()?.businessHoursAutoReplyCode]);

  const handleSave = () => form.submit();
  useEffect(() => {
    if (isReset) {
      form.resetFields();
    }
  }, [isReset]);
  useEffect(() => {
    if (isSubmit) {
      form.submit();
    }
    return () => {
      updateFormDirty(false);
    };
  }, [isSubmit]);
  return (
    <>
      <Header
        className="xs:h-[32px] md:h-[40px] flex items-center mb-5 "
        title="Business Hours"
      ></Header>
      {processing ? (
        <>
          <MDSkeleton lines={10} />
        </>
      ) : (
        <>
          <Form
            initialValues={dataBusinessCalendar || {}}
            form={form}
            enableReinitialize
            onFinish={handleSubmit}
            onValuesChange={handleChangeValues}
          >
            <Form.Item
              name="timezone"
              label={
                <div className="flex xs:h-[32px] md:h-[40px] items-center">
                  Time zone
                </div>
              }
            >
              <SelectTimeZone />
            </Form.Item>
            <Card>
              <Tabs
                activeKey={tabSelected}
                onChange={(e) => {
                  updateTabSelected(e);
                }}
                items={[
                  {
                    key: "1",
                    label: `Business Hours`,
                    children: (
                      <BusinessHoursTab
                        dataAutoReply={dataAutoReply}
                        disabled={disabled}
                      />
                    ),
                  },
                  {
                    key: "2",
                    label: `Holidays`,
                    children: (
                      <Form.Item name="holidays">
                        <HolidayTab
                          handleSave={handleSave}
                          dataAutoReply={dataAutoReply}
                          loading={processing}
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    key: "3",
                    label: `Auto-reply`,
                    children: (
                      <Form.Item name="autoReply">
                        <AutoReplyTab
                          handleSave={handleSave}
                          loading={processing}
                          dataHolidays={dataHolidays}
                          dataBusinessHoursAutoReplyCode={
                            dataBusinessHoursAutoReplyCode
                          }
                        />
                      </Form.Item>
                    ),
                  },
                ]}
              />
            </Card>
            <Form.Item name="_id" hidden>
              <Input placeholder="" />
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default BusinessHours;
