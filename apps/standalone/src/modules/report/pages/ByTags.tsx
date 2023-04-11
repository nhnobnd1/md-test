import { PageComponent, useNavigate } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { DatePicker, Form, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useForm } from "antd/lib/form/Form";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import env from "src/core/env";
import { getReportByTags } from "src/modules/report/api/api";
import {
  convertToTimeStamp,
  endOfMonth,
  startOfMonth,
} from "src/modules/report/helper/convert";
interface ByTagsProps {}
interface ITableFilter {
  page: number;
  limit: number;
  query: string;
  sortBy?: string;
  sortOrder?: number;
  startTime: string;
  endTime: string;
}
export const ByTags: PageComponent<ByTagsProps> = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [filterData, setFilterData] = useState<ITableFilter>({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
    startTime: String(startOfMonth),
    endTime: String(endOfMonth),
  });
  const [querySearch, setQuerySearch] = useState<string>("");
  const debounceValue: string = useDebounce(querySearch, 500);

  const { data: listReportTags, isFetching } = useQuery({
    queryKey: [QUERY_KEY.REPORT_BY_TAGS, filterData, debounceValue],
    queryFn: () => getReportByTags({ ...filterData, query: debounceValue }),
    keepPreviousData: true,
  });
  const memoChartData = useMemo(() => {
    const convertData = (listReportTags as any)?.data?.data || [];
    return convertData;
  }, [listReportTags]);
  const columns = [
    {
      title: "Tag",
      dataIndex: "tagName",
      width: "30%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.tagName - b.tagName;
        },
      },
    },
    {
      title: "Total Tickets",
      dataIndex: "totalTicket",
      width: "20%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.totalTicket - b.totalTicket;
        },
      },
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      sorter: {
        compare: (a: any, b: any) => {
          return a.percentage - b.percentage;
        },
      },
      width: "20%%",
    },
    {
      title: "Percentage Closed",
      dataIndex: "percentageClosed",
      sorter: {
        compare: (a: any, b: any) => {
          return a.percentageClosed - b.percentageClosed;
        },
      },
      width: "20%%",
    },
  ];
  const onChangeTable = useCallback(
    (_: any, __: any, sorter: SorterResult<any>) => {
      if (sorter.order && sorter.field) {
        setFilterData((pre) => ({
          ...pre,
          sortBy: sorter?.field as string,
          sortOrder: sorter?.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((pre) => ({
          ...pre,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<any>["onChange"];
  const handleSearchInput = (e: any) => {
    const newQuery = e.target.value;
    setQuerySearch(newQuery);
  };
  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilterData((value: any) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );
  const disabledStartDate = useCallback(
    (current) => {
      return form.getFieldValue("to")
        ? current > form.getFieldValue("to")
        : false;
    },
    [form.getFieldValue("to")]
  );

  const disabledEndDate = useCallback(
    (current) => {
      return form.getFieldValue("from")
        ? current < form.getFieldValue("from")
        : false;
    },
    [form.getFieldValue("from")]
  );
  const handleChangeStartTime = (_: any, values: string) => {
    setFilterData((pre) => ({
      ...pre,
      startTime: String(convertToTimeStamp(values) || startOfMonth),
    }));
  };
  const handleChangeEndTime = (_: any, values: string) => {
    setFilterData((pre) => ({
      ...pre,
      endTime: String(convertToTimeStamp(values) || endOfMonth),
    }));
  };
  return (
    <>
      <section className="flex-start mb-10 justify-between">
        <div>
          <Form onValuesChange={() => {}} form={form} layout="inline">
            <Form.Item name="from" label="From">
              <DatePicker
                format={"DD/MM/YYYY"}
                placeholder="dd/mm/yyyy"
                disabledDate={disabledStartDate}
                onChange={handleChangeStartTime}
              />
            </Form.Item>
            <Form.Item name="to" label="To">
              <DatePicker
                format={"DD/MM/YYYY"}
                placeholder="dd/mm/yyyy"
                disabledDate={disabledEndDate}
                onChange={handleChangeEndTime}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="">
          <MDSearchInput onChange={handleSearchInput} value={querySearch} />
        </div>
      </section>
      <section>
        <Table
          dataSource={memoChartData}
          columns={columns}
          loading={isFetching}
          onChange={onChangeTable}
          scroll={{ x: 1024 }}
          rowKey={(record) => record}
        />
        <Pagination
          className="mt-4 flex justify-end"
          currentPage={filterData.page ?? 1}
          total={(listReportTags as any)?.data.metadata.totalCount}
          pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
          onChange={onPagination}
        />
      </section>
    </>
  );
};

export default ByTags;