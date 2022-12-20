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
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import { useJob, useMount } from "src/core/hooks";
import CustomerForm, {
  RefProperties,
} from "src/modules/customers/component/CustomerForm";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

export default function DetailsCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const formRef = useRef<RefProperties>(null);
  const [disable, setDisable] = useState(true);
  const [banner, setBanner] = useState<{
    isShow: boolean;
    message: string;
    type: BannerStatus;
    title: string;
  }>({
    isShow: false,
    message: "",
    type: "success",
    title: "",
  });
  const { show } = useToast();
  const { run: fetDetailsCustomer, result } = useJob(
    () => {
      return CustomerRepository.getOne(id).pipe(
        map(({ data }) => {
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
          setBanner({
            isShow: true,
            message: "Edit customer success",
            type: "success",
            title: "Edit customer is successful",
          });
          show("Edit customer success");
        } else {
          setBanner({
            message: "Edit customer is success",
            isShow: true,
            type: "critical",
            title: "There is an error with this customer initialization",
          });
          show("Edit customer failed", {
            isError: true,
          });
        }
      }),
      catchError((error) => {
        setBanner({
          isShow: true,
          message: error.response.data.error[0],
          type: "critical",
          title: "There is an error with this customer initialization",
        });
        show("Edit customer failed", {
          isError: true,
        });
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
      accessibilityLabel: "Customer profile",
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
        message: "Create customer is success",
        type: "success",
        title: "Create customer is successful",
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
          disabled: disable,
        }}
        discardAction={{
          onAction: handleResetForm,
        }}
      />
      <Page
        title={`${result?.firstName} ${result?.lastName}`}
        subtitle="Details info customer"
        compactTitle
        breadcrumbs={[{ onAction: () => navigate(CustomersRoutePaths.Index) }]}
        fullWidth
      >
        <Layout sectioned>
          <Layout.Section>
            {banner.isShow ? (
              <Banner
                title={banner.title}
                status={banner.type}
                onDismiss={() => setBanner({ ...banner, isShow: false })}
              ></Banner>
            ) : null}
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Tabs
                tabs={tabs}
                selected={selectedTabs}
                onSelect={handleTabChange}
              >
                <Card.Section title={tabs[selectedTabs].content}>
                  {tabs[selectedTabs].value}
                </Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
