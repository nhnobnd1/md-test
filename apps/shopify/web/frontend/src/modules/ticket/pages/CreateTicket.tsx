import { generatePath, useMount, useToggle } from "@moose-desk/core";
import { Priority } from "@moose-desk/repo";
import { ContextualSaveBar, Layout, LegacyCard, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useMemo, useRef } from "react";
import { Banner } from "src/components/Banner";
import { useBanner } from "src/hooks/useBanner";
import { TicketForm } from "src/modules/ticket/components/TicketForm";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const { toggle: updateForm } = useToggle();
  const formRef = useRef<FormikProps<any>>(null);
  const initialValuesForm = useMemo(() => {
    return {
      to: "",
      assignee: "3a08cb83-d4ea-69c4-f1be-a4d5970f7ebb",
      priority: Priority.Medium,
    };
  }, []);

  useMount(() => {
    updateForm();
  });

  return (
    <>
      {formRef.current?.dirty && (
        <ContextualSaveBar
          fullWidth
          message={"Unsaved changes"}
          saveAction={{
            onAction: () => formRef.current?.submitForm(),
            disabled: !formRef.current?.dirty,
            // loading: loadingAddGroup,
          }}
          discardAction={{
            onAction: () => formRef.current?.resetForm(),
          }}
        />
      )}
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
              />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default CreateTicket;
