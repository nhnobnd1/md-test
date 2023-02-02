import {
  Pagination as APagination,
  PaginationProps as APaginationProps,
} from "antd";
import { useCallback } from "react";

interface PaginationProps extends Omit<APaginationProps, "onChange"> {
  total: number;
  pageSize: number;
  currentPage: number;
  onChange: ({ page, limit }: { page: number; limit: number }) => void;
}

const Pagination = ({
  total,
  pageSize,
  currentPage,
  onChange,
  ...props
}: PaginationProps) => {
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

  return (
    <APagination
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      {...props}
      total={total}
      defaultPageSize={pageSize}
      pageSize={pageSize}
      defaultCurrent={1}
      current={currentPage}
      onChange={handleChangePagination}
      onShowSizeChange={handleSizeChange}
    />
  );
};

export default Pagination;
