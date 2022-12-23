import { useNavigate, useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  Card,
  ContextualSaveBar,
  Layout,
  Page,
  Tabs,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import { useJob, useMount } from "src/core/hooks";
import CustomerForm from "src/modules/customers/component/CustomerForm";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

export default function DetailsCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const formRef = useRef<FormikProps<any>>(null);
  const [disable, setDisable] = useState(true);
  const [banner, setBanner] = useState<{
    isShow: boolean;
    type: BannerStatus;
    message: string;
  }>({
    isShow: false,
    type: "success",
    message: "",
  });
  const { show } = useToast();
  const { run: fetDetailsCustomer, result } = useJob(
    () => {
      return CustomerRepository.getOne(id).pipe(
        map(({ data }) => {
          setTitle(`${data.data.firstName} ${data.data.lastName}`);
          return data.data;
        })
      );
    },
    { showLoading: false }
  );
  const [selectedTabs, setSelectedTabs] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTabs(selectedTabIndex),
    []
  );
  const handleChangeValueForm = (value: boolean) => {
    setDisable(value);
  };
  const { run: submit } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return CustomerRepository.update(_id, dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          setTitle(`${data.data.firstName} ${data.data.lastName}`);
          setBanner({
            isShow: true,
            type: "success",
            message: "Customer Profile has been updated succcesfully.",
          });
          show("Edit customer success");
        } else {
          if (data.statusCode === 409) {
            setBanner({
              isShow: true,
              type: "critical",
              message: `Email is ${dataSubmit.email} already exists.`,
            });
            show(`Email is ${dataSubmit.email} already exists.`, {
              isError: true,
            });
          } else {
            setBanner({
              isShow: true,
              type: "critical",
              message: "Customer Profile has been updated failed.",
            });
            show("Customer Profile has been updated failed.", {
              isError: true,
            });
          }
        }
      }),
      catchError((error) => {
        if (error.response.status === 409) {
          setBanner({
            isShow: true,
            type: "critical",
            message: `Email is ${dataSubmit.email} already exists.`,
          });
          show(`Email is ${dataSubmit.email} already exists.`, {
            isError: true,
          });
        } else {
          setBanner({
            isShow: true,
            type: "critical",
            message: "Customer Profile has been updated failed.",
          });
          show("Customer Profile has been updated failed.", {
            isError: true,
          });
        }
        return of(error);
      })
    );
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);

  const handleResetForm = useCallback(() => {
    formRef.current?.resetForm();
  }, [formRef.current]);

  const profileCustomer = (
    <CustomerForm
      ref={formRef}
      initialValues={result}
      submit={submit}
      change={handleChangeValueForm}
    />
  );
  const tabs = [
    {
      id: "customer-profile",
      content: "Customer profile",
      value: profileCustomer,
      panelID: "customer-profile",
    },
    {
      id: "list-ticket-of-customer",
      content: "List ticket",
      value: "List ticket",
      panelID: "list-ticket-of-customer",
    },
  ];
  useMount(() => {
    fetDetailsCustomer();
  });
  useEffect(() => {
    if (state ? state.status === 200 : false) {
      setBanner({
        isShow: true,
        type: "success",
        message: "Customer Profile has been created successfully.",
      });
    }
  }, []);
  return (
    <>
      <ContextualSaveBar
        fullWidth
        message="Unsaved changes"
        saveAction={{
          onAction: handleSubmitForm,
          disabled: !formRef.current?.dirty,
        }}
        discardAction={{
          onAction: handleResetForm,
        }}
      />
      <Page
        title={title}
        compactTitle
        breadcrumbs={[{ onAction: () => navigate(CustomersRoutePaths.Index) }]}
        fullWidth
      >
        <Layout sectioned>
          <Layout.Section>
            {banner.isShow ? (
              <Banner
                status={banner.type}
                onDismiss={() => setBanner({ ...banner, isShow: false })}
              >
                {banner.message}
              </Banner>
            ) : null}
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Tabs
                tabs={tabs}
                selected={selectedTabs}
                onSelect={handleTabChange}
              >
                <Card.Section>{tabs[selectedTabs].value}</Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
