import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";
import SelectAddTag from "src/components/SelectAddTag/SelectAddTag";
import { getTagsTicket } from "src/modules/ticket/helper/api";

interface TagSelectProps {
  disabled?: boolean;
  isFilter?: boolean;
}

export const TagSelect: FC<TagSelectProps> = ({ isFilter, ...props }) => {
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
      //   message.error(t("messages:error.get_tag"));
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
    <SelectAddTag
      disabled={props.disabled}
      onSearch={(value) => {
        setSearch(value);
      }}
      label="Tags"
      data={tagsOptions}
      placeholder="+ Add Tags"
      {...props}
      loading={isFetching}
      isFilter={isFilter}
    />
  );
};
