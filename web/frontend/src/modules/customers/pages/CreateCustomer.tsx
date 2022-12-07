import { ContextualSaveBar, Page } from "@shopify/polaris";
import { useCallback, useRef } from "react";
import CustomerForm from "src/modules/customers/component/CustomerForm";

export default function CreateCustomer() {
  const formValues = useRef();
  const handleSubmitForm = useCallback(() => {
    console.log("submit", formValues);
  }, []);
  const handleResetForm = useCallback(() => {
    console.log("reset", formValues);
  }, []);
  return (
    <>
      <ContextualSaveBar
        fullWidth
        message="Unsaved changes"
        saveAction={{
          onAction: handleSubmitForm,
          loading: false,
        }}
        discardAction={{
          onAction: handleResetForm,
          loading: false,
        }}
      />
      <Page
        title="Infor customer"
        subtitle="Detail infor customer"
        compactTitle
        fullWidth
      >
        <CustomerForm ref={formValues} />
      </Page>
    </>
  );
}
