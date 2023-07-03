import { InfoCircleTwoTone } from "@ant-design/icons";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Tooltip } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import MDRangePicker from "src/components/UI/MDRangePicker/MDRangePicker";
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

  const handleChangeTime = useCallback(
    (dates: any) => {
      if (!dates) {
        setFilter({
          endTime: "",
          startTime: "",
        });
      } else {
        setFilter({
          startTime: String(convertTimeStamp(dates[0], timezone, "start")),
          endTime: String(convertTimeStamp(dates[1], timezone, "end")),
        });
      }
    },
    [timezone]
  );
  return (
    <>
      <Header title="Report By Agents" />
      <div className={styles.dateWrap}>
        <div className={styles.groupDatePicker}>
          <MDRangePicker onFilterChange={handleChangeTime} />
          <Tooltip title="Please select a maximum time period of 14 days (counting from the start date)">
            <div className={styles.infoPicker}>
              <InfoCircleTwoTone twoToneColor="#FA7D00" />
            </div>
          </Tooltip>
        </div>
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
