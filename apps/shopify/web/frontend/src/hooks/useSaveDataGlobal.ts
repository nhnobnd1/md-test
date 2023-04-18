import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function useSaveDataGlobal() {
  const queryClient = useQueryClient();
  const { data: dataSaved } = useQuery({
    queryKey: ["saveData"],
    queryFn: () => null,
    enabled: false,
  });
  const setDataSaved = useCallback(
    (state: any | null) => {
      queryClient.setQueryData("saveData", state);
    },
    [queryClient]
  );
  return { dataSaved, setDataSaved };
}
