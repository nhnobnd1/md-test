import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import BusinessCalendarRepository from "@moose-desk/repo/businessCalendar/BusinessCalendarRepository";
import { useQuery } from "react-query";
import { lastValueFrom } from "rxjs";

export default function useTimezone(enabled = false) {
  const getBusinessHours = (params: { page: number; limit: number }) => {
    return new Promise((resolve, reject) => {
      lastValueFrom(
        BusinessCalendarRepository().getListBusinessCalendar(params)
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };
  const { data } = useQuery({
    queryKey: [QUERY_KEY.BUSINESS_HOURS, { page: 1, limit: 10 }],
    queryFn: () => getBusinessHours({ page: 1, limit: 10 }),
    enabled: enabled,
  });
  const deepData = (data as any)?.data?.data[0];
  return {
    timezone: deepData?.timezone,
  };
}
