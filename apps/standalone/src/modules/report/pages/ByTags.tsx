import { InfoCircleTwoTone } from "@ant-design/icons";
import { PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { TableProps, Tooltip } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useForm } from "antd/lib/form/Form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Header } from "src/components/UI/Header";
import MDRangePicker from "src/components/UI/MDRangePicker/MDRangePicker";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { Table } from "src/components/UI/Table";
import env from "src/core/env";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getReportByTags } from "src/modules/report/api/api";
import {
  convertTimeStamp,
  getTimeFilterDefault,
} from "src/modules/report/helper/convert";
import styles from "./styles.module.scss";

interface ByTagsProps {}
interface ITableFilter {
  page: number;
  limit: number;
  query?: string;
  sortBy?: string;
  sortOrder?: number;
  startTime: string;
  endTime: string;
}
export const ByTags: PageComponent<ByTagsProps> = () => {
  const { subDomain } = useSubdomain();

  const { timezone } = useGlobalData(false, subDomain || "");
  const { t } = useTranslation();

  const [form] = useForm();
  const { isAgent } = usePermission();
  const { current, twoWeekAgo } = getTimeFilterDefault();

  const [filterData, setFilterData] = useState<ITableFilter>({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
    startTime: "",
    endTime: "",
  });
  useEffect(() => {
    if (!timezone) return;
    form.setFieldsValue({
      to: current?.tz(timezone),
      from: twoWeekAgo?.tz(timezone),
    });
    setFilterData((pre) => ({
      ...pre,
      startTime: String(twoWeekAgo?.tz(timezone).startOf("day").unix()),
      endTime: String(current?.tz(timezone).endOf("day").unix()),
    }));
  }, [timezone]);

  const {
    data: listReportTags,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.REPORT_BY_TAGS, filterData],
    queryFn: () => getReportByTags(filterData),
    keepPreviousData: true,
    enabled: !isAgent && !!filterData.startTime && !!filterData.endTime,
  });
  const memoChartData = useMemo(() => {
    const convertData = (listReportTags as any)?.data?.data || [];
    return convertData;
  }, [listReportTags]);
  const columns = [
    {
      title: t("common:reporting.tag"),
      dataIndex: "tagName",
      width: "40%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.tagName - b.tagName;
        },
      },
    },
    {
      title: t("common:reporting.total_ticket"),
      dataIndex: "totalTicket",
      width: "20%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.totalTicket - b.totalTicket;
        },
      },
    },
    {
      title: t("common:reporting.percentage"),
      dataIndex: "percentage",
      sorter: {
        compare: (a: any, b: any) => {
          return a.percentage - b.percentage;
        },
      },
      width: "20%",
    },
    {
      title: t("common:reporting.percentage_closed"),
      dataIndex: "percentageClosed",
      sorter: {
        compare: (a: any, b: any) => {
          return a.percentageClosed - b.percentageClosed;
        },
      },
      width: "20%",
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
    []
  ) as TableProps<any>["onChange"];
  const handleSearchInput = (query: string) => {
    setFilterData((pre) => ({ ...pre, query }));
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
  const handleChangeTime = useCallback(
    (dates: any) => {
      if (!dates) {
        setFilterData((pre) => ({ ...pre, endTime: "", startTime: "" }));
      } else {
        setFilterData((pre) => ({
          ...pre,
          startTime: String(convertTimeStamp(dates[0], timezone, "start")),
          endTime: String(convertTimeStamp(dates[1], timezone, "end")),
        }));
      }
    },
    [timezone]
  );
  return (
    <>
      <Header title={t("common:reporting.page_header_tag")} />
      <section className="flex-start">
        <div className={styles.dateWrap}>
          <div className={styles.groupDatePicker}>
            <MDRangePicker onFilterChange={handleChangeTime} />
            <Tooltip title={t("common:reporting.tooltip_14days")}>
              <div className={styles.infoPicker}>
                <InfoCircleTwoTone twoToneColor="#FA7D00" />
              </div>
            </Tooltip>
          </div>
        </div>
      </section>
      <section className={styles.reportTagTableWrap}>
        <div className={styles.searchTagWrap}>
          <div className={styles.searchTag}>
            <MDSearchInput onTypeSearch={handleSearchInput} />
          </div>
        </div>
        {isLoading ? (
          <div className="p-6">
            <MDSkeleton lines={10} />
          </div>
        ) : (
          <Table
            dataSource={memoChartData}
            columns={columns}
            loading={isLoading}
            onChange={onChangeTable}
            scroll={{ x: 1024 }}
            rowKey={(record) => record}
          />
        )}
        {isLoading ? (
          <div className="mt-4 flex justify-end">
            <MDSkeleton lines={1} width={300} />
          </div>
        ) : (
          <Pagination
            className="mt-4 flex justify-end"
            currentPage={filterData.page ?? 1}
            total={(listReportTags as any)?.data.metadata.totalCount}
            pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
            onChange={onPagination}
          />
        )}
      </section>
    </>
  );
};

export default ByTags;
