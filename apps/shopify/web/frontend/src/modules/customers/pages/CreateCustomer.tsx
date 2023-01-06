import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import { CustomerRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Card,
  ContextualSaveBar,
  Layout,
  Page,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import useAuth from "src/hooks/useAuth";
import CustomerForm from "src/modules/customers/component/CustomerForm";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

export default function CreateCustomer() {
  const formRef = useRef<FormikProps<any>>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();
  const [disable, setDisable] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [banner, setBanner] = useState(false);

  const initialValuesForm = useMemo(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      storeId: auth.user?.id ?? "",
    };
  }, [auth.user]);

  const navigateShowDetails = useCallback((id: string, statusCode: number) => {
    navigate(generatePath(CustomersRoutePaths.Details, { id }), {
      state: { status: statusCode },
    });
  }, []);
  const { run: submit } = useJob((dataSubmit: any) => {
    return CustomerRepository()
      .create(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show("Customer Profile has been created successfully.");
            navigateShowDetails(data.data._id, data.statusCode);
          } else {
            if (data.statusCode === 409) {
              setMessageError(`Email is ${dataSubmit.email} already exists.`);
              show(`Email is ${dataSubmit.email} already exists.`, {
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
            setMessageError(`Email is ${dataSubmit.email} already exists.`);
            show(`Email is ${dataSubmit.email} already exists.`, {
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
    formRef.current?.submitForm();
  }, [formRef.current]);

  const handleResetForm = useCallback(() => {
    formRef.current?.resetForm();
  }, [formRef.current]);

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
                initialValues={initialValuesForm}
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
