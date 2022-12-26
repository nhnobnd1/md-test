import { useState } from "react";
import env from "src/core/env";

export default function useTable(props: any) {
  const [page, setPage] = useState<number>(props?.defaultCurrentPage || 0);
  const rowsPerPage = env.DEFAULT_PAGE_SIZE;

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    setPage,
    rowsPerPage,
    //
    onChangePage,
  };
}

export function emptyRows(
  page: number,
  rowsPerPage: number,
  arrayLength: number
) {
  return page > 0 ? Math.max(0, rowsPerPage - arrayLength) : 0;
}
