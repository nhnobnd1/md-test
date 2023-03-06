import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  CloudUploadOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, FloatButton, Form, Input, Modal } from "antd";
import { filesize } from "filesize";
import { useDropzone } from "react-dropzone";
import ReCAPTCHA from "react-google-recaptcha";

import "./App.css";

const dataExample = [
  {
    id: "uuid1",
    titleText: "Support Request",
    widgetHeader: "Help",
    formTitle: "Contact us",
    buttonText: "Submit",
    confirmMessage: "Thank you for your feedback.",
    allowAttach: true,
    allowCaptcha: true,
    headerBackgroundColor: "cyan",
    headerTextColor: "black",
    widgetPosition: "left",
    offsetBottom: 20,
    offsetHorizontal: 30,
    buttonAppearanceColor: "lightgreen",
    textButtonAppearanceColor: "black",
    isFormContact: true,
  },
  {
    id: "uuid2",
    titleText: "Yêu cầu hỗ trợ",
    widgetHeader: "Trợ giúp",
    formTitle: "Liên hệ chúng tôi",
    buttonText: "Xác nhận",
    confirmMessage: "Cảm ơn đã phản hồi",
    allowAttach: false,
    allowCaptcha: true,
    headerBackgroundColor: "red",
    headerTextColor: "white",
    widgetPosition: "right",
    offsetBottom: 10,
    offsetHorizontal: 20,
    buttonAppearanceColor: "blue",
    textButtonAppearanceColor: "yellow",
    isFormContact: true,
  },
];
function App() {
  const [openModal, setOpenModal] = useState(false);
  const [myFiles, setMyFiles] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [response, setResponse] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const formRef = React.useRef(null);
  const { TextArea } = Input;
  // console.log({ acceptedFiles, myFiles })
  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };
  const css = `
  .ant-modal-content {
    background-color: ${data?.headerBackgroundColor} !important;
  }
  .ant-float-btn-content{
    background-color: ${data?.buttonAppearanceColor} !important;

  }
    `;

  const ListFile = useMemo(() => {
    return (
      <div>
        {myFiles.map((item) => (
          <div
            className="item-file"
            key={item.path}
            // style={{
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}
          >
            <div style={{ flexGrow: 1 }}>
              <p>{item.path}</p>
              <span>{filesize(item.size, { base: 2, standard: "jedec" })}</span>
            </div>
            <Button
              style={{ flexBasis: 100, marginLeft: 10 }}
              onClick={removeFile(item)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </div>
    );
  }, [myFiles]);
  const onFinish = (values) => {
    console.log("Success:", values);
    setResponse(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const getData = async () => {
      setTimeout(() => {
        setData(
          dataExample[
            window?.mdSettings?.widget_id ? window?.mdSettings?.widget_id : 0
          ]
        );
      }, 1000);
    };
    getData();
  }, []);

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
  console.log({ data });

  return (
    <>
      {data ? (
        <div className="App">
          <style>{css}</style>
          <FloatButton
            onClick={() => {
              setOpenModal(true);
            }}
            style={{
              padding: 10,
              minWidth: 100,

              backgroundColor: data?.buttonAppearanceColor,
              ...positionWidget,
            }}
            description={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  // backgroundColor: data?.buttonAppearanceColor,
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
            shape="square"
            // icon={<CommentOutlined />}
          />
          <Modal
            // title="Vertically centered modal dialog"
            centered
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            footer={<></>}
            bodyStyle={{ marginTop: 50 }}
            // maskStyle={{ background: 'blue' }}
            wrapClassName="modal"
          >
            <div className="header-bg">
              <h1 style={{ color: `${data?.headerTextColor}` }}>
                {data?.titleText}
              </h1>
            </div>
            <Form
              form={form}
              ref={formRef}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 20 }}
              autoComplete="off"
              name="control-ref"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                name: "",
                email: "",
                subject: "",
                description: "",
              }}
            >
              {response ? (
                <>
                  <Card
                    // title={data?.confirmMessage}
                    bordered={false}
                    className="card"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <h1>{data?.confirmMessage}</h1>
                      <Button
                        type="primary"
                        onClick={() => {
                          setResponse(false);
                          form.resetFields();
                          setOpenModal(false);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </Card>
                </>
              ) : (
                <>
                  {data?.isFormContact ? (
                    <Card
                      title={data?.formTitle}
                      bordered={false}
                      className="card"
                    >
                      {/* <h1>asdas</h1> */}

                      <Form.Item
                        label="Your Name"
                        name="name"
                        labelAlign="left"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Email Address"
                        rules={[
                          { required: true, message: "Please input Email!" },
                        ]}
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
                      {data?.allowAttach ? (
                        <div>
                          <section className="container">
                            <div {...getRootProps({ className: "dropzone" })}>
                              <CloudUploadOutlined style={{ fontSize: 32 }} />
                              <input {...getInputProps()} />
                              <p className="text">Upload files (max 5)</p>
                              <span>Click to add or drags & drop files</span>
                            </div>
                          </section>
                        </div>
                      ) : (
                        <></>
                      )}
                      {myFiles.length > 0 ? (
                        <div style={{ marginTop: 10 }}>
                          <p>{myFiles.length} ATTACHMENT</p>
                        </div>
                      ) : (
                        <></>
                      )}
                      {ListFile}

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
                            // label="captcha"
                            rules={[
                              {
                                required: true,
                                message: "Please enter captcha",
                              },
                            ]}
                          >
                            <ReCAPTCHA
                              className="capt-cha"
                              sitekey={process.env.CAPTCHA}
                            ></ReCAPTCHA>
                          </Form.Item>
                        </div>
                      ) : (
                        <></>
                      )}
                    </Card>
                  ) : (
                    <></>
                  )}
                </>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  // position: 'absolute',
                  // top: -100,
                  marginTop: -80,
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{
                    color: data?.textButtonAppearanceColor,
                    backgroundColor: data?.buttonAppearanceColor,
                  }}
                  onClick={() => {
                    console.log("click", formRef.current);
                  }}
                >
                  {data?.buttonText}
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
