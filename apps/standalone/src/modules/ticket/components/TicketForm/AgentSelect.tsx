import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { AutoComplete, SelectProps } from "antd";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import useMessage from "src/hooks/useMessage";
import useViewport from "src/hooks/useViewport";
import { getListAgentApi } from "src/modules/ticket/helper/api";

interface SelectListProps extends SelectProps {
  filter?: boolean;
  setAgentSelected?: any;
}
export const SelectList: FC<SelectListProps> = ({ ...props }) => {
  const { isMobile } = useViewport();
  return (
    <AutoComplete
      size={isMobile ? "middle" : "large"}
      {...props}
    ></AutoComplete>
  );
};
export const AgentSelect: FC<SelectListProps> = ({
  filter = true,
  setAgentSelected,
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
        limit: 10,
        query: debounceValue,
        isLive: filter ? 1 : 0,
      },
    ],
    queryFn: () =>
      getListAgentApi({
        page: 1,
        limit: 10,
        query: debounceValue,
        isLive: filter ? 1 : 0,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_agent"));
    },
  });
  const agentsOptions = useMemo(() => {
    if (!dataAgents) return [];
    return dataAgents.map((item) => ({
      label: item.lastName.includes("admin")
        ? `${item.firstName} - ${item.email}`
        : `${item.firstName} ${item.lastName} - ${item.email}`,
      value: item.lastName.includes("admin")
        ? `${item.firstName} - ${item.email}`
        : `${item.firstName} ${item.lastName} - ${item.email}`,
      obj: item,
    }));
  }, [dataAgents, filter]);
  return (
    <SelectList
      onSearch={(value) => {
        if (!value) {
          setAgentSelected(undefined);
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
      onSelect={(value) => {
        const emailSelect = value.split("-")[1]?.trim();
        const findAgent = dataAgents?.find(
          (item) => item.email === emailSelect
        );
        setAgentSelected(findAgent);
      }}
      onClear={() => {
        setSearch("");
        setAgentSelected(undefined);
      }}
      placeholder="Search agents"
      options={agentsOptions}
      loading={isFetching}
      filterOption={(input, option: any) => {
        return option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      {...props}
    />
  );
};
