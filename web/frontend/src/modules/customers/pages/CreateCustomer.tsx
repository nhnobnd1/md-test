import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  ContextualSaveBar,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
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
  const { show } = useToast();
  const [disable, setDisable] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [banner, setBanner] = useState(false);
  const navigateShowDetails = useCallback((id: string, statusCode: number) => {
    navigate(generatePath(CustomersRoutePaths.Details, { id }), {
      state: { status: statusCode },
    });
  }, []);
  const { run: submit } = useJob((dataSubmit: any) => {
    return CustomerRepository.create(dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          show("Create customer success");
          navigateShowDetails(data.data._id, data.statusCode);
        } else {
          setBanner(true);
          show("Create customer failed", {
            isError: true,
          });
        }
      }),
      catchError((error) => {
        setMessageError(error.response.data.error[0]);
        setBanner(true);
        show("Create customer failed", {
          isError: true,
        });
        return of(error);
      })
    );
  });
  const handleChangeValueForm = (value: boolean) => {
    setDisable(value);
  };
  const handleSubmitForm = useCallback(() => {
    formRef.current?.save();
  }, []);
  const handleResetForm = useCallback(() => {
    formRef.current?.reset();
  }, []);

  return (
    <>
      <ContextualSaveBar
        fullWidth
        message="Unsaved changes"
        saveAction={{
          onAction: handleSubmitForm,
          disabled: disable,
        }}
        discardAction={{
          onAction: handleResetForm,
        }}
      />
      <Page
        title="Create customer"
        subtitle="Profile customer"
        compactTitle
        breadcrumbs={[{ onAction: () => navigate(CustomersRoutePaths.Index) }]}
        fullWidth
      >
        <Layout sectioned>
          <Layout.Section>
            {banner ? (
              <Banner
                title="There is an error with this customer initialization"
                status="critical"
                onDismiss={() => setBanner(false)}
              >
                <Text variant="bodyMd" as="p" color="subdued">
                  {messageError}
                </Text>
              </Banner>
            ) : null}
          </Layout.Section>
          <Layout.Section>
            <CustomerForm
              ref={formRef}
              initialValues={{ storeId: auth.user ? auth.user : "hihi" }}
              submit={submit}
              change={handleChangeValueForm}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
