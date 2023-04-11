import { Customer } from "@moose-desk/repo";
import { Button, Card, Modal, ModalProps, Space, Tabs } from "antd";
import React, { useCallback } from "react";
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
}

export const PopupCustomer = ({
  dataForm,
  // onChange,
  onCancel,
  ...props
}: PopupCustomerProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();

  const { mutate: createCustomerMutate } = useMutation({
    mutationFn: (payload: any) => createCustomer(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY.LIST_CUSTOMER);
      form.resetFields();
      onCancel && onCancel();
      message.loading.hide();
      notification.success("Customer Profile has been created successfully.");
    },
    onError: () => {
      notification.error("Customer Profile has been created failed.");
    },
  });
  const { mutate: updateCustomerMutate } = useMutation({
    mutationFn: (payload: any) => updateCustomer(dataForm?._id || "", payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY.LIST_CUSTOMER);
      onCancel && onCancel();
      message.loading.hide();
      notification.success("Customer Profile has been updated successfully.");
    },
    onError: () => {
      notification.error("Customer Profile has been updated failed.");
    },
  });
  // const { run: createCustomer } = useJob(
  //   (dataSubmit: any) => {
  //     message.loading.show("Creating Customer!");
  //     return CustomerRepository()
  //       .create(dataSubmit)
  //       .pipe(
  //         map(({ data }) => {
  //           message.loading.hide();
  //           if (data.statusCode === 200) {
  //             onChange && onChange();
  //             notification.success(
  //               "Customer Profile has been created succcesfully."
  //             );
  //           } else {
  //             if (data.statusCode === 409) {
  //               notification.error(
  //                 `Email is ${dataSubmit.email} already exists.`
  //               );
  //             }
  //           }
  //         }),
  //         catchError((err) => {
  //           message.loading.hide();
  //           const errorCode = err.response.status;
  //           if (errorCode === 409) {
  //             notification.error(
  //               `Email is ${dataSubmit.email} already exists.`
  //             );
  //           } else {
  //             notification.error("Customer Profile has been created failed.");
  //           }
  //           return of(err);
  //         })
  //       );
  //   },
  //   { showLoading: false }
  // );

  // const { run: updateCustomer } = useJob(
  //   (dataSubmit: any) => {
  //     message.loading.show("Updating Customer");
  //     return CustomerRepository()
  //       .update(dataSubmit._id, dataSubmit)
  //       .pipe(
  //         map(
  //           ({ data }) => {
  //             if (data.statusCode === 200) {
  //               onChange && onChange();
  //               message.loading.hide();
  //               notification.success(
  //                 "Customer Profile has been updated succcesfully."
  //               );
  //             } else {
  //               message.loading.hide();
  //               if (data.statusCode === 409) {
  //                 notification.error(
  //                   `Email is ${dataSubmit.email} already exists.`
  //                 );
  //               }
  //             }
  //           },
  //           catchError((err) => {
  //             message.loading.hide();
  //             const errorCode = err.response.status;
  //             if (errorCode === 409) {
  //               notification.error(
  //                 `Email is ${dataSubmit.email} already exists.`
  //               );
  //             } else {
  //               notification.error("Customer Profile has been updated failed.");
  //             }
  //             return of(err);
  //           })
  //         )
  //       );
  //   },
  //   { showLoading: false }
  // );
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
  const _renderTitleModal = () => {
    return dataForm?._id
      ? `${dataForm.firstName} ${dataForm.lastName}`
      : "New customer profile";
  };
  const _renderContentModal = () => {
    return dataForm?._id ? (
      <Card>
        <Tabs
          defaultActiveKey="1"
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
  return (
    <Modal
      {...props}
      destroyOnClose
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </Space>
      }
      width={1000}
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
