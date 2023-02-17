import { useJob } from "@moose-desk/core";
import { Tag, TagRepository } from "@moose-desk/repo";
import { Button, Modal, ModalProps, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/UI/Form/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import TagForm, { TagFormValues } from "src/modules/setting/component/TagForm";
import { useStore } from "src/providers/StoreProviders";

interface PopupTagProps extends Omit<ModalProps, "onCancel"> {
  dataForm?: Tag;
  onChange?: () => void;
  onCancel?: () => void;
}

export const PopupTag = ({
  dataForm,
  onChange,
  onCancel,
  ...props
}: PopupTagProps) => {
  const [form] = Form.useForm();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();
  const [isUpdate, setIsUpdate] = useState(false);

  const { run: createTag } = useJob(
    (dataSubmit: any) => {
      message.loading.show("Creating Tag!");
      return TagRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              onChange && onChange();
              notification.success("Tag has been create succcesfully.");
            } else {
              if (data.statusCode === 409) {
                notification.error(
                  `Tag name is ${dataSubmit.name} already exists.`
                );
              }
            }
          }),
          catchError((err) => {
            message.loading.hide();
            const errorCode = err.response.status;
            if (errorCode === 409) {
              notification.error(
                `Tag name is ${dataSubmit.name} already exists.`
              );
            } else {
              notification.error("Tag has been created failed.");
            }
            return of(err);
          })
        );
    },
    { showLoading: false }
  );

  const { run: updateTag } = useJob(
    (dataSubmit: any) => {
      message.loading.show("Updating Tag");
      return TagRepository()
        .update(dataSubmit._id, dataSubmit)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                onChange && onChange();
                message.loading.hide();
                notification.success("Tag has been update succcesfully");
              } else {
                message.loading.hide();
                if (data.statusCode === 409) {
                  notification.error(
                    `Tag name is ${dataSubmit.name} already exists.`
                  );
                }
              }
            },
            catchError((err) => {
              message.loading.hide();
              const errorCode = err.response.status;
              if (errorCode === 409) {
                notification.error(
                  `Tag name is ${dataSubmit.email} already exists.`
                );
              } else {
                notification.error("Tag has been update failed.");
              }
              return of(err);
            })
          )
        );
    },
    { showLoading: false }
  );
  const handleSubmitValue = useCallback(
    (values: TagFormValues) => {
      if (isUpdate) {
        // update
        updateTag(values);
      } else {
        // create
        createTag({
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
          <Button onClick={() => onCancel && onCancel()}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </Space>
      }
      width={1000}
    >
      <div>
        <Header
          title={dataForm?._id ? `${dataForm.name}` : "New tag profile"}
        ></Header>
        <TagForm
          initialValues={dataForm}
          enableLoadForm
          enableReinitialize
          form={form}
          onFinish={handleSubmitValue}
        />
      </div>
    </Modal>
  );
};

export default PopupTag;
