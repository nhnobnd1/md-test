import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useToast } from "@shopify/app-bridge-react";
import { Modal, Tabs } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import useAuth from "src/hooks/useAuth";
import { createCustomer, updateCustomer } from "src/modules/customers/api/api";
import CustomerForm from "src/modules/customers/component/CustomerForm";
import { ListTicketCustomer } from "src/modules/customers/component/ListTicketCustomer";
import styles from "../styles.module.scss";
interface IModal {
  visible: boolean;
  onClose: () => void;
  title: string;
  // primaryButtonAction: () => void;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  secondaryButtonAction: () => void;
  // children: ReactNode;
  customerData: any;
}
export const CustomModal = ({
  visible,
  onClose,
  title,
  // primaryButtonAction,
  primaryButtonLabel,
  secondaryButtonLabel,
  secondaryButtonAction,
  customerData,
}: // children,
IModal) => {
  const formRef = useRef<FormikProps<any>>(null);
  const queryClient = useQueryClient();
  const auth = useAuth();
  const { show } = useToast();
  const { t } = useTranslation();
  const [selectedTabs, setSelectedTabs] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTabs(selectedTabIndex),
    []
  );
  const initialValuesForm = useMemo(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      storeId: auth.user?.id ?? "",
    };
  }, [auth.user]);
  const { mutate: createCustomerMutate, isLoading: isCreating } = useMutation({
    mutationFn: (payload: any) => createCustomer(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY.LIST_CUSTOMER);
      //   await refetchListCustomer();
      onClose();
      show(t("messages:success.create_customer"));
      // onCancel && onCancel();
    },
    onError: () => {
      // if (error.response.status === 409) {
      //   setMessageError(`Email is ${dataSubmit.email} already exists.`);
      //   show(`Email is ${dataSubmit.email} already exists.`, {
      //     isError: true,
      //   });
      // } else {
      show(t("messages:error.create_customer"), {
        isError: true,
      });
      // }
    },
  });
  const { mutate: updateCustomerMutate, isLoading: isUpdating } = useMutation({
    mutationFn: (payload: any) =>
      updateCustomer(customerData?._id || "", payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY.LIST_CUSTOMER);
      onClose();
      show(t("messages:success.update_customer"));
    },
    onError: () => {
      show(t("messages:error.update_customer"), {
        isError: true,
      });
    },
  });
  useEffect(() => {
    if (!visible) {
      queryClient.removeQueries(QUERY_KEY.LIST_TICKET_CUSTOMER);
      setSelectedTabs(0);
    }
  }, [visible]);
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
    // createCustomerMutate(value);
  }, [formRef.current]);
  const profileCustomer = (
    <div className={styles.wrapTab}>
      <CustomerForm
        ref={formRef}
        initialValues={customerData || initialValuesForm}
        submit={updateCustomerMutate}
        // change={updateForm}
      />
    </div>
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
      value: (
        <div className={styles.wrapTab}>
          <ListTicketCustomer customerId={customerData?._id || ""} />
        </div>
      ),
      panelID: "list-ticket-of-customer",
    },
  ];
  return (
    <Modal
      open={visible}
      onClose={onClose}
      title={title}
      // large={selectedTabs === 1}
      primaryAction={{
        content: primaryButtonLabel,
        onAction: handleSubmitForm,
        loading: isUpdating || isCreating,
      }}
      secondaryActions={[
        {
          content: secondaryButtonLabel,
          onAction: secondaryButtonAction,
        },
      ]}
    >
      {/* <Modal.Section> */}
      {!customerData?._id ? (
        <div className={styles.wrapTab}>
          <CustomerForm
            ref={formRef}
            submit={createCustomerMutate}
            initialValues={initialValuesForm}
          />
        </div>
      ) : (
        <Tabs tabs={tabs} selected={selectedTabs} onSelect={handleTabChange}>
          {tabs[selectedTabs].value}
        </Tabs>
      )}
      {/* </Modal.Section> */}
    </Modal>
  );
};
