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
  const positionWidget = useMemo(() => {
    if (data?.widgetPosition === "right") {
      return {
        bottom: `${data?.offsetBottom}px`,
        right: `${data?.offsetHorizontal}px`,
      };
    }
    return {
      bottom: `${data?.offsetBottom}px`,
      left: `${data?.offsetHorizontal}px`,
    };
  }, [data]);
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
    <div style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
      <div
        style={{
          // padding: 20,
          backgroundColor: "#EFF2F5",
          borderRadius: 20,
          minWidth: 300,
          maxHeight: 800,
        }}
      >
        <div
          className="header-bg"
          style={{
            height: 200,
            backgroundColor: data?.headerBackgroundColor,
            borderRadius: 8,
          }}
        >
          <h1
            className="whitespace-nowrap overflow-hidden truncate "
            style={{
              color: `${data?.headerTextColor}`,
              paddingTop: 20,
              paddingBottom: 10,
              maxWidth: 350,
              paddingLeft: 20,
              fontSize: "28px",
            }}
          >
            {data?.titleText}
          </h1>{" "}
        </div>
        {data.isFormContact ? (
          <Card
            style={{ maxWidth: 350, top: -110, margin: 20 }}
            title={data?.formTitle}
            bordered={false}
            className="card"
          >
            <Form form={form} labelCol={{ span: 10 }}>
              <Form.Item label="Your Name" name="name" labelAlign="left">
                <Input />
              </Form.Item>
              <Form.Item
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Email Address is required",
                    whitespace: true,
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
            </Form>
            {data?.allowAttach ? (
              <div className="mb-5">
                <section className="p-2 bg-gray-100 border-2 border-dotted border-slate-50">
                  <div className="flex justify-center items-center flex-col">
                    <CloudUploadOutlined style={{ fontSize: 32 }} />

                    <p className="text">Upload files (max 3)</p>
                    <span>Drag&drop or Click to add your files</span>
                  </div>
                </section>
              </div>
            ) : (
              <></>
            )}

            {data?.allowCaptcha ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 20,
                }}
              >
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
            <div className="flex justify-end">
              <Button
                style={{
                  color: data?.textButtonAppearanceColor,
                  backgroundColor: data?.buttonAppearanceColor,
                  borderRadius: 20,
                }}
                type="primary"
              >
                {data.buttonText}
              </Button>
            </div>
          </Card>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-end">
        <style scoped>{css}</style>

        <FloatButton
          shape="square"
          style={{
            // padding: 10,
            right: 0,
            marginTop: 10,
            marginBottom: 10,
            width: flexWithButton,
            position: "relative",
            backgroundColor: data?.buttonAppearanceColor,
            bottom: 0,
            borderRadius: 20,

            // ...positionWidget,
          }}
          description={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                backgroundColor: data?.buttonAppearanceColor,
              }}
            >
              <QuestionCircleOutlined
                style={{
                  fontSize: 20,
                  color: `${data?.textButtonAppearanceColor}`,
                }}
              />
              <span
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  color: `${data?.textButtonAppearanceColor}`,
                }}
              >
                {data?.widgetHeader}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};
