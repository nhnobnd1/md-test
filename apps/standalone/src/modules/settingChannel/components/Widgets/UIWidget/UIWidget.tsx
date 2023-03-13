import { CloudUploadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, FloatButton, Form, Input } from "antd";
import { FC, useMemo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import env from "src/core/env";

import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
interface UIWidgetProps {}

export const UIWidget: FC<UIWidgetProps> = () => {
  const data = useWidgetSetting((state) => state.widgetSetting);
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
  return (
    <div style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}>
      <div
        style={{
          padding: 20,
          backgroundColor: data?.headerBackgroundColor,
          borderRadius: 20,
          minWidth: 300,
        }}
      >
        <div className="header-bg">
          <h1
            className="whitespace-nowrap overflow-hidden truncate "
            style={{
              color: `${data?.headerTextColor}`,
              paddingTop: 10,
              paddingBottom: 10,
              maxWidth: 300,
            }}
          >
            {data?.titleText}
          </h1>{" "}
        </div>
        {data.isFormContact ? (
          <Card
            style={{ maxWidth: 350 }}
            title={data?.formTitle}
            bordered={false}
            className="card"
          >
            <Form labelCol={{ span: 10 }}>
              <Form.Item label="Your Name" name="name" labelAlign="left">
                <Input />
              </Form.Item>
              <Form.Item
                label="Email Address"
                rules={[{ required: true, message: "Please input Email!" }]}
                name="email"
                labelAlign="left"
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Subject"
                rules={[{ required: true }]}
                name="subject"
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Description"
                rules={[{ required: true }]}
                name="description"
              >
                <TextArea rows={4} />
              </Form.Item>
            </Form>
            {data?.allowAttach ? (
              <div>
                <section className="p-2 bg-gray-100 border-2 border-dotted border-slate-50">
                  <div className="flex justify-center items-center flex-col">
                    <CloudUploadOutlined style={{ fontSize: 32 }} />

                    <p className="text">Upload files (max 5)</p>
                    <span>Click to add or drags & drop files</span>
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
                  rules={[{ required: true, message: "Please enter captcha" }]}
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
