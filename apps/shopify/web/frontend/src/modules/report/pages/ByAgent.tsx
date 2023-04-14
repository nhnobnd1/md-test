import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { formatTimeByTimezone } from "@moose-desk/core/helper/format";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Card, Page } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import { getReportTopFive } from "src/modules/report/api/api";
import ChartAgentsTicket from "src/modules/report/components/ChartAgentsTicket/ChartAgentsTicket";
import { ReportAgentTable } from "src/modules/report/components/ReportAgentTable";
import { convertTimeStamp } from "src/modules/report/helper/convert";
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
  // const { timezone } = useTimezone();
  // const { startOfMonth, endOfMonth } = formatTimeByTimezone(timezone);
  // const [filter, setFilter] = useState({
  //   startTime: String(startOfMonth),
  //   endTime: String(endOfMonth),
  // });
  const { timezone }: any = useGlobalData();
  const { startOfMonth, endOfMonth } = formatTimeByTimezone(timezone);

  const [filterData, setFilterData] = useState<ITableFilter>({
    startTime: String(startOfMonth),
    endTime: String(endOfMonth),
  });

  const { data: reportTopFiveData } = useQuery({
    queryKey: [QUERY_KEY.REPORT_TOP_FIVE, filterData],
    queryFn: () => getReportTopFive(filterData),
    keepPreviousData: true,
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

  const handleChangeStartDate = useCallback(
    (value: { start: Date; end: Date }) => {
      setFilterData((pre) => ({
        ...pre,
        startTime: String(convertTimeStamp(value.start, timezone)),
      }));
    },
    []
  );
  const handleChangeEndDate = useCallback(
    (value: { start: Date; end: Date }) => {
      setFilterData((pre) => ({
        ...pre,
        endTime: String(convertTimeStamp(value.end, timezone)),
      }));
    },
    []
  );
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
                // multiMonth
                // allowRange
              />
              <MDDatePicker
                type="end"
                onDateChange={handleChangeEndDate}
                datePickerClassName={styles.datePickerCustomer}
                containerClassName={styles.endDateBlock}
                // multiMonth
                // allowRange
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
