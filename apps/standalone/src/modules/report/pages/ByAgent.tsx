import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { DatePicker } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import Icon from "src/components/UI/Icon";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import useViewport from "src/hooks/useViewport";
import { getReportTopFive } from "src/modules/report/api/api";
import ChartAgentsTicket from "src/modules/report/components/ChartAgentsTicket/ChartAgentsTicket";
import { ReportAgentTable } from "src/modules/report/components/ReportAgentTable";
import {
  convertTimeStamp,
  getTimeFilterDefault,
  getTwoWeeksAfter,
  getTwoWeeksBefore,
} from "src/modules/report/helper/convert";
import styles from "./styles.module.scss";

const ByAgentPage = () => {
  const [form] = Form.useForm();
  const { subDomain } = useSubdomain();
  const { isMobile } = useViewport();
  const { timezone } = useGlobalData(false, subDomain || "");
  const { isAgent } = usePermission();
  const { current, twoWeekAgo } = getTimeFilterDefault();

  const [filter, setFilter] = useState({
    startTime: "",
    endTime: "",
  });
  useEffect(() => {
    if (!timezone) return;
    form.setFieldsValue({
      to: current?.tz(timezone),
      from: twoWeekAgo?.tz(timezone),
    });
    setFilter({
      startTime: String(twoWeekAgo?.tz(timezone).startOf("day").unix()),
      endTime: String(current?.tz(timezone).endOf("day").unix()),
    });
  }, [timezone]);
  const { data: reportTopFiveData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.REPORT_TOP_FIVE, filter],
    queryFn: () => getReportTopFive(filter),
    keepPreviousData: true,
    enabled: !isAgent && !!filter.startTime && !!filter.endTime,
  });
  const memoChartData = useMemo(() => {
    const convertData = (reportTopFiveData as any)?.data?.data;
    return convertData;
  }, [reportTopFiveData]);
  const disabledStartDate = useCallback(
    (current) => {
      return form.getFieldValue("to")
        ? current > form.getFieldValue("to") ||
            current < getTwoWeeksBefore(form.getFieldValue("to"))
        : false;
    },
    [form.getFieldValue("to")]
  );

  const disabledEndDate = useCallback(
    (current) => {
      return form.getFieldValue("from")
        ? current < form.getFieldValue("from") ||
            current > getTwoWeeksAfter(form.getFieldValue("from"))
        : false;
    },
    [form.getFieldValue("from")]
  );
  const handleChangeStartTime = (date: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      startTime: values
        ? String(convertTimeStamp(date, timezone, "start"))
        : "",
    }));
  };
  const handleChangeEndTime = (date: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      endTime: values ? String(convertTimeStamp(date, timezone, "end")) : "",
    }));
  };
  return (
    <>
      <Header title="Report By Agents" />
      <div className={styles.dateWrap}>
        <Form form={form}>
          <div className={styles.groupDatePicker}>
            <span>From:</span>
            <Form.Item name="from" label="">
              <DatePicker
                format={"MM/DD/YYYY"}
                disabledDate={disabledStartDate}
                onChange={handleChangeStartTime}
                suffixIcon={<Icon name="calendar" />}
                size={isMobile ? "middle" : "large"}
                // defaultValue={twoWeekAgo}
              />
            </Form.Item>
          </div>
          <div className={styles.groupDatePicker}>
            <span>To:</span>
            <Form.Item name="to" label="">
              <DatePicker
                format={"MM/DD/YYYY"}
                disabledDate={disabledEndDate}
                onChange={handleChangeEndTime}
                suffixIcon={<Icon name="calendar" />}
                size={isMobile ? "middle" : "large"}
                // defaultValue={current}
              />
            </Form.Item>
          </div>
        </Form>
      </div>

      <div className={styles.wrapChart}>
        <div className={styles.title}>
          Ticket closed per agent per day (Top 5 Agents)
        </div>
        <div className="w-full h-[450px]">
          {isLoading ? (
            <MDSkeleton lines={10} />
          ) : (
            <ChartAgentsTicket data={memoChartData} />
          )}
        </div>
      </div>

      <div className={styles.wrapChart}>
        {isLoading ? (
          <div className="p-6">
            <MDSkeleton lines={3} />
          </div>
        ) : (
          <ReportAgentTable rangeTime={filter} />
        )}
      </div>
    </>
  );
};

export default ByAgentPage;
