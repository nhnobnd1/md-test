import { useJob, useMount, useRole, useToggle } from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  AutoReply,
  BusinessCalendar,
  BusinessHoursType,
  Holidays,
} from "@moose-desk/repo";
import BusinessCalendarRepository from "@moose-desk/repo/businessCalendar/BusinessCalendarRepository";
import { Button, Card, Space, Tabs } from "antd";
import { useCallback, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
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
interface BusinessHoursProps {}

const BusinessHours = (props: BusinessHoursProps) => {
  const message = useMessage();
  const notification = useNotification();
  const { subDomain } = useSubdomain();
  const { refetchGlobal } = useGlobalData(false, subDomain || "");
  // main code
  const [dataBusinessCalendar, setDataBusinessCalendar] =
    useState<BusinessCalendar>();
  const { toggle: updateForm } = useToggle();
  const [dataAutoReply, setDataAutoReply] = useState<AutoReply[]>([]);
  const [dataHolidays, setDataHolidays] = useState<Holidays[]>([]);
  const [dataBusinessHoursAutoReplyCode, setDataBusinessHoursAutoReplyCode] =
    useState("");
  const [selected, setSelected] = useState(0);
  const [form] = Form.useForm();
  const role = useRole();
  // const [disabled, setDisabled] = useState(false);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  // handle Data in tabs
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
            if (data.statusCode === 200) {
              setDataBusinessCalendar({ ...data.data[0] });
              setDataAutoReply([...data.data[0].autoReply]);
              setDataHolidays([...data.data[0].holidays]);
              setDataBusinessHoursAutoReplyCode(
                data.data[0].businessHoursAutoReplyCode
              );
            } else {
              message.error(
                "Get data business calendar failed! Please try again."
              );
            }
          }),
          catchError((error) => {
            notification.error(
              "Get data business calendar failed! Please try again.",
              {
                description: "Get data failed!",
                style: {
                  width: 450,
                },
              }
            );
            return of(error);
          })
        );
    },
    { showLoading: false }
  );

  // update business calendar
  const { run: updateBusinessCalendar } = useJob((dataSubmit: any) => {
    message.loading.show("Updating business calendar...");
    const { _id } = dataSubmit;
    return BusinessCalendarRepository()
      .updateBusinessCalendar(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          message.loading.hide().then(() => {
            if (data.statusCode === 200) {
              notification.success(
                "Your settings have been changed successfully."
              );
              refetchGlobal();
            } else {
              notification.error("Business hours has been updated failed.", {
                description: "Update failed!",
                style: {
                  width: 450,
                },
              });
            }
          });
        }),
        catchError((error) => {
          message.loading.hide().then(() => {
            notification.error("Business hours has been updated failed.", {
              description: "Update failed!",
              style: {
                width: 450,
              },
            });
          });
          return of(error);
        })
      );
  });

  const handleSubmit = useCallback((data: any) => {
    const revertTimeZome = timeZoneList.timeZone.find(
      (item) => item.description === data.timezone
    );
    data.timezone = revertTimeZome?.olsonName;
    updateBusinessCalendar(data);
  }, []);
  // UI Tabs
  // handle Effect
  useMount(() => {
    // eslint-disable-next-line no-unused-expressions
    role === Role.Admin ? fetchListBusinessCalendar() : "";
  });
  return (
    <>
      <Header title="Business Hours"></Header>
      <Form
        initialValues={dataBusinessCalendar || {}}
        form={form}
        enableReinitialize
        onFinish={handleSubmit}
        onValuesChange={handleChangeValues}
      >
        <Form.Item name="timezone" label="Time zone:">
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
            onChange={handleTabChange}
          />
        </Card>
        <Form.Item name="_id" hidden />
      </Form>
      <div className="flex-1 text-right mt-4">
        <Space>
          <Button onClick={() => form.resetFields()}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </Space>
      </div>
    </>
  );
};

export default BusinessHours;
