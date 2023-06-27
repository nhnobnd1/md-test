import { Col, Input, Row } from "antd";
import Form, { FormProps } from "src/components/UI/Form/Form";
import InputPhone from "src/components/UI/InputPhone/InputPhone";
import { CustomerRequestData } from "src/modules/customer/helper/interface";

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
    <Form {...props} layout="vertical" initialValues={data}>
      <Row gutter={16} justify="space-between">
        <Col span={12}>
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
            <Input disabled={disabled} placeholder="Enter first name" />
          </Form.Item>
        </Col>
        <Col span={12}>
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
            <Input disabled={disabled} placeholder="Enter last name" />
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
        <Input disabled={disabled} placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phoneNumber"
        rules={[
          {
            pattern: /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/,
            message: "The input phone number is not valid",
          },
        ]}
      >
        <InputPhone placeholder="Enter phone number" />
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
