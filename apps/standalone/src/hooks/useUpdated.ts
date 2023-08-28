import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function useUpdated() {
  const queryClient = useQueryClient();
  const { data: isUpdated }: any = useQuery("updatedValue", () => null, {
    enabled: false,
    initialData: false,
  });
  const setUpdated = useCallback(
    (status: boolean) => {
      if (!status) queryClient.setQueryData("updatedValue", false);
      if (isUpdated) return;
      queryClient.setQueryData("updatedValue", status);
    },
    [queryClient, isUpdated]
  );

  return { isUpdated, setUpdated };
}
