import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Card,
  ContextualSaveBar,
  Layout,
  Page,
} from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import { useJob } from "src/core/hooks";
import CustomerForm, {
  RefProperties,
} from "src/modules/customers/component/CustomerForm";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

export default function CreateCustomer() {
  const formRef = useRef<RefProperties>(null);
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
          show("Customer Profile has been created successfully.");
          navigateShowDetails(data.data._id, data.statusCode);
        } else {
          if (data.statusCode === 409) {
            setMessageError(`Email is ${dataSubmit.name} already exists.`);
            show(`Email is ${dataSubmit.name} already exists.`, {
              isError: true,
            });
          } else {
            show("Create tag failed", {
              isError: true,
            });
          }
        }
      }),
      catchError((error) => {
        setBanner(true);
        if (error.response.status === 409) {
          setMessageError(`Email is ${dataSubmit.name} already exists.`);
          show(`Email is ${dataSubmit.name} already exists.`, {
            isError: true,
          });
        } else {
          show("Create tag failed", {
            isError: true,
          });
        }
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
        title="New customer profile"
        compactTitle
        breadcrumbs={[{ onAction: () => navigate(CustomersRoutePaths.Index) }]}
        fullWidth
      >
        <Card title="Customer profile" sectioned>
          <Layout>
            <Layout.Section>
              {banner ? (
                <Banner status="critical" onDismiss={() => setBanner(false)}>
                  {messageError}
                </Banner>
              ) : null}
            </Layout.Section>
            <Layout.Section>
              <CustomerForm
                ref={formRef}
                submit={submit}
                change={handleChangeValueForm}
              />
            </Layout.Section>
          </Layout>
        </Card>
      </Page>
    </>
  );
}
