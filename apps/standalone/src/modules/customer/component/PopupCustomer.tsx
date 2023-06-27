import { Customer } from "@moose-desk/repo";
import { Button, Card, Modal, ModalProps, Space, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import Form from "src/components/UI/Form/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { createCustomer, updateCustomer } from "src/modules/customer/api/api";
import CustomerForm from "src/modules/customer/component/CustomerForm";
import { ListTicketCustomer } from "src/modules/customer/component/ListTicketCustomer";
import { QUERY_KEY } from "src/modules/customer/helper/constant";
import { useStore } from "src/providers/StoreProviders";

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
        const { firstName, lastName, email, phoneNumber } = values;
        updateCustomerMutate({
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
      <Card>
        <Tabs
          activeKey={activeKey}
          onChange={(key: string) => setActiveKey(key)}
          items={[
            {
              key: "1",
              label: `Customer profile`,
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
              label: `List ticket`,
              children: <ListTicketCustomer customerId={dataForm?._id || ""} />,
            },
          ]}
        />
      </Card>
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
    <Modal
      {...props}
      destroyOnClose
      onCancel={handleCloseModal}
      footer={
        <Space>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={isUpdating || isCreating}
          >
            Save
          </Button>
        </Space>
      }
      width={686}
      style={{ minHeight: 500 }}
    >
      <div>
        <Header title={_renderTitleModal()}></Header>
        {_renderContentModal()}
      </div>
    </Modal>
  );
};

export default React.memo(PopupCustomer);
