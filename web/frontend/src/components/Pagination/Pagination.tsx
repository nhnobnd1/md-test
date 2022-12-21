import {
  Pagination as PaginationShopify,
  PaginationProps as PaginationShopifyProps,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface PaginationPack {
  page: number;
  pageAmount: number;
  pageSize: number;
  total: number;
}
export interface PaginationProps extends PaginationShopifyProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onChangePage?: (page: number) => void;
  onChangePagination?: ({
    page,
    pageAmount,
    pageSize,
    total,
  }: PaginationPack) => void;
}

const Pagination = ({
  total,
  pageSize,
  currentPage,
  onChangePage,
  onChangePagination,
  ...props
}: PaginationProps) => {
  const [page, setPage] = useState(currentPage);

  const pageAmount = useMemo(() => {
    return total !== 0 ? Math.ceil(total / Number(pageSize)) : 1;
  }, [total, pageSize]);

  const labelPagination = useMemo(() => {
    return `${
      currentPage > pageAmount ? pageAmount : currentPage
    }/${pageAmount}`;
  }, [total, pageSize, currentPage, pageAmount]);

  const handlePrevious = useCallback(() => {
    if (props.onPrevious) {
      props.onPrevious();
    } else {
      if (page > 1) {
        setPage((value) => value - 1);
      }
    }
  }, [currentPage, page]);

  const handleNext = useCallback(() => {
    if (props.onNext) {
      props.onNext();
    } else {
      if (page < pageAmount) {
        setPage((value) => value + 1);
      }
    }
  }, [currentPage, page]);

  useEffect(() => {
    onChangePage && onChangePage(page);
    onChangePagination &&
      onChangePagination({
        page: page,
        pageAmount: pageAmount,
        pageSize: pageSize,
        total: total,
      });
    console.log("page", page);
  }, [page]);

  return (
    <PaginationShopify
      label={labelPagination}
      {...props}
      onPrevious={handlePrevious}
      hasPrevious={props.hasPrevious ?? page > 1}
      hasNext={props.hasNext ?? page < pageAmount}
      onNext={handleNext}
    />
  );
};

export default Pagination;
