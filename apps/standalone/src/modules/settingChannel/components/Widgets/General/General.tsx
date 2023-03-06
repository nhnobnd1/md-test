import { Card, Col, Divider, Form, Input, Row, Switch } from "antd";
import { useState } from "react";
import { UIWidget } from "src/modules/settingChannel/components/Widgets/UIWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";

export default function General() {
  const [form] = Form.useForm();
  const data = useWidgetSetting((state) => state.widgetSetting);
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );
  const [allowCaptcha, setAllowCaptcha] = useState(data.allowCaptcha);
  const [allowAttach, setAllowAttach] = useState(data.allowAttach);
  const [loading, setLoading] = useState(data.isFormContact);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeToggle = (checked: boolean) => {
    setLoading(checked);
    updateWidgetSetting({
      ...data,
      isFormContact: checked,
    });
  };
  const onChangeToggleCaptcha = (checked: boolean) => {
    setAllowCaptcha(checked);
    updateWidgetSetting({
      ...data,
      allowCaptcha: checked,
    });
  };
  const onChangeToggleAttach = (checked: boolean) => {
    setAllowAttach(checked);
    updateWidgetSetting({
      ...data,
      allowAttach: checked,
    });
  };
  return (
    <>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 20, position: "relative" }}
        initialValues={{
          title: data.titleText,
          header: data.widgetHeader,
          form_title: data.formTitle,
          button_text: data.buttonText,
          confirm_message: data.confirmMessage,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        autoComplete="off"
      >
        <Row gutter={16} justify="space-between" align="bottom">
          <Col span={12}>
            <Form.Item label="Title Text: " name="title">
              <Input
                onChange={(e) => {
                  updateWidgetSetting({ ...data, titleText: e.target.value });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} justify="space-between" align="bottom">
          <Col span={12}>
            <Form.Item label="Widget Header: " name="header">
              <Input
                onChange={(e) => {
                  updateWidgetSetting({
                    ...data,
                    widgetHeader: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <Card
            style={{
              maxWidth: 500,
              marginTop: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Contact Form</h2>
              <Switch checked={loading} onChange={onChangeToggle} />
            </div>
            <Divider />
            <div style={{ display: loading ? "block" : "none" }}>
              <Row gutter={20} justify="space-between" align="bottom">
                <Col span={24}>
                  <Form.Item label="Form Title: " name="form_title">
                    <Input
                      onChange={(e) => {
                        updateWidgetSetting({
                          ...data,
                          formTitle: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20} justify="space-between" align="bottom">
                <Col span={24}>
                  <Form.Item label="Button text: " name="button_text">
                    <Input
                      onChange={(e) => {
                        updateWidgetSetting({
                          ...data,
                          buttonText: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20} justify="space-between" align="bottom">
                <Col span={24}>
                  <Form.Item label="Confirm Message: " name="confirm_message">
                    <Input
                      onChange={(e) => {
                        updateWidgetSetting({
                          ...data,
                          confirmMessage: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20} justify="space-between" align="bottom">
                <Col span={24}>
                  <Form.Item label="Allow Attachments " name="allow_attach">
                    <Switch
                      checked={allowAttach}
                      onChange={onChangeToggleAttach}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20} justify="space-between" align="bottom">
                <Col span={24}>
                  <Form.Item
                    label="Enable captcha verification "
                    name="allow_captcha"
                  >
                    <Switch
                      checked={allowCaptcha}
                      onChange={onChangeToggleCaptcha}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Card>
        </div>
        <UIWidget />
      </Form>
    </>
  );
}
