import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Card, Page } from "@shopify/polaris";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getReportTopFive } from "src/modules/report/api/api";
import ChartAgentsTicket from "src/modules/report/components/ChartAgentsTicket/ChartAgentsTicket";
import { ReportAgentTable } from "src/modules/report/components/ReportAgentTable";
import {
  getTimeFilterDefault,
  getTwoWeeksAfter,
  getTwoWeeksBefore,
} from "src/modules/report/helper/convert";
import styles from "./styles.module.scss";

interface ByAgentPageProps {}
enum DataAgent {
  TOP_FIVE = 0,
  LIST_AGENT = 1,
}
interface ITableFilter {
  startTime: string;
  endTime: string;
}
const ByAgentPage = (props: ByAgentPageProps) => {
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");
  const { current, twoWeekAgo } = getTimeFilterDefault();

  const [filterData, setFilterData] = useState<ITableFilter>({
    startTime: "",
    endTime: "",
  });
  const [timeDisable, setTimeDisable] = useState({
    start: dayjs().subtract(2, "weeks").startOf("day"),
    end: dayjs().endOf("day"),
  });
  useEffect(() => {
    if (!timezone) return;
    setFilterData({
      startTime: String(
        dayjs().tz(timezone).subtract(2, "weeks").startOf("day").unix()
      ),
      endTime: String(dayjs().tz(timezone).endOf("day").unix()),
    });
  }, [timezone]);
  const { data: reportTopFiveData } = useQuery({
    queryKey: [QUERY_KEY.REPORT_TOP_FIVE, filterData],
    queryFn: () => getReportTopFive(filterData),
    keepPreviousData: true,
    enabled: !!filterData.startTime && !!filterData.endTime,
  });
  const memoChartData = useMemo(() => {
    const convertData = (reportTopFiveData as any)?.data?.data;
    return convertData;
  }, [reportTopFiveData]);
  const disabledStartDate = useCallback((current) => {
    // return form.getFieldValue("to")
    //   ? current > form.getFieldValue("to")
    //   : false;
  }, []);

  const disabledEndDate = useCallback((current) => {
    // return form.getFieldValue("from")
    //   ? current < form.getFieldValue("from")
    //   : false;
  }, []);

  const handleChangeStartDate = useCallback((value: string) => {
    const date = dayjs(value, "MM/DD/YYYY")
      .startOf("days")
      .format("YYYY-MM-DD HH:mm:ss");

    setFilterData((pre) => ({
      ...pre,
      startTime: String(dayjs.tz(date, timezone).unix()),
    }));
    setTimeDisable((pre: any) => ({ ...pre, start: dayjs(date) }));
  }, []);
  const handleChangeEndDate = useCallback((value: string) => {
    const date = dayjs(value, "MM/DD/YYYY")
      .endOf("days")
      .format("YYYY-MM-DD HH:mm:ss");
    setFilterData((pre) => ({
      ...pre,
      endTime: String(dayjs.tz(date, timezone).unix()),
    }));
    setTimeDisable((pre: any) => ({ ...pre, end: dayjs(date) }));
  }, []);
  return (
    <Page title="By Agent" compactTitle fullWidth>
      <Card>
        <div className="px-4 pt-4 pb-2">
          <div className={styles.groupFilter}>
            <div className={styles.dateTime}>
              <MDDatePicker
                type="start"
                onDateChange={handleChangeStartDate}
                datePickerClassName={styles.datePickerCustomer}
                disableDatesBefore={getTwoWeeksBefore(
                  timeDisable.end.toDate()
                ).toDate()}
                disableDatesAfter={timeDisable.end.toDate()}
              />
              <MDDatePicker
                type="end"
                onDateChange={handleChangeEndDate}
                datePickerClassName={styles.datePickerCustomer}
                containerClassName={styles.endDateBlock}
                disableDatesBefore={timeDisable.start.toDate()}
                disableDatesAfter={getTwoWeeksAfter(
                  timeDisable.start.toDate()
                ).toDate()}
              />
            </div>
          </div>
          <div className="wrap-chart mb-[40px] mt-6">
            <div className="title text-lg font-semibold mb-6">
              Ticket closed per agent per day (Top 5 Agents)
            </div>
            <div className="w-full h-[450px]">
              <ChartAgentsTicket data={memoChartData} />
            </div>
          </div>
          <div>
            <div className="title text-lg font-semibold mb-6">
              Tickets by Agents
            </div>
            <ReportAgentTable rangeTime={filterData} />
          </div>
        </div>
      </Card>
    </Page>
  );
};

export default ByAgentPage;
