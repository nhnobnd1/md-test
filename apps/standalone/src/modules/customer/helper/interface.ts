export interface ListTicketCustomerFilter {
  limit: number;
  page: number;
  query: string;
  sortBy: string | undefined;
  sortOrder: number | undefined;
}
export interface TicketCustomerResponse {
  agentInfo?: {
    _id: string;
    isDeleted: boolean;
    isOwner: boolean;
    companyName?: string;
    email: string;
    emailConfirmed: boolean;
    firstName: string;
    isActive: boolean;
    lastName: string;
    phoneNumber?: string;
    storeId: string;
    subdomain: string;
    timezone: string;
  };
  agentObjectId?: string;
  createdBy: string;
  createdDatetime: string;
  createdTimestamp?: number;
  createdViaWidget: boolean;
  customerObjectId: string;
  deleted: boolean;
  deletedBy?: string;
  deletedDatetime?: string;
  deletedTimestamp?: string;
  description?: string;
  fromEmail: { email: string; name: string };
  fromEmailStr: string;
  incoming: boolean;
  mailMessageId?: string;
  permanentlyDeleted: boolean;
  priority: string;
  sendEmailFailureCount?: number;
  senderConfigId?: string;
  status: string;
  storeId: string;
  subject: string;
  tags?: string[];
  ticketId: number;
  toEmailStr: string;
  toEmails: { email: string; name: string }[];
  updatedBy?: string;
  updatedDatetime?: string;
  updatedTimestamp?: string;
  _id: string;
  agentEmail?: string;
}
export interface CustomerRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  storeId: string;
}
