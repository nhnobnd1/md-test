import {
  Pagination as PaginationShopify,
  PaginationProps as PaginationShopifyProps,
} from "@shopify/polaris";
import { useMemo } from "react";

interface PaginationProps extends PaginationShopifyProps {
  total: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({
  total,
  pageSize,
  currentPage,
  ...props
}: PaginationProps) => {
  const labelPagination = useMemo(() => {
    const pageAmount = total !== 0 ? Math.ceil(total / Number(pageSize)) : 1;
    return `${
      currentPage > pageAmount ? pageAmount : currentPage
    }/${pageAmount}`;
  }, [total, pageSize, currentPage]);

  return <PaginationShopify label={labelPagination} {...props} />;
};

export default Pagination;
