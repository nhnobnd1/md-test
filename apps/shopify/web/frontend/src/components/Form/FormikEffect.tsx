import { useDidUpdate, usePrevious } from "@moose-desk/core";
import { useFormikContext } from "formik";

interface FormikEffectProps<Values> {
  onChange: (values: Values, oldValues: Values) => void;
}

function FormikEffect<Values>({ onChange }: FormikEffectProps<Values>) {
  const { values } = useFormikContext<Values>();
  const oldValues = usePrevious(values);

  useDidUpdate(() => {
    if (oldValues) {
      onChange(values, oldValues);
    }
  }, [values]);

  return <></>;
}

export default FormikEffect;
