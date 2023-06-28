import { CloudUploadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, FloatButton, Form, Input } from "antd";
import { FC, useEffect, useMemo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import env from "src/core/env";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";

import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
interface UIWidgetProps {}

export const UIWidget: FC<UIWidgetProps> = () => {
  const data = useWidgetSetting((state) => state.widgetSetting);
  const [form] = Form.useForm();
  const updateState = useUpdateSave((state) => state.update);

  const { TextArea } = Input;
  const css = `
 
  .ant-float-btn-content, .ant-float-btn-body{
    background-color: ${data?.buttonAppearanceColor} !important;

  }
    `;
  const commonStyles = {
    wrap: {
      backgroundColor: "#EFF2F5",
      borderRadius: 20,
      width: 400,
      // maxHeight: 800,
    },
    header: {
      height: 200,
      backgroundColor: data?.headerBackgroundColor,
      borderRadius: 8,
    },
    mainTitle: {
      color: `${data?.headerTextColor}`,
      paddingTop: 20,
      paddingBottom: 10,
      maxWidth: 350,
      paddingLeft: 20,
      fontSize: "28px",
    },
    card: { maxWidth: 350, top: -110, margin: 20 },
    formCaptcha: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 20,
    },
    buttonCaptcha: {
      color: data?.textButtonAppearanceColor,
      backgroundColor: data?.buttonAppearanceColor,
      borderRadius: 20,
    },
    description: {
      display: "flex",
      alignItems: "center",
      padding: 2,
      backgroundColor: data?.buttonAppearanceColor,
    },
    iconQuestion: {
      fontSize: 20,
      color: `${data?.textButtonAppearanceColor}`,
    },
    widgetHeader: {
      fontSize: 20,
      marginLeft: 10,
      color: `${data?.textButtonAppearanceColor}`,
    },
  };
  const flexWithButton = useMemo(() => {
    if (data.widgetHeader.length < 5) {
      return 150;
    }
    if (data.widgetHeader.length < 10 && data.widgetHeader.length >= 5) {
      return 200;
    }
    if (data.widgetHeader.length >= 10) {
      return 250;
    }
  }, [data]);
  useEffect(() => {
    form.resetFields();
  }, [updateState]);

  return (
    <div className="z-2 flex justify-center mt-5">
      <style scoped>{css}</style>
      <div style={commonStyles.wrap}>
        <div className="header-bg" style={commonStyles.header}>
          <h1
            className="whitespace-nowrap overflow-hidden truncate "
            style={commonStyles.mainTitle}
          >
            {data?.titleText}
          </h1>{" "}
        </div>
        {data.isFormContact ? (
          <Card
            style={commonStyles.card}
            title={data?.formTitle}
            bordered={false}
            className="card"
          >
            <Form form={form} layout="vertical">
              <Form.Item label="Your Name" name="name" labelAlign="left">
                <Input />
              </Form.Item>
              <Form.Item
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Email Address is required",
                  },
                  {
                    type: "email",
                    message: "The email address is not valid",
                  },
                ]}
                name="email"
                labelAlign="left"
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Subject"
                rules={[
                  {
                    required: true,
                    message: "Subject is required",
                    whitespace: true,
                  },
                ]}
                name="subject"
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Description is required",
                    whitespace: true,
                  },
                ]}
                name="description"
              >
                <TextArea rows={4} />
              </Form.Item>
              {data?.allowAttach ? (
                <Form.Item labelAlign="left" label="Attachment">
                  <div className="mb-5 rounded-md">
                    <section
                      style={{ backgroundColor: "#FAFAFA" }}
                      className="p-2  border-2 border-dotted border-slate-50"
                    >
                      <div className="flex justify-center items-center flex-col p-3">
                        <CloudUploadOutlined style={{ fontSize: 32 }} />

                        <p className="text mt-2">Upload files (max 3)</p>
                        <span
                          className="text-center"
                          style={{ color: "rgba(0, 0, 0, 0.45)" }}
                        >
                          Drag & Drop or Click to add your file(s)
                        </span>
                      </div>
                    </section>
                  </div>
                </Form.Item>
              ) : (
                <></>
              )}
              {data?.allowCaptcha ? (
                <div style={commonStyles.formCaptcha}>
                  <Form.Item
                    name="captcha"
                    // rules={[{ required: true, message: "Please enter captcha" }]}
                  >
                    <ReCAPTCHA
                      className="capt-cha"
                      sitekey={env.RECAPTCHA_KEYS}
                    ></ReCAPTCHA>
                  </Form.Item>
                </div>
              ) : (
                <></>
              )}
            </Form>

            <div className="flex justify-end">
              <Button style={commonStyles.buttonCaptcha} type="primary">
                {data.buttonText}
              </Button>
            </div>
          </Card>
        ) : (
          <></>
        )}
        <div className="flex justify-end">
          <FloatButton
            shape="square"
            style={{
              marginBottom: 10,
              width: flexWithButton,
              position: "relative",
              backgroundColor: data?.buttonAppearanceColor,
              borderRadius: 20,
            }}
            description={
              <div style={commonStyles.description}>
                <QuestionCircleOutlined style={commonStyles.iconQuestion} />
                <span style={commonStyles.widgetHeader}>
                  {data?.widgetHeader}
                </span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
