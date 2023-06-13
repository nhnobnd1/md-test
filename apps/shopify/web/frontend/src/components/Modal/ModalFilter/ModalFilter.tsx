import { useNavigate } from "@moose-desk/core";
import {
  Customer,
  Tag,
  priorityOptions,
  statusOptions,
} from "@moose-desk/repo";
import {
  Button,
  FormLayout,
  Icon,
  Modal,
  TextContainer,
} from "@shopify/polaris";
import { FilterMajor } from "@shopify/polaris-icons";
import { FormikProps, FormikValues } from "formik";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import BoxSelectTag from "src/components/Modal/ModalFilter/BoxSelectTag";
import { FilterObject } from "src/modules/ticket/pages/Index";
interface ModalFilterProps {
  customers: Customer[];
  tags: Tag[];
  handleApply: (values: any) => void;
  handleResetModal: () => void;
  filterObject: FilterObject | null;
}

export const ModalFilter: FC<ModalFilterProps> = ({
  customers,
  tags,
  handleResetModal,
  handleApply,
  filterObject,
}) => {
  const [active, setActive] = useState(false);
  const formRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();

  const tagsOptions = useMemo(() => {
    const optionsTag = tags.map((item: Tag) => {
      return { label: item.name, value: item.name };
    });
    return optionsTag;
  }, [tags]);
  const customerOptions = useMemo(() => {
    const customersOption = customers.map((item: Customer) => {
      return {
        label: `${item.firstName} ${item.lastName} - ${item.email}`,
        value: item.email,
      };
    });
    return customersOption;
  }, [customers]);

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
          title="FILTER"
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
                  <FormItem name="customer">
                    <BoxSelectFilter data={customerOptions} label="Customer" />
                  </FormItem>
                  <FormItem name="tags">
                    <BoxSelectTag data={tagsOptions} label="Tags" />
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
