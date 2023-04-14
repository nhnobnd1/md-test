import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { GlobalRepository } from "@moose-desk/repo/global/GlobalRepository";
import { useQuery } from "react-query";
import { lastValueFrom } from "rxjs";

export default function useGlobalData(enabled = false) {
  const getGlobalData = () => {
    return new Promise((resolve, reject) => {
      lastValueFrom(GlobalRepository().get())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };
  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEY.GLOBAL],
    queryFn: () => getGlobalData(),
    enabled: enabled,
  });
  const deepData = (data as any)?.data;
  return {
    dataGlobal: deepData,
    refetchGlobal: refetch,
  };
}
