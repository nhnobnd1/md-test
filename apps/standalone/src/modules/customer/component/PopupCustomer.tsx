import { Customer } from "@moose-desk/repo";
import { ModalProps, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";

import { MDButton } from "src/components/UI/Button/MDButton";
import Form from "src/components/UI/Form/Form";
import { Header } from "src/components/UI/Header";
import { MDModal } from "src/components/UI/Modal/MDModal";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { createCustomer, updateCustomer } from "src/modules/customer/api/api";
import CustomerForm from "src/modules/customer/component/CustomerForm";
import { ListTicketCustomer } from "src/modules/customer/component/ListTicketCustomer";
import { QUERY_KEY } from "src/modules/customer/helper/constant";
import { useStore } from "src/providers/StoreProviders";
import styles from "./styles.module.scss";
interface PopupCustomerProps extends Omit<ModalProps, "onCancel"> {
  dataForm?: Customer;
  onCancel?: () => void;
  querySearchCustomer?: string | undefined | null;
}

export const PopupCustomer = ({
  dataForm,
  onCancel,
  querySearchCustomer = "",
  ...props
}: PopupCustomerProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState("1");
  const { mutate: createCustomerMutate, isLoading: isCreating } = useMutation({
    mutationFn: (payload: any) => createCustomer(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY.LIST_CUSTOMER);
      await queryClient.invalidateQueries("getCustomers");

      form.resetFields();
      onCancel && onCancel();
      message.loading.hide();
      notification.success(t("messages:success.create_customer"));
    },
    onError: () => {
      notification.error(t("messages:error.create_customer"));
    },
  });
  const { mutate: updateCustomerMutate, isLoading: isUpdating } = useMutation({
    mutationFn: (payload: any) => updateCustomer(dataForm?._id || "", payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY.LIST_CUSTOMER);
      onCancel && onCancel();
      message.loading.hide();
      notification.success(t("messages:success.update_customer"));
    },
    onError: () => {
      notification.error(t("messages:error.update_customer"));
    },
  });
  useEffect(() => {
    if (querySearchCustomer && dataForm?._id && props.open) setActiveKey("2");
  }, [querySearchCustomer, dataForm?._id, props.open]);
  useEffect(() => {
    if (querySearchCustomer && !props.open) {
      setActiveKey("1");
    }
  }, [props.open]);

  const handleSubmitValue = useCallback(
    (values: any) => {
      if (dataForm?._id) {
        // update
        const {
          honorific = "",
          firstName,
          lastName,
          email,
          phoneNumber,
        } = values;
        updateCustomerMutate({
          honorific,
          firstName,
          lastName,
          email,
          phoneNumber,
          storeId: dataForm?.storeId,
        });
      } else {
        // create
        createCustomerMutate({
          ...values,
          storeId,
        });
      }
    },
    [dataForm?._id]
  );
  const handleSubmit = () => form.submit();
  const _renderTitleModal = () => {
    return dataForm?._id
      ? `${dataForm.firstName} ${dataForm.lastName}`
      : "New customer";
  };
  const _renderContentModal = () => {
    return dataForm?._id ? (
      <Tabs
        activeKey={activeKey}
        onChange={(key: string) => setActiveKey(key)}
        items={[
          {
            key: "1",
            label: t("common:customers.profile"),
            children: (
              <CustomerForm
                enableLoadForm
                enableReinitialize
                data={dataForm}
                form={form}
                onFinish={handleSubmitValue}
              />
            ),
          },
          {
            key: "2",
            label: t("common:customers.ticket_list"),
            children: <ListTicketCustomer customerId={dataForm?._id || ""} />,
          },
        ]}
      />
    ) : (
      <CustomerForm
        enableLoadForm
        enableReinitialize
        form={form}
        onFinish={handleSubmitValue}
      />
    );
  };
  const handleCloseModal = () => {
    onCancel && onCancel();
    setActiveKey("1");
  };
  return (
    <MDModal
      className={styles.modalCustomer}
      {...props}
      onCancel={handleCloseModal}
      onClose={handleCloseModal}
      footer={
        <div className={styles.modalFooter}>
          <MDButton onClick={handleCloseModal}>Cancel</MDButton>
          <MDButton
            type="primary"
            onClick={handleSubmit}
            loading={isUpdating || isCreating}
          >
            Save
          </MDButton>
        </div>
      }
    >
      <div>
        <div className={styles.modalTitle}>
          <Header subTitle={_renderTitleModal()}></Header>
        </div>
        <div className={styles.modalContent}>{_renderContentModal()}</div>
      </div>
    </MDModal>
  );
};

export default React.memo(PopupCustomer);
