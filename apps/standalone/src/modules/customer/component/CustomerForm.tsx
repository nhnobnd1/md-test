import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import Form, { FormProps } from "src/components/UI/Form/Form";
import { MDInput } from "src/components/UI/Input";
import InputPhone from "src/components/UI/InputPhone/InputPhone";
import { CustomerRequestData } from "src/modules/customer/helper/interface";
import styles from "./styles.module.scss";
interface CustomerFormProps extends FormProps {
  disabled?: boolean;
  data?: CustomerRequestData;
}

export const CustomerForm = ({
  disabled = false,
  data = undefined,
  ...props
}: CustomerFormProps) => {
  const { t } = useTranslation();

  return (
    <Form
      {...props}
      className={styles.formCustomer}
      layout="vertical"
      initialValues={data}
    >
      <Row gutter={16} justify="space-between">
        <Col lg={12} xl={12} sm={24} xs={24}>
          <Form.Item
            label={t("common:customers.first_name")}
            name="firstName"
            rules={[
              {
                required: true,
                message: t("common:regex.required", {
                  name: t("common:customers.first_name"),
                }),
              },
              {
                max: 255,
                message: t("common:regex.length_255", {
                  name: t("common:customers.first_name"),
                }),
              },
              // {
              //   pattern: /[^\s]/,
              //   message: "First name is required!",
              // },
            ]}
          >
            <MDInput
              disabled={disabled}
              placeholder={t("common:customers.first_name")}
            />
          </Form.Item>
        </Col>
        <Col lg={12} xl={12} sm={24} xs={24}>
          <Form.Item
            label={t("common:customers.last_name")}
            name="lastName"
            rules={[
              {
                required: true,
                message: t("common:regex.required", {
                  name: t("common:customers.last_name"),
                }),
              },
              {
                max: 255,
                message: t("common:regex.length_255", {
                  name: t("common:customers.last_name"),
                }),
              },
              // {
              //   pattern: /[^\s]/,
              //   message: "Last name is required!",
              // },
            ]}
          >
            <MDInput
              disabled={disabled}
              placeholder={t("common:customers.last_name")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={t("common:customers.email")}
        name="email"
        rules={[
          {
            required: true,
            message: t("common:regex.required", {
              name: t("common:customers.email"),
            }),
          },
          { type: "email", message: t("common:regex.email") },
        ]}
      >
        <MDInput disabled={disabled} placeholder="example@example.com" />
      </Form.Item>

      <Form.Item
        label={t("common:customers.phone_number")}
        name="phoneNumber"
        rules={[
          {
            pattern: /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/,
            message: t("common:regex.phone"),
          },
        ]}
      >
        <InputPhone placeholder={t("common:customers.phone_number")} />
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
