import { useJob } from "@moose-desk/core";
import { Customer, CustomerRepository } from "@moose-desk/repo";
import { Button, Card, Modal, ModalProps, Space, Tabs } from "antd";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/UI/Form/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import CustomerForm, {
  CustomerFormValues,
} from "src/modules/customer/component/CustomerForm";
import { ListTicketCustomer } from "src/modules/customer/component/ListTicketCustomer";
import { useStore } from "src/providers/StoreProviders";

interface PopupCustomerProps extends Omit<ModalProps, "onCancel"> {
  dataForm?: Customer;
  onChange?: () => void;
  onCancel?: () => void;
}

export const PopupCustomer = ({
  dataForm,
  onChange,
  onCancel,
  ...props
}: PopupCustomerProps) => {
  const [form] = Form.useForm();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const { run: createCustomer } = useJob(
    (dataSubmit: any) => {
      message.loading.show("Creating Customer!");
      return CustomerRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              onChange && onChange();
              notification.success(
                "Customer Profile has been created succcesfully."
              );
            } else {
              if (data.statusCode === 409) {
                notification.error(
                  `Email is ${dataSubmit.email} already exists.`
                );
              }
            }
          }),
          catchError((err) => {
            message.loading.hide();
            const errorCode = err.response.status;
            if (errorCode === 409) {
              notification.error(
                `Email is ${dataSubmit.email} already exists.`
              );
            } else {
              notification.error("Customer Profile has been created failed.");
            }
            return of(err);
          })
        );
    },
    { showLoading: false }
  );

  const { run: updateCustomer } = useJob(
    (dataSubmit: any) => {
      message.loading.show("Updating Customer");
      return CustomerRepository()
        .update(dataSubmit._id, dataSubmit)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                onChange && onChange();
                message.loading.hide();
                notification.success(
                  "Customer Profile has been updated succcesfully."
                );
              } else {
                message.loading.hide();
                if (data.statusCode === 409) {
                  notification.error(
                    `Email is ${dataSubmit.email} already exists.`
                  );
                }
              }
            },
            catchError((err) => {
              message.loading.hide();
              const errorCode = err.response.status;
              if (errorCode === 409) {
                notification.error(
                  `Email is ${dataSubmit.email} already exists.`
                );
              } else {
                notification.error("Customer Profile has been updated failed.");
              }
              return of(err);
            })
          )
        );
    },
    { showLoading: false }
  );
  const handleSubmitValue = useCallback(
    (values: CustomerFormValues) => {
      if (isUpdate) {
        // update
        updateCustomer(values);
      } else {
        // create
        createCustomer({
          ...values,
          storeId,
        });
      }
    },
    [isUpdate]
  );

  useEffect(() => {
    setIsUpdate(!!dataForm?._id);
  }, [dataForm]);
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
        <Header
          title={
            dataForm?._id
              ? `${dataForm.firstName} ${dataForm.lastName}`
              : "New customer profile"
          }
        ></Header>
        {dataForm?.id ? (
          <Card>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: `Customer profile`,
                  children: (
                    <CustomerForm
                      initialValues={dataForm}
                      enableLoadForm
                      enableReinitialize
                      form={form}
                      onFinish={handleSubmitValue}
                    />
                  ),
                },
                {
                  key: "2",
                  label: `List ticket`,
                  children: (
                    <ListTicketCustomer customerId={dataForm?._id || ""} />
                  ),
                },
              ]}
              onChange={handleTabChange}
            />
          </Card>
        ) : (
          <CustomerForm
            initialValues={dataForm}
            enableLoadForm
            enableReinitialize
            form={form}
            onFinish={handleSubmitValue}
          />
        )}
      </div>
    </Modal>
  );
};

export default PopupCustomer;
