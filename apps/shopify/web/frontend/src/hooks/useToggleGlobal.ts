import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
export default function useToggleGlobal() {
  const queryClient = useQueryClient();
  const { data: visibleStatus } = useQuery({
    queryKey: ["toggle"],
    queryFn: () => null,
    enabled: false,
    initialData: false,
  });
  const setUpdateGlobal = useCallback(
    (visible: boolean) => {
      queryClient.setQueryData("toggle", visible);
    },
    [queryClient]
  );
  return { visible: visibleStatus || false, setVisible: setUpdateGlobal };
}
