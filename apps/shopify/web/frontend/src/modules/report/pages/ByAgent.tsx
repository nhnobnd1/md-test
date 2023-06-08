import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { LegacyCard, Text } from "@shopify/polaris";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getReportTopFive } from "src/modules/report/api/api";
import ChartAgentsTicket from "src/modules/report/components/ChartAgentsTicket/ChartAgentsTicket";
import { ReportAgentTable } from "src/modules/report/components/ReportAgentTable";
import { formatDefaultTimeRangePicker } from "src/modules/report/helper/format";
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
    <section className="page-wrap">
      <div className={styles.wrapTop}>
        <Text variant="headingLg" as="h1">
          By Agent
        </Text>
        <div className={styles.groupFilter}>
          <div className={styles.dateTime}>
            <MDDatePicker
              defaultRangeTime={{
                start: formatDefaultTimeRangePicker(
                  filterData.startTime,
                  timezone
                ),

                end: formatDefaultTimeRangePicker(filterData.endTime, timezone),
              }}
              onSubmitTime={handleSubmitDate}
              datePickerClassName={styles.datePickerCustomer}
            />
          </div>
        </div>
      </div>

      {/* <Card> */}
      <div className={styles.chartBlock}>
        <LegacyCard
          title="Ticket closed per agent per day (Top 5 Agents)"
          sectioned
        >
          <div className={styles.wrapChart}>
            <ChartAgentsTicket data={memoChartData} />
          </div>
        </LegacyCard>
      </div>

      <div>
        <LegacyCard sectioned>
          <ReportAgentTable rangeTime={filterData} />
        </LegacyCard>
        {/* <div className="title text-lg font-semibold mb-6">
          Tickets by Agents
        </div>
        <ReportAgentTable rangeTime={filterData} /> */}
      </div>
      {/* </Card> */}
    </section>
  );
};

export default ByAgentPage;
