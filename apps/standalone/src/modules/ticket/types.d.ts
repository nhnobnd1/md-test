import ticketLocales from "src/modules/ticket/locales";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

declare global {
  interface RoutePaths {
    Ticket: typeof TicketRoutePaths;
  }

  interface Localizations {
    ticket: typeof ticketLocales.en & typeof ticketLocales.vi;
  }
}
