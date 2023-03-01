import {
  generatePath,
  useLocation,
  useMount,
  useParams,
  useToggle,
} from "@moose-desk/core";
import { ContextualSaveBar, Layout, LegacyCard, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useEffect, useMemo, useRef } from "react";
import { Banner } from "src/components/Banner";
import { useBanner } from "src/hooks/useBanner";
import { DetailTicketForm } from "src/modules/ticket/components/DetailTicketForm";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface DetailTicketProps {}

const DetailTicket = (props: DetailTicketProps) => {
  const formRef = useRef<FormikProps<any>>(null);
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const { state } = useLocation();
  const { toggle: updateForm } = useToggle();
  const { id } = useParams();

  useEffect(() => {
    if (state?.banner && state.banner?.status) {
      showBanner(state.banner.status, {
        title: state.banner.title ?? "",
        message: state.banner.message ?? "",
      });
    }
  }, [state]);

  const initialValues = useMemo(() => {
    return {};
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
        title="Ticket#: Ticket Title"
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
              <DetailTicketForm
                innerRef={formRef}
                initialValues={initialValues}
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

export default DetailTicket;
