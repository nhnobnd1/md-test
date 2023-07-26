import { useDidUpdate, useMount } from "@moose-desk/core";
import { Form as AntForm, FormProps as AntFormProps } from "antd";
import { useCallback, useRef, useState } from "react";
import { Loading } from "src/components/Loading";
import "./Form.scss";

export interface FormProps extends AntFormProps {
  enableReinitialize?: boolean;
  enableLoadForm?: boolean;
  durationInit?: number;
}

export const Form = ({
  enableReinitialize = false,
  enableLoadForm = false,
  durationInit = 200,
  ...props
}: FormProps) => {
  const [form] = AntForm.useForm(props.form);
  const isFirst = useRef(true);
  const [loadForm, setLoadForm] = useState(false);

  const resetFormInit = useCallback(() => {
    if (isFirst.current) {
      setLoadForm(true);
    }
    setTimeout(() => {
      form.resetFields();
      setLoadForm(false);
      isFirst.current = false;
    }, durationInit);
  }, [form, durationInit]);

  useMount(() => {
    if (enableReinitialize) {
      resetFormInit();
    }
  });

  useDidUpdate(() => {
    if (enableReinitialize) {
      resetFormInit();
    }
  }, [props.initialValues]);

  return (
    <div className={`Form ${enableLoadForm ? "min-h-[250px]" : ""}`}>
      {loadForm && enableLoadForm ? (
        <Loading insteadView spinning={true} />
      ) : (
        <AntForm {...(props as any)} form={form} scrollToFirstError={true} />
      )}
    </div>
  );
};

Form.Item = AntForm.Item;
Form.List = AntForm.List;
Form.Provider = AntForm.Provider;
Form.ErrorList = AntForm.ErrorList;
Form.useForm = AntForm.useForm;

export default Form;
