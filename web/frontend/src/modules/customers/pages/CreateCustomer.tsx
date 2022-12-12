import { useNavigate } from "@shopify/app-bridge-react";
import { Page, Toast } from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import { useJob } from "src/core/hooks";
import useAuth from "src/hooks/useAuth";
import CustomerForm, {
  RefProperties,
} from "src/modules/customers/component/CustomerForm";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

export default function CreateCustomer() {
  const formRef = useRef<RefProperties>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const toast = active ? (
    <Toast
      content={message}
      duration={1000}
      onDismiss={() => {
        setActive(false);
        if (!error) {
          navigate(CustomersRoutePaths.Index);
        }
      }}
      error={error}
    />
  ) : null;
  const { run: submit } = useJob((dataSubmit: any) => {
    return CustomerRepository.create(dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          setMessage("Create customer success");
          setActive(true);
        } else {
          setMessage("Create customer failed");
          setError(true);
          setActive(true);
        }
      }),
      catchError((error) => {
        setMessage("Create customer failed");
        setError(true);
        setActive(true);
        return of(error);
      })
    );
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.save();
  }, []);
  const handleResetForm = useCallback(() => {
    formRef.current?.reset();
  }, []);
  return (
    <>
      <Page
        title="Infor customer"
        subtitle="Create customer"
        compactTitle
        breadcrumbs={[{ onAction: () => navigate(CustomersRoutePaths.Index) }]}
        primaryAction={{
          content: "Save",
          onAction: handleSubmitForm,
        }}
        secondaryActions={[
          {
            content: "Discard",
            onAction: handleResetForm,
          },
        ]}
        fullWidth
      >
        <CustomerForm
          ref={formRef}
          initialValues={{ storeId: auth.user ? auth.user : "hihi" }}
          submit={submit}
        />
      </Page>
      {toast}
    </>
  );
}
