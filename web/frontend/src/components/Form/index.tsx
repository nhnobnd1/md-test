import { Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import FormItem from "src/components/Form/Item";
import FormikEffect from "./FormikEffect";

export function isFunction(f: any): f is Function {
  return typeof f === "function";
}

export interface FormProps<Values = any> extends FormikConfig<Values> {
  onValuesChange?: (values: Values, oldValues: Values) => void;
  children?:
    | ((props: FormikProps<Values>) => React.ReactNode)
    | React.ReactNode;
  formDefaultProps?: Omit<HTMLAttributes<HTMLFormElement>, "onSubmit">;
}

export interface RefProperties {
  form: FormikProps<any>;
}

function Form<Values extends FormikValues = any>(
  { onValuesChange, formDefaultProps, ...props }: FormProps<Values>,
  ref: ForwardedRef<any>
) {
  const formRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(
    ref,
    () => ({
      form: formRef.current,
    }),
    [formRef.current]
  );

  const handleFormValuesChange = useCallback(
    (newValues: Values, oldValues: Values) => {
      onValuesChange && onValuesChange(newValues, oldValues);
    },
    [onValuesChange]
  );

  return (
    <Formik innerRef={formRef} {...props}>
      {isFunction(props.children)
        ? (formikProps: FormikProps<Values>) => (
            <>
              <FormikEffect onChange={handleFormValuesChange} />
              {isFunction(props.children) && props.children(formikProps)}
            </>
          )
        : ({ handleSubmit }) => (
            <form className="" onSubmit={handleSubmit} {...formDefaultProps}>
              <FormikEffect onChange={handleFormValuesChange} />
              {props.children}
            </form>
          )}
    </Formik>
  );
}

export default forwardRef(Form);

Form.Item = FormItem;
