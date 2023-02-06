import { generatePath, useNavigate, usePrevious } from "@moose-desk/core";
import { Input } from "antd";
import { useState } from "react";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import env from "src/core/env";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

interface ChannelEmailProps {}

const ChannelEmail = (props: ChannelEmailProps) => {
  const navigate = useNavigate();
  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] = useState<any>(defaultFilter);
  const [meta, setMeta] = useState<any>();

  const prevFilter = usePrevious<any>(filterData);

  // const { run: getListAgentApi, processing: loadingList } = useJob(
  //   (payload: any) => {
  //     return AgentRepository()
  //       .getList(payload)
  //       .pipe(
  //         map(({ data }) => {
  //           if (data.statusCode === 200) {
  //             const listAgent = data.data.map((item) => ({
  //               ...item,
  //               id: item._id,
  //             }));
  //             setAgents(listAgent);
  //             setMeta(data.metadata);
  //           } else {
  //             message.error("Get data agent failed");
  //           }
  //         })
  //       );
  //   }
  // );

  // const { run: getListDebounce } = useDebounceFn(
  //   (payload: GetListAgentRequest) => {
  //     getListAgentApi(payload);
  //   },
  //   { wait: 300 }
  // );
  // const resetFilterData = useCallback(() => {
  //   setFilterData(defaultFilter());
  // }, []);

  // const onPagination = useCallback(
  //   ({ page, limit }: { page: number; limit: number }) => {
  //     setFilterData((value) => {
  //       return {
  //         ...value,
  //         page,
  //         limit,
  //       };
  //     });
  //   },
  //   []
  // );

  // useEffect(() => {
  //   if (prevFilter?.query !== filterData.query && filterData.query) {
  //     getListDebounce(filterData);
  //   } else {
  //     getListAgentApi(filterData);
  //   }
  // }, [filterData]);

  // const onChangeTable = useCallback(
  //   (pagination: any, filters: any, sorter: SorterResult<Agent>) => {
  //     if (sorter.order && sorter.columnKey) {
  //       setFilterData((value) => ({
  //         ...value,
  //         sortBy: sorter.columnKey as string,
  //         sortOrder: sorter.order === "ascend" ? 1 : -1,
  //       }));
  //     } else {
  //       setFilterData((value) => ({
  //         ...value,
  //         sortBy: undefined,
  //         sortOrder: undefined,
  //       }));
  //     }
  //   },
  //   [setFilterData]
  // ) as TableProps<Agent>["onChange"];

  return (
    <>
      <Header title="Email Configuration">
        <div className="flex-1 flex justify-end">
          <ButtonAdd
            onClick={() => {
              navigate(
                generatePath(SettingChannelRoutePaths.ChannelEmail.Create)
              );
            }}
          >
            Add new Email Address
          </ButtonAdd>
        </div>
      </Header>
      <div className="search mb-6">
        <Input.Search
          placeholder="Search"
          enterButton
          onSearch={(searchText: string) => {
            setFilterData((value: any) => {
              return {
                ...value,
                query: searchText,
                page: 1,
              };
            });
          }}
        />
      </div>
    </>
  );
};

export default ChannelEmail;
