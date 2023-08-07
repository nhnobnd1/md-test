import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { SelectProps } from "antd";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import useMessage from "src/hooks/useMessage";
import { SelectList } from "src/modules/ticket/components/TicketForm/SelectList";
import { getListAgentApi } from "src/modules/ticket/helper/api";

interface SelectListProps extends SelectProps {
  filter?: boolean;
}

export const AgentSelect: FC<SelectListProps> = ({
  filter = true,
  ...props
}) => {
  const message = useMessage();
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>(
    props.value?.split(",")[1] || ""
  );
  const debounceValue: string = useDebounce(search, 200);

  const { data: dataAgents, isFetching } = useQuery({
    queryKey: [
      "getAgents",
      {
        page: 1,
        limit: 100,
        query: debounceValue,
      },
    ],
    queryFn: () =>
      getListAgentApi({
        page: 1,
        limit: 100,
        query: debounceValue,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_agent"));
    },
  });
  const agentsOptions = useMemo(() => {
    if (!dataAgents) return [];
    return filter
      ? dataAgents
          .filter((item) => item.isActive && item.emailConfirmed)
          .map((item) => ({
            label: item.lastName.includes("admin")
              ? `${item.firstName} - ${item.email}`
              : `${item.firstName} ${item.lastName} - ${item.email}`,
            value: `${item._id},${item.email}`,
            obj: item,
          }))
      : dataAgents.map((item) => ({
          label: item.lastName.includes("admin")
            ? `${item.firstName} - ${item.email}`
            : `${item.firstName} ${item.lastName} - ${item.email}`,
          value: `${item._id},${item.email}`,
          obj: item,
        }));
  }, [dataAgents, filter]);
  return (
    <SelectList
      onSearch={(value) => {
        if (!value) {
          setSearch(value);
          return;
        }
        if (dataAgents?.find((item) => item.email.includes(value))) {
          return;
        }
        setSearch(value);
      }}
      allowClear
      showSearch
      onClear={() => {
        setSearch("");
      }}
      placeholder="Search agents"
      options={agentsOptions}
      loading={isFetching}
      {...props}
    />
  );
};
