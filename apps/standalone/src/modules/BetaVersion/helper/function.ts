export const getTableHeigh = (
  screenHeigh?: number | string,
  headerHeight?: number | string,
  tabHeaderHeight?: number | string
) => {
  const pageHeader = 64;
  const padding = 100;
  const headerTableHeight = 38;
  const paginationHeight = 50;
  return (
    Number(screenHeigh) -
    Number(headerHeight) -
    Number(tabHeaderHeight) -
    headerTableHeight -
    paginationHeight -
    pageHeader -
    padding
  );
};
