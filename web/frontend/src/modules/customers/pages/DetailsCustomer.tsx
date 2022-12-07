import { Card, ContextualSaveBar, Page, Tabs } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { map } from "rxjs";
import { useJob } from "src/core/hooks";
import { CustomerForm } from "src/modules/customers/component/CustomerForm";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";

export default function DetailsCustomer() {
  const { id } = useParams();
  const { result } = useJob(
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
  const tabs = [
    {
      id: "customer-profile",
      content: "Customer profile",
      value: <CustomerForm dataDetails={result} />,
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
  const handleSubmit = useCallback(() => {
    console.log("submit");
  }, []);
  return (
    <Page
      title="Infor customer"
      subtitle="Detail infor customer"
      compactTitle
      fullWidth
    >
      <ContextualSaveBar
        fullWidth
        message="Unsaved changes"
        saveAction={{
          onAction: () => console.log("add form submit logic"),
          loading: false,
          disabled: false,
        }}
        discardAction={{
          onAction: () => console.log("add clear form logic"),
        }}
      />
      <Card sectioned>
        <Tabs tabs={tabs} selected={selectedTabs} onSelect={handleTabChange}>
          <Card.Section title={tabs[selectedTabs].content}>
            {tabs[selectedTabs].value}
          </Card.Section>
        </Tabs>
      </Card>
    </Page>
  );
}
