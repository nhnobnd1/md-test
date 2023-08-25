export interface ListTicketCustomerFilter {
  limit: number;
  page: number;
  query: string;
  sortBy: string | undefined;
  sortOrder: number | undefined;
}
