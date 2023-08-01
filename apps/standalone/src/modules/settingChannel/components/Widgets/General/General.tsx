import { Card, Checkbox, Col, Divider, Form, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Crisp } from "crisp-sdk-web";
import { ChangeEvent, useEffect, useState } from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import { MDInput } from "src/components/UI/Input";
import { UIWidget } from "src/modules/settingChannel/components/Widgets/UIWidget";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";

export default function General() {
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

  const cancelState = useUpdateSave((state) => state.cancel);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleContactSupport = () => {
    Crisp.chat.open();
    Crisp.message.send("text", "Hi, I'd like to add logo to widget header");
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
    <>
      <div className="flex flex-row-reverse gap-10 flex-wrap justify-center">
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 22 }}
          initialValues={initialFormValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
          layout="vertical"
          className="flex-1 basis-3/6 mt-5"
        >
          <div>
            <Card className="w-full ">
              <Row gutter={16} justify="space-between" align="bottom">
                <Col span={22}>
                  <Form.Item label="Title Text " name="title" labelAlign="left">
                    <MDInput onChange={handleChangeTitleText} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} justify="space-between" align="bottom">
                <Col span={22}>
                  <Form.Item
                    label="Widget Header "
                    name="header"
                    labelAlign="left"
                  >
                    <MDInput onChange={handleUpdateSetting} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <div>
              <Card className=" mt-5">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Contact Form</h2>
                  {/* <Switch checked={loading} onChange={onChangeToggle} /> */}
                </div>
                <Divider />
                <div>
                  <Row gutter={20} justify="space-between" align="bottom">
                    <Col span={22}>
                      <Form.Item
                        label="Form Title"
                        name="form_title"
                        labelAlign="left"
                      >
                        <MDInput onChange={handleChangeFormTitle} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={20} justify="space-between" align="bottom">
                    <Col span={22}>
                      <Form.Item
                        label="Button text"
                        name="button_text"
                        labelAlign="left"
                      >
                        <MDInput onChange={handleUpdateButton} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={20} justify="space-between" align="bottom">
                    <Col span={22}>
                      <Form.Item
                        label="Confirmation Message"
                        name="confirm_message"
                        labelAlign="left"
                      >
                        <MDInput onChange={handleChangeMessage} />
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
          <div className="m-top-16">
            <MDButton className="btn-outline" onClick={handleContactSupport}>
              Replace logo
            </MDButton>
            <p className="py-16-12">
              Add your brand logo into MooseDesk Widget
            </p>
          </div>
        </Form>
        <UIWidget />
      </div>
    </>
  );
}
