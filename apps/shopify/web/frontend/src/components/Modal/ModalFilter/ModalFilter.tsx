import { useNavigate } from "@moose-desk/core";
import { priorityOptions, statusOptions } from "@moose-desk/repo";
import {
  Button,
  FormLayout,
  Icon,
  Modal,
  TextContainer,
} from "@shopify/polaris";
import { FilterMajor } from "@shopify/polaris-icons";
import { FormikProps, FormikValues } from "formik";
import { FC, useCallback, useRef, useState } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectAssignee from "src/components/Modal/ModalFilter/BoxSelectAssignee";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import CustomerSelect from "src/components/Modal/ModalFilter/CustomerSelect";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";
import { FilterObject } from "src/modules/ticket/pages/Index";
interface ModalFilterProps {
  handleApply: (values: any) => void;
  handleResetModal: () => void;
  filterObject?: FilterObject | null;
}

export const ModalFilter: FC<ModalFilterProps> = ({
  handleResetModal,
  handleApply,
  filterObject,
}) => {
  const [active, setActive] = useState(false);
  const formRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button
      onClick={() => {
        setActive(true);
      }}
      icon={
        <div className="flex gap-2">
          <Icon source={FilterMajor} color="base" />
        </div>
      }
    />
  );
  const handleSubmitValue = (values: FormikValues) => {
    handleApply(values);
    setActive(false);
  };
  return (
    <>
      <div>
        <Modal
          activator={activator}
          open={active}
          onClose={handleChange}
          title="Filter"
          primaryAction={{
            content: "Apply",
            onAction: () => {
              formRef.current?.submitForm();
            },
          }}
          secondaryActions={[
            {
              content: "Reset",
              onAction: () => {
                // handleChange();
                navigate(location.pathname, {});
                handleResetModal();
                formRef.current?.resetForm();
              },
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <Form
                ref={formRef}
                initialValues={
                  filterObject || {
                    customer: "",
                    tags: [],
                    priority: "",
                    status: "",
                  }
                }
                enableReinitialize
                onSubmit={handleSubmitValue}
              >
                <FormLayout>
                  <FormItem name="agentObjectId">
                    <BoxSelectAssignee
                      label="Assignee"
                      placeholder="Search agents"
                    />
                  </FormItem>
                  <FormItem name="customer">
                    <CustomerSelect label="Customer" />
                  </FormItem>
                  <FormItem name="tags">
                    <TagSelect isFilter={true} />
                  </FormItem>

                  <FormItem name="priority">
                    <BoxSelectFilter data={priorityOptions} label="Priority" />
                  </FormItem>
                  <FormItem name="status">
                    <BoxSelectFilter data={statusOptions} label="Status" />
                  </FormItem>
                </FormLayout>
              </Form>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    </>
  );
};
