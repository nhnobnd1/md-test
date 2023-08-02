import { CloudUploadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, FloatButton, Form, Input } from "antd";
import { FC, useEffect, useMemo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import env from "src/core/env";
import useViewport from "src/hooks/useViewport";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";

import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
interface UIWidgetProps {}

export const UIWidget: FC<UIWidgetProps> = () => {
  const data = useWidgetSetting((state) => state.widgetSetting);
  const [form] = Form.useForm();
  const updateState = useUpdateSave((state) => state.update);
  const { isMobile } = useViewport();

  const { TextArea } = Input;
  const css = `
  .md-font-customize-widget {
    font-family: ${
      data?.font
        ? data?.font
        : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
    };
    .md-font-customize-widget>.ant-form-item-row>.ant-form-item-label>label {
      font-family: ${
        data?.font
          ? data?.font
          : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
      };
    }
  }
  .ant-float-btn-content, .ant-float-btn-body{
    background-color: ${data?.buttonAppearanceColor} !important;

  }
    `;
  const fontCss = `
  @font-face {
    font-family: ${data?.font};
    font-weight: 400;
    src: url(${data?.fontSrc});
  }
  @font-face {
    font-family: ${data?.font};
    font-weight: 600;
    src: url(${data?.fontSrc});
  }`;
  const commonStyles = {
    wrap: {
      backgroundColor: "#EFF2F5",
      borderRadius: 20,
      width: isMobile ? "100%" : 400,
    },
    header: {
      height: 120,
      backgroundColor: data?.headerBackgroundColor,
      borderRadius: 8,
      padding: 24,
      display: "flex",
      justifyContent: "space-between",
    },
    mainTitle: {
      color: `${data?.headerTextColor}`,

      maxWidth: 350,

      fontSize: data?.logo ? 20 : 28,
      margin: 0,
      lineHeight: "initial",
    },
    card: { maxWidth: 350, top: -30, margin: 20 },
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
      maxWidth: 150,
    },
    iconQuestion: {
      fontSize: 20,
      color: `${data?.textButtonAppearanceColor}`,
    },
    widgetHeader: {
      fontSize: 20,
      color: `${data?.textButtonAppearanceColor}`,
      maxWidth: 150,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "inline-block",
      height: 20,
    },
  };
  const flexWithButton = useMemo(() => {
    if (data?.widgetHeader?.length < 5) {
      return 150;
    }
    if (data?.widgetHeader?.length < 10 && data?.widgetHeader?.length >= 5) {
      return 200;
    }
    if (data?.widgetHeader?.length >= 10) {
      return 250;
    }
  }, [data]);
  useEffect(() => {
    form.resetFields();
  }, [updateState]);

  return (
    <div
      className="z-2 flex justify-center mt-5"
      id="wrap-form"
      style={{ maxWidth: "100vw" }}
    >
      <style scoped>{css}</style>
      {data?.fontSrc && <style>{fontCss}</style>}
      <div style={commonStyles.wrap}>
        <div
          className="header-bg"
          style={{ ...commonStyles.header, flexDirection: "column" }}
        >
          {data?.logo && (
            <div
              style={{
                maxHeight: 32,
                width: "max-content",
                overflow: "hidden",
              }}
            >
              <img
                style={{
                  maxHeight: "32px",
                  width: "initial",
                  display: "block",
                  margin: "0 auto",
                  objectFit: "contain",
                }}
                src={data?.logo}
                alt="logo-widget"
              />
            </div>
          )}
          <h1
            className="whitespace-nowrap overflow-hidden truncate md-font-customize-widget"
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
            className="card md-font-customize-widget"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                className="md-font-customize-widget"
                label="Your Name"
                name="name"
                labelAlign="left"
              >
                <Input
                  className="md-font-customize-widget"
                  placeholder="Your Name"
                />
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
                className="md-font-customize-widget"
              >
                <Input
                  className="md-font-customize-widget"
                  placeholder="Email Address"
                />
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
                className="md-font-customize-widget"
              >
                <Input
                  className="md-font-customize-widget"
                  placeholder="Subject"
                />
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
                className="md-font-customize-widget"
              >
                <TextArea
                  className="md-font-customize-widget"
                  rows={4}
                  placeholder="Description"
                />
              </Form.Item>
              {data?.allowAttach ? (
                <Form.Item
                  className="md-font-customize-widget"
                  labelAlign="left"
                  label="Attachment"
                >
                  <div className="mb-5 rounded-md">
                    <section
                      style={{ backgroundColor: "#FAFAFA" }}
                      className="p-2  border-2 border-dotted border-slate-50 md-font-customize-widget"
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
                <span
                  style={{
                    maxWidth: 150,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline-block",
                  }}
                  className="md-font-customize-widget"
                >
                  {data.buttonText}
                </span>
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
              borderRadius: "50px!important",
            }}
            description={
              <div style={commonStyles.description}>
                <QuestionCircleOutlined style={commonStyles.iconQuestion} />
                <span
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    color: `${data?.textButtonAppearanceColor}`,
                    maxWidth: 150,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline-block",
                    height: 20,
                  }}
                >
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
