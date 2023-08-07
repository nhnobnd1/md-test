import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import useMessage from "src/hooks/useMessage";
import { SelectTag } from "src/modules/ticket/components/TicketForm/SelectTag";
import { getTagsTicket } from "src/modules/ticket/helper/api";

interface TagSelectProps {}

export const TagSelect: FC<TagSelectProps> = ({ ...props }) => {
  const message = useMessage();
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const debounceValue: string = useDebounce(search, 200);

  const { data: dataTags, isFetching } = useQuery({
    queryKey: [
      "getTagsTicket",
      {
        page: 1,
        limit: 10,
        query: debounceValue,
      },
    ],
    queryFn: () =>
      getTagsTicket({
        page: 1,
        limit: 10,
        query: debounceValue,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_tag"));
    },
  });
  const tagsOptions = useMemo(() => {
    if (!dataTags) return [];
    return dataTags.map((item) => ({
      label: item.name,
      value: item.name,
      obj: item,
    }));
  }, [dataTags]);
  return (
    <SelectTag
      onSearch={(value) => {
        setSearch(value);
      }}
      mode="tags"
      placeholder="Add tags"
      options={tagsOptions}
      loading={isFetching}
      {...props}
    />
  );
};
