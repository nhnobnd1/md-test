import { AutoReply } from "@moose-desk/repo";
import { FormLayout, Modal, ModalProps, TextField } from "@shopify/polaris";
import { FormikProps, FormikValues } from "formik";
import { memo, useCallback, useRef } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { RichText } from "src/components/RichText";
import { object, string } from "yup";

interface ModalAutoReplyProps extends ModalProps {
  dataForm?: {
    value: AutoReply;
    index: number;
  };
  open: boolean;
  onChange?: (value?: AutoReply, isDetais?: boolean) => void;
}

const ModalAutoReply = ({
  dataForm,
  onChange,
  open,
  ...props
}: ModalAutoReplyProps) => {
  const formRef = useRef<FormikProps<any>>(null);
  const day = new Date();
  const handleSubmitValue = useCallback(
    (values: FormikValues) => {
      onChange &&
        onChange(
          {
            name: values.name,
            code: values.code || self.crypto.randomUUID(),
            content: values.content,
            createAt: values.createAt || day,
          },
          dataForm?.value ? true : undefined
        );
      props.onClose && props.onClose();
    },
    [dataForm?.value]
  );
  // handle Validate regex
  const validateObject = object().shape({
    name: string().required("Required!"),
    content: string().required("Required!"),
  });
  return (
    <Modal
      {...props}
      large
      open={open}
      primaryAction={{
        content: "Save",
        onAction: () => formRef.current?.submitForm(),
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => props.onClose(),
        },
      ]}
      onClose={() => props.onClose()}
    >
      <div style={{ height: "500px" }}>
        <Modal.Section>
          <Form
            initialValues={
              dataForm?.value || {
                name: "",
                content: "",
              }
            }
            ref={formRef}
            validationSchema={validateObject}
            enableReinitialize
            onSubmit={handleSubmitValue}
          >
            <FormLayout>
              <FormItem name="name">
                <TextField
                  autoComplete="off"
                  placeholder="Enter name auto-reply"
                  label="Name"
                />
              </FormItem>
              <FormItem name="code"></FormItem>
              <FormItem name="createAt"></FormItem>
              <FormItem name="content">
                <RichText
                  labelProps={{
                    as: "span",
                    variant: "bodyMd",
                    children: "Content",
                  }}
                  init={{
                    toolbar:
                      "undo redo blocks fontfamily fontsize bold italic underline strikethrough link image media table mergetags addcomment showcomments spellcheckdialog a11ycheck typography align lineheight | selectTypeAutoReply",
                    setup: function (editor) {
                      /* Helper functions */
                      const toDateHtml = (date: string) => {
                        return date;
                      };
                      editor.ui.registry.addMenuButton("selectTypeAutoReply", {
                        text: "Holiday name",
                        fetch: (callback: any) => {
                          const items = [
                            {
                              type: "menuitem",
                              text: "Holiday Date",
                              onAction: () => {
                                editor.insertContent(
                                  toDateHtml("{{holiday.date}}")
                                );
                              },
                            },
                            {
                              type: "menuitem",
                              text: "Business Hours",
                              onAction: () => {
                                editor.insertContent(
                                  toDateHtml("{{businesscalendar.hours}}")
                                );
                              },
                            },
                            {
                              type: "menuitem",
                              text: "Business Date",
                              onAction: () => {
                                editor.insertContent(
                                  toDateHtml("{{businesscalendar.date}}")
                                );
                              },
                            },
                          ];
                          callback(items);
                        },
                      });
                    },
                  }}
                />
              </FormItem>
            </FormLayout>
          </Form>
        </Modal.Section>
      </div>
    </Modal>
  );
};

export default memo(ModalAutoReply);