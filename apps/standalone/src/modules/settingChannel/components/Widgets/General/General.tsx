import { Card, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import { UIWidget } from "src/modules/settingChannel/components/Widgets/UIWidget";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";

export default function General({ data: dataProps }: any) {
  const [form] = Form.useForm();
  const data = useWidgetSetting((state) => state.widgetSetting);
  const initialFormValues = {
    title: data.titleText,
    header: data.widgetHeader,
    form_title: data.formTitle,
    button_text: data.buttonText,
    confirm_message: data.confirmMessage,
  };
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );
  const [allowCaptcha, setAllowCaptcha] = useState(data.allowCaptcha);
  const [allowAttach, setAllowAttach] = useState(data.allowAttach);
  const [loading, setLoading] = useState(data.isFormContact);
  const cancelState = useUpdateSave((state) => state.cancel);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeToggleCaptcha = (checked: CheckboxChangeEvent) => {
    setAllowCaptcha(checked.target.checked);
    updateWidgetSetting({
      ...data,
      allowCaptcha: checked.target.checked,
    });
  };
  const onChangeToggleAttach = (checked: CheckboxChangeEvent) => {
    setAllowAttach(checked.target.checked);
    updateWidgetSetting({
      ...data,
      allowAttach: checked.target.checked,
    });
  };
  const handleChangeTitleText = (e: ChangeEvent<HTMLInputElement>) => {
    updateWidgetSetting({
      ...data,
      titleText: e.target.value,
    });
  };
  const handleChangeFormTitle = (e: ChangeEvent<HTMLInputElement>) => {
    updateWidgetSetting({
      ...data,
      formTitle: e.target.value,
    });
  };
  const handleUpdateButton = (e: ChangeEvent<HTMLInputElement>) => {
    updateWidgetSetting({
      ...data,
      buttonText: e.target.value,
    });
  };
  const handleUpdateSetting = (e: ChangeEvent<HTMLInputElement>) => {
    updateWidgetSetting({
      ...data,
      widgetHeader: e.target.value,
    });
  };
  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    updateWidgetSetting({
      ...data,
      confirmMessage: e.target.value,
    });
  };
  useEffect(() => {
    form.resetFields();
    setAllowCaptcha(data.allowCaptcha);
    setAllowAttach(data.allowAttach);
  }, [data.id, cancelState]);

  return (
    <div style={{ position: "relative" }}>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 20 }}
        initialValues={initialFormValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        autoComplete="off"
      >
        <div style={{ marginLeft: 450 }}>
          <div style={{ maxWidth: 500 }}>
            <Row gutter={16} justify="space-between" align="bottom">
              <Col span={22}>
                <Form.Item label="Title Text: " name="title" labelAlign="left">
                  <Input onChange={handleChangeTitleText} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} justify="space-between" align="bottom">
              <Col span={22}>
                <Form.Item
                  label="Widget Header: "
                  name="header"
                  labelAlign="left"
                >
                  <Input onChange={handleUpdateSetting} />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div>
            <Card
              style={{
                maxWidth: 500,
                marginTop: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Contact Form</h2>
                {/* <Switch checked={loading} onChange={onChangeToggle} /> */}
              </div>
              <Divider />
              <div style={{ display: loading ? "block" : "none" }}>
                <Row gutter={20} justify="space-between" align="bottom">
                  <Col span={22}>
                    <Form.Item
                      label="Form Title: "
                      name="form_title"
                      labelAlign="left"
                    >
                      <Input onChange={handleChangeFormTitle} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} justify="space-between" align="bottom">
                  <Col span={22}>
                    <Form.Item
                      label="Button text: "
                      name="button_text"
                      labelAlign="left"
                    >
                      <Input onChange={handleUpdateButton} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} justify="space-between" align="bottom">
                  <Col span={22}>
                    <Form.Item
                      label="Confirmation Message: "
                      name="confirm_message"
                      labelAlign="left"
                    >
                      <Input onChange={handleChangeMessage} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} justify="space-between" align="bottom">
                  <Col span={24}>
                    <Checkbox
                      checked={allowAttach}
                      onChange={onChangeToggleAttach}
                    >
                      Allow Attachments
                    </Checkbox>
                  </Col>
                </Row>
                <Row
                  gutter={20}
                  justify="space-between"
                  align="bottom"
                  className="mt-5"
                >
                  <Col span={30}>
                    <Checkbox
                      checked={allowCaptcha}
                      onChange={onChangeToggleCaptcha}
                    >
                      Enable captcha verification
                    </Checkbox>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        </div>
      </Form>
      <UIWidget />
    </div>
  );
}
