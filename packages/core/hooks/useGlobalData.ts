import { useNavigate } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { GlobalRepository } from "@moose-desk/repo/global/GlobalRepository";
import { useQuery } from "react-query";
import { lastValueFrom } from "rxjs";

export default function useGlobalData(enabled = false, subDomain: string) {
  const navigate = useNavigate();

  const getGlobalData = (sd: { subdomain: string }) => {
    return new Promise((resolve, reject) => {
      lastValueFrom(GlobalRepository().get(sd))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };
  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEY.GLOBAL, { subdomain: subDomain }],
    queryFn: () => getGlobalData({ subdomain: subDomain }),
    enabled: enabled && !!subDomain,
    onSuccess: (data: any) => {
      if (!data.data.data.storeId) {
        navigate("/404");
        return;
      }
    },
  });
  const deepData: any = (data as any)?.data?.data;
  return {
    dataGlobal: deepData,
    timezone: deepData?.timezone,
    refetchGlobal: refetch,
  };
}
