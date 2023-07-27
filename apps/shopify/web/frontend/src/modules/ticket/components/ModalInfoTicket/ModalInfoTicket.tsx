import { priorityOptions, statusOptions } from "@moose-desk/repo";
import {
  Button,
  FormLayout,
  Modal,
  Select,
  TextContainer,
} from "@shopify/polaris";
import { FormikValues } from "formik";
import { FC, useCallback, useState } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import SelectAddTag from "src/components/SelectAddTag/SelectAddTag";
import InfoIcon from "~icons/material-symbols/info";

interface ModalInfoTicketProps {
  formRef: any;
  initialValues: any;
  agentsOptions: any;
  tagsOptions: any;
  handleSaveTicket: any;
}

export const ModalInfoTicket: FC<ModalInfoTicketProps> = ({
  formRef,
  initialValues,
  agentsOptions,
  tagsOptions,
  handleSaveTicket,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const handleSubmitValue = (values: FormikValues) => {
    setActive(false);
  };
  const activator = (
    <Button
      onClick={() => {
        setActive(true);
      }}
      icon={<InfoIcon style={{ fontSize: 16 }} />}
    ></Button>
  );
  return (
    <>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title=""
        primaryAction={{
          content: "Save",
          onAction: () => {
            handleSaveTicket(true);
            setActive(false);
          },
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              setActive(false);
            },
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <Form
              initialValues={initialValues}
              ref={formRef}
              // enableReinitialize
              onSubmit={handleSubmitValue}
            >
              <FormLayout>
                <FormItem name="status">
                  <Select label="Status" options={statusOptions} />
                </FormItem>

                <FormItem name="priority">
                  <Select label="Priority" options={priorityOptions} />
                </FormItem>
                <FormItem name="assignee">
                  <BoxSelectFilter
                    label="Assignee"
                    data={agentsOptions}
                    placeholder="Search agents"
                  />
                </FormItem>
                <FormItem name="tags">
                  <SelectAddTag
                    label="Tags"
                    data={tagsOptions}
                    placeholder="Add Tags"
                  />
                </FormItem>
              </FormLayout>
            </Form>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
};
