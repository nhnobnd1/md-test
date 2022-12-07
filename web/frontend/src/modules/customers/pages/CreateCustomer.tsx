import { ContextualSaveBar, Page } from "@shopify/polaris";
import { useCallback, useEffect, useRef, useState } from "react";
import CustomerForm from "src/modules/customers/component/CustomerForm";

export default function CreateCustomer() {
  const formRef = useRef<any>();
  const [showSave, setShowSave] = useState(false);
  const handleSubmitForm = useCallback(() => {
    formRef.current?.save();
  }, []);
  const handleResetForm = useCallback(() => {
    formRef.current?.reset();
  }, []);
  const saveAction = (
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
  );
  useEffect(() => {
    setShowSave(true);
  }, [formRef.current?.changeValue()]);
  return (
    <>
      {showSave ? saveAction : null}
      <Page
        title="Infor customer"
        subtitle="Detail infor customer"
        compactTitle
        fullWidth
      >
        <CustomerForm ref={formRef} initialValues={{}} />
      </Page>
    </>
  );
}
