import { CloudUploadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useToggle } from "@moose-desk/core";
import { FormLayout, Text, TextField } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import env from "src/core/env";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import * as Yup from "yup";
import "./ViewWidget.scss";

interface ViewWidgetProps {}

export const ViewWidget = (props: ViewWidgetProps) => {
  const { toggle: updateForm } = useToggle();
  const formRef = useRef<FormikProps<any>>(null);
  const data = useWidgetSetting((state) => state.widgetSetting);
  const updateState = useUpdateSave((state) => state.update);

  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("The email address is not valid")
      .required("Email Address is required!"),
    subject: Yup.string()
      .matches(/[^\s]/, "Subject is required!")
      .required("Subject is required!"),
    description: Yup.string()
      .matches(/[^\s]/, "Description is required!")
      .required("Description is required!"),
  });

  useEffect(() => {
    formRef.current?.resetForm();
  }, [updateState]);

  return (
    <div className="ViewWidget  xs:w-[300px] sm:w-[370px] md:w-[400px]">
      <div
        className="header h-[150px]"
        style={{ backgroundColor: data.headerBackgroundColor }}
      >
        <h1
          className="title"
          style={{
            color: data.headerTextColor,
          }}
        >
          {data.titleText}
        </h1>
      </div>
      <div className="content">
        {data.isFormContact ? (
          <div className="form-demo">
            <div className="card">
              <div className="card-header">
                <Text as="h4" variant="bodyLg" fontWeight="semibold">
                  {data.formTitle}
                </Text>
              </div>
              <div className="card-body">
                <Form
                  innerRef={formRef}
                  initialValues={{}}
                  validationSchema={FormSchema}
                  onValuesChange={updateForm}
                  onSubmit={() => {}}
                >
                  <FormLayout>
                    <FormItem name="name">
                      <TextField
                        label="Your name"
                        autoComplete="off"
                      ></TextField>
                    </FormItem>
                    <FormItem name="email">
                      <TextField
                        label="Email Address"
                        autoComplete="off"
                      ></TextField>
                    </FormItem>
                    <FormItem name="subject">
                      <TextField label="Subject" autoComplete="off"></TextField>
                    </FormItem>
                    <FormItem name="description">
                      <TextField
                        label="Description"
                        autoComplete="off"
                        multiline={3}
                      ></TextField>
                    </FormItem>
                    {data.allowAttach && (
                      <FormItem name="attachment">
                        <div>
                          <div className="label">Attachment</div>
                          <div className="w-full bg-gray-100 border-slate-50 p-4 flex flex-col justify-center items-center">
                            <div>
                              <CloudUploadOutlined style={{ fontSize: 32 }} />
                            </div>
                            <Text as="p" variant="bodyMd">
                              Upload files (max 3)
                            </Text>
                            <div className="mt-2 text-center">
                              Drag & Drop or Click to add your file(s)
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    )}
                    {data.allowCaptcha && (
                      <FormItem name="captcha">
                        <ReCAPTCHA
                          className="w-full overflow-scroll"
                          sitekey={env.RECAPTCHA_KEYS}
                        ></ReCAPTCHA>
                      </FormItem>
                    )}
                  </FormLayout>
                  <div className="flex justify-end  mt-6">
                    <button
                      className="px-4 py-2 rounded-[20px]"
                      style={{
                        color: data?.textButtonAppearanceColor,
                        backgroundColor: data?.buttonAppearanceColor,
                      }}
                    >
                      {data.buttonText}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-end px-4 button-widget">
          <button
            className="px-4 py-2 rounded-[20px] flex justify-center gap-1"
            style={{
              color: data?.textButtonAppearanceColor,
              backgroundColor: data?.buttonAppearanceColor,
            }}
          >
            <QuestionCircleOutlined
              style={{
                fontSize: 18,
                color: `${data?.textButtonAppearanceColor}`,
              }}
            />
            <div className="max-w-[150px] truncate">{data.widgetHeader}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewWidget;
