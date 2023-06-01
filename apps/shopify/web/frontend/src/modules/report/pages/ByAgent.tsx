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
  formatDefaultTimeRangePicker,
  formatDefaultTimeRangePickerForRender,
} from "src/modules/report/helper/format";
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
  const [filterData, setFilterData] = useState<ITableFilter | any>({
    startTime: "",
    endTime: "",
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

  const handleSubmitDate = useCallback(
    (date: { start: Date; end: Date }) => {
      const startDate = dayjs(date.start, "MM/DD/YYYY")
        .startOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
      const endDate = dayjs(date.end, "MM/DD/YYYY")
        .endOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
      setFilterData({
        startTime: String(dayjs.tz(startDate, timezone).unix()),
        endTime: String(dayjs.tz(endDate, timezone).unix()),
      });
    },
    [timezone]
  );
  return (
    <Page title="By Agent" compactTitle fullWidth>
      <Card>
        <div className="px-4 pt-4 pb-2">
          <div className={styles.groupFilter}>
            <div className={styles.dateTime}>
              <MDDatePicker
                defaultRangeTime={{
                  start: formatDefaultTimeRangePicker(
                    filterData.startTime,
                    timezone
                  ),

                  end: formatDefaultTimeRangePicker(
                    filterData.endTime,
                    timezone
                  ),
                }}
                onSubmitTime={handleSubmitDate}
                datePickerClassName={styles.datePickerCustomer}
              />
            </div>
          </div>
          <div className={styles.groupRangeTimeRender}>
            {formatDefaultTimeRangePickerForRender(
              filterData.startTime,
              timezone
            )}{" "}
            -{" "}
            {formatDefaultTimeRangePickerForRender(
              filterData.endTime,
              timezone
            )}
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
