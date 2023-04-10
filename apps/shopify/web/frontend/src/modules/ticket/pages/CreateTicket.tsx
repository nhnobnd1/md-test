import { generatePath, useJob, useMount, useToggle } from "@moose-desk/core";
import {
  EmailIntegration,
  EmailIntegrationRepository,
  Priority,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Layout, LegacyCard, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Banner } from "src/components/Banner";
import { useBanner } from "src/hooks/useBanner";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const { toggle: updateForm } = useToggle();
  const { show } = useToast();

  const formRef = useRef<FormikProps<any>>(null);
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();

  const initialValuesForm = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      from: primaryEmail?._id,
      content: "",
      to: "",
      subject: "",
    };
  }, [primaryEmail?._id]);
  const { run: getPrimaryEmail } = useJob(() => {
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

  useMount(() => {
    updateForm();
  });
  useEffect(() => {
    getPrimaryEmail();
  }, []);

  return (
    <>
      <Page
        breadcrumbs={[
          { content: "Ticket", url: generatePath(TicketRoutePaths.Index) },
        ]}
        title="New Ticket"
        fullWidth
      >
        <Layout>
          {banner.visible && (
            <Layout.Section>
              <Banner banner={banner} onDismiss={closeBanner}></Banner>
            </Layout.Section>
          )}

          <Layout.Section>
            <LegacyCard sectioned>
              <TicketForm
                innerRef={formRef}
                initialValues={initialValuesForm}
                enableReinitialize
                onValuesChange={updateForm}
                primaryEmail={primaryEmail}
              />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default CreateTicket;
