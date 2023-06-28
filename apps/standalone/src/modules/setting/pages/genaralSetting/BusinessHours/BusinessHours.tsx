import { useMount, useRole, useToggle } from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  AutoReply,
  BusinessCalendar,
  BusinessHoursType,
  GetListBusinessCalendarResponse,
  Holidays,
} from "@moose-desk/repo";
import { Card, Input, Skeleton, Space, Tabs } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
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

const BusinessHours = () => {
  const message = useMessage();
  const notification = useNotification();
  const { subDomain } = useSubdomain();
  const { refetchGlobal } = useGlobalData(false, subDomain || "");
  // main code
  const {
    data,
    refetch: refetchBusinessCalendar,
    isLoading: processing,
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
  const { toggle: updateForm } = useToggle();
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

  const handleChangeValues = useCallback((value) => {
    updateForm();
    if (value.autoReply) {
      setDataAutoReply([...value.autoReply]);
    }
    if (value.holidays) {
      setDataHolidays([...value.holidays]);
    }
  }, []);

  const disabled = useMemo(() => {
    return form.getFieldValue("businessHoursType") === BusinessHoursType.Full;
  }, [form.getFieldValue("businessHoursType")]);

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
  return (
    <>
      <Header
        className="xs:h-[32px] md:h-[40px] flex items-center"
        title="Business Hours"
      ></Header>
      {processing ? (
        <>
          <Skeleton />
        </>
      ) : (
        <>
          <Form
            initialValues={dataBusinessCalendar || {}}
            form={form}
            enableReinitialize
            onFinish={handleSubmit}
            onValuesChange={handleChangeValues}
            className="mt-5"
          >
            <Form.Item name="timezone" label="Time zone">
              <SelectTimeZone />
            </Form.Item>
            <Card>
              <Tabs
                defaultActiveKey="1"
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
                        <HolidayTab dataAutoReply={dataAutoReply} />
                      </Form.Item>
                    ),
                  },
                  {
                    key: "3",
                    label: `Auto-reply`,
                    children: (
                      <Form.Item name="autoReply">
                        <AutoReplyTab
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
          <div className="flex-1 text-right mt-4">
            <Space>
              <MDButton onClick={() => form.resetFields()}>Cancel</MDButton>
              <MDButton type="primary" onClick={() => form.submit()}>
                Save
              </MDButton>
            </Space>
          </div>
        </>
      )}
    </>
  );
};

export default BusinessHours;
