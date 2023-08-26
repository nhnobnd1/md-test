export enum ACTIVATE_TYPE {
  NEW_TICKET_BY_AGENT = "NEW_TICKET_BY_AGENT",
  NEW_TICKET_BY_CUSTOMER = "NEW_TICKET_BY_CUSTOMER",
  NEW_REPLY_BY_AGENT = "NEW_REPLY_BY_AGENT",
  NEW_REPLY_BY_CUSTOMER = "NEW_REPLY_BY_CUSTOMER",
}
export const renderTextContent = (type: string) => {
  if (!type) return " ";
  if (type === ACTIVATE_TYPE.NEW_TICKET_BY_AGENT) return "created a ticket ";
  if (type === ACTIVATE_TYPE.NEW_TICKET_BY_CUSTOMER)
    return "raised a new ticket ";
  if (type === ACTIVATE_TYPE.NEW_REPLY_BY_AGENT)
    return "has sent a response to the ticket ";
  if (type === ACTIVATE_TYPE.NEW_REPLY_BY_CUSTOMER)
    return "has sent an email response to the ticket ";
};
