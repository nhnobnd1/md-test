import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  GetDashboardRequest,
  GetSummaryResponse,
} from "@moose-desk/repo/dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SummaryBlock from "src/components/UI/SummaryBlock/SummaryBlock";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getDashboardSummary } from "src/modules/dashboard/api/api";
import {
  convertSecondsToHoursMinutes,
  getTimeFilterDefault,
} from "src/modules/report/helper/convert";

export const Summary = () => {
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const { current, twoWeekAgo } = getTimeFilterDefault();
  const [filter, setFilter] = useState<GetDashboardRequest>({
    startTime: "",
    endTime: "",
  });
  useEffect(() => {
    if (!timezone) return;
    setFilter({
      startTime: String(twoWeekAgo?.tz(timezone).startOf("day").unix()),
      endTime: String(current?.tz(timezone).endOf("day").unix()),
    });
  }, [timezone]);
  const { data, isLoading }: any = useQuery({
    queryKey: ["DashboardSummary", filter],
    queryFn: () => getDashboardSummary(filter),
    keepPreviousData: true,
    enabled: !!filter.startTime && !!filter.endTime,
  });
  const summaryData: GetSummaryResponse = data?.data;

  return (
    <div>
      <SummaryBlock
        data={{
          ...summaryData?.data,
          avgFirstResponseTime: convertSecondsToHoursMinutes(
            summaryData?.data.avgFirstResponseTime || 0
          ),
          avgResolutionTime: convertSecondsToHoursMinutes(
            summaryData?.data.avgResolutionTime || 0
          ),
        }}
      />
    </div>
  );
};
