import {
  Pagination as PaginationShopify,
  PaginationProps as PaginationShopifyProps,
} from "@shopify/polaris";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./Pagination.scss";

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

  const PaginationNumber = ({
    page,
    pageAmount,
  }: {
    page: number;
    pageAmount: number;
  }) => {
    const listLeft = useMemo(() => {
      let list: number[] = [];
      if (page <= 3) {
        const countLoop = pageAmount <= 3 ? pageAmount : 3;
        for (let i = 1; i <= countLoop; i++) {
          list.push(i);
        }
        if (pageAmount > 3) list.push(0);
      } else {
        if (page - 1 > 3) {
          list = [1, 2, 3, 0, page - 1, page];
        } else {
          for (let i = 1; i <= page; i++) {
            list.push(i);
          }
          list.push(0);
        }
      }
      console.log(list, "list left");
      return list;
    }, [page, pageAmount]);

    const listRight = useMemo(() => {
      if (pageAmount - 1 <= 3 || pageAmount === page) {
        return [];
      } else {
        if (pageAmount - 2 === page) {
          return [pageAmount - 1, pageAmount];
        } else if (pageAmount - 2 > page) {
          if (page - 2 < 3) {
            return [pageAmount];
          } else return [page + 1, 0, pageAmount];
        } else {
          return [pageAmount];
        }
      }
    }, [page, pageAmount]);

    return (
      <div className="pagination-item-wrap flex items-center gap-3">
        {listLeft.map((item) => (
          <div
            className={classNames({
              active: item === page,
              "pagination-item": item !== 0,
              "pagination-item__more": item === 0,
            })}
            onClick={() =>
              item !== 0
                ? setPage(item)
                : page - 5 > 4
                ? setPage(() => page - 5)
                : page <= 4
                ? setPage(() => page + 5)
                : setPage(() => (page - 5 > 1 ? page - 5 : 1))
            }
            key={`pag-${item}`}
          >
            {item !== 0 ? item : "..."}
          </div>
        ))}
        {listRight.map((item) => (
          <div
            className="pagination-item"
            onClick={() =>
              item !== 0
                ? setPage(item)
                : page + 5 < pageAmount - 3
                ? setPage(() => page + 5)
                : setPage(() => pageAmount)
            }
            key={`pag-${item}`}
          >
            {item !== 0 ? item : "..."}
          </div>
        ))}
      </div>
    );
  };

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
  }, [page]);

  return (
    <PaginationShopify
      label={
        <>
          <PaginationNumber page={page} pageAmount={pageAmount} />
        </>
      }
      {...props}
      onPrevious={handlePrevious}
      hasPrevious={props.hasPrevious ?? page > 1}
      hasNext={props.hasNext ?? page < pageAmount}
      onNext={handleNext}
    />
  );
};

export default Pagination;
