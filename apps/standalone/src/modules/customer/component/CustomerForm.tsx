import { Col, Row } from "antd";
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
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "First name is required!" },
              {
                max: 255,
                message: "First name up to 255 characters",
              },
              {
                pattern: /[^\s]/,
                message: "First name is required!",
              },
            ]}
          >
            <MDInput disabled={disabled} placeholder="First name" />
          </Form.Item>
        </Col>
        <Col lg={12} xl={12} sm={24} xs={24}>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: "Last name is required!" },
              {
                max: 255,
                message: "Last name up to 255 characters",
              },
              {
                pattern: /[^\s]/,
                message: "Last name is required!",
              },
            ]}
          >
            <MDInput disabled={disabled} placeholder="Last name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email address is required!" },
          { type: "email", message: "The email address is not valid" },
        ]}
      >
        <MDInput disabled={disabled} placeholder="example@example.com" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phoneNumber"
        rules={[
          {
            pattern: /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/,
            message: "The input phone number is not valid",
          },
        ]}
      >
        <InputPhone placeholder="Phone" />
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
