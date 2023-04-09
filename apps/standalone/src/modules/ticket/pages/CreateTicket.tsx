import { useJob } from "@moose-desk/core";
import {
  EmailIntegration,
  EmailIntegrationRepository,
  Priority,
} from "@moose-desk/repo";
import { useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Header } from "src/components/UI/Header";
import { TicketForm } from "src/modules/ticket/components/TicketForm";

interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();

  const initialValues = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      from: primaryEmail?._id,
      content: "",
      to: "",
    };
  }, [primaryEmail?._id]);

  const { run: getPrimaryEmail, processing } = useJob(() => {
    return EmailIntegrationRepository()
      .getPrimaryEmail()
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setPrimaryEmail(data.data);
          }
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });

  useEffect(() => {
    getPrimaryEmail();
  }, []);
  return (
    <>
      <Header className="mb-[40px]" title="New Ticket" back></Header>

      {processing ? (
        <></>
      ) : (
        <TicketForm primaryEmail={primaryEmail} initialValues={initialValues} />
      )}
    </>
  );
};

export default CreateTicket;
