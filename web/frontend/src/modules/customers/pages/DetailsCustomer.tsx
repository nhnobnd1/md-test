import { useNavigate } from "@shopify/app-bridge-react";
import { Card, Page, Tabs, Toast } from "@shopify/polaris";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import { useJob } from "src/core/hooks";
import CustomerForm, {
  RefProperties,
} from "src/modules/customers/component/CustomerForm";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

export default function DetailsCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<RefProperties>(null);

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

  const { run: submit } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return CustomerRepository.update(_id, dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          setMessage("Edit customer success");
          setActive(true);
        } else {
          setMessage("Edit customer failed");
          setError(true);
          setActive(true);
        }
      }),
      catchError((error) => {
        setMessage("Edit customer failed");
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
  const profileCustomer = (
    <CustomerForm ref={formRef} initialValues={result} submit={submit} />
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
  useEffect(() => {
    fetDetailsCustomer();
  }, []);
  return (
    <>
      <Page
        title="Infor customer"
        subtitle="Details infor customer"
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
        <Card sectioned>
          <Tabs tabs={tabs} selected={selectedTabs} onSelect={handleTabChange}>
            <Card.Section title={tabs[selectedTabs].content}>
              {tabs[selectedTabs].value}
            </Card.Section>
          </Tabs>
        </Card>
      </Page>
      {toast}
    </>
  );
}
