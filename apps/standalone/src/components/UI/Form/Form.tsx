import { useDidUpdate } from "@moose-desk/core";
import { Form as AntForm, FormProps as AntFormProps } from "antd";

export interface FormProps extends AntFormProps {
  enableReinitialize?: boolean;
}

const Form = ({ enableReinitialize, ...props }: FormProps) => {
  const [form] = AntForm.useForm(props.form);

  useDidUpdate(() => {
    if (enableReinitialize) {
      setTimeout(() => {
        form.resetFields();
      }, 200);
    }
  }, [props.initialValues]);

  return <AntForm {...(props as any)} form={form} />;
};

Form.Item = AntForm.Item;
Form.List = AntForm.List;
Form.Provider = AntForm.Provider;
Form.ErrorList = AntForm.ErrorList;
Form.useForm = AntForm.useForm;

export default Form;
