import { MediaScreen } from "@moose-desk/core";
import {
  Pagination as APagination,
  PaginationProps as APaginationProps,
} from "antd";
import { memo, useCallback, useMemo } from "react";
import Select, { OptionType } from "src/components/UI/Select/Select";
import useScreenType from "src/hooks/useScreenType";

import classNames from "classnames";
import styles from "./style.module.scss";
interface PaginationProps extends Omit<APaginationProps, "onChange"> {
  className?: string;
  total: number;
  pageSize: number;
  currentPage: number;
  onChange: ({ page, limit }: { page: number; limit: number }) => void;
}

interface ShowSizeProps {
  total: number;
  options: OptionType[];
}

const Pagination = ({
  className,
  total,
  pageSize,
  currentPage,
  onChange,
  ...props
}: PaginationProps) => {
  const pageSizeOptions = useMemo(() => {
    if (props.pageSizeOptions) {
      return props.pageSizeOptions.map((item) => ({
        value: item,
        label: String(item),
      }));
    } else {
      return [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
      ];
    }
  }, [props.pageSizeOptions]);
  const [screenType, screenWidth] = useScreenType();

  const handleChangePagination = useCallback(
    (page: number, pageSize: number) => {
      onChange({ page, limit: pageSize });
    },
    [onChange]
  );

  const handleSizeChange = useCallback(
    (current: number, size: number) => {
      onChange({ page: current, limit: size });
    },
    [onChange]
  );

  const handlePageSizeChange = useCallback(
    (pageSize) => {
      onChange({ page: currentPage, limit: pageSize });
    },
    [onChange]
  );

  const ShowSize = ({ total, options }: ShowSizeProps) => {
    return (
      <div className="flex items-center">
        <span className="mr-2 whitespace-nowrap md-result-record">
          {total} Results
        </span>
        <Select
          className="mr-2"
          size={
            !props.size
              ? undefined
              : props.size === "default"
              ? "middle"
              : "small"
          }
          value={pageSize ?? options[0].value}
          options={options}
          onChange={handlePageSizeChange}
        ></Select>
        <span className="whitespace-nowrap">Records per page</span>
      </div>
    );
  };

  return (
    <APagination
      className={classNames(styles.MDPagination, className)}
      showTotal={(total) => `${total} Results`}
      {...props}
      total={total}
      defaultPageSize={pageSize}
      pageSize={pageSize}
      size={props.size ?? "default"}
      defaultCurrent={1}
      current={currentPage}
      onChange={handleChangePagination}
      onShowSizeChange={handleSizeChange}
      showSizeChanger={true}
      simple={screenWidth <= MediaScreen.MD}
    />
  );
};

export default memo(Pagination);
