import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  CloudUploadOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, FloatButton, Form, Input, Modal } from "antd";
import axios from "axios";
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
  .ant-float-btn-content, .ant-float-btn-body{
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
      // setTimeout(() => {
      //   setData(
      //     dataExample[
      //       window?.mdSettings?.widget_id ? window?.mdSettings?.widget_id : 0
      //     ]
      //   );
      // }, 1000);
      const response = axios.get(
        `https://api-dev.moosedesk.net/api/v1/help-widget/${window?.mdSettings?.widget_id}?axios_timestamp=1678200583710`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0RUJERDkwNjkzQTQxRUE4OEM5MkU5NTlGNDE0RjUzRTEwQTlCQzIiLCJ4NXQiOiI1T3Zka0drNlFlcUl5UzZWbjBGUFUtRUttOEkiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTA4Y2I4My1kNGVhLTY5YzQtZjFiZS1hNGQ1OTcwZjdlYmIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIwMTdsYWliYXZpLnd0c0BnbWFpbC5jb20iLCJlbWFpbCI6IjAxN2xhaWJhdmkud3RzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsInRlbmFudGlkIjoiM2EwOGE2ZGMtY2RjYi0xYzgwLTYyZWMtM2NjOWExM2M2ZGJiIiwiZ2l2ZW5fbmFtZSI6IlZpIiwiZmFtaWx5X25hbWUiOiJMYWkgQmEiLCJwaG9uZV9udW1iZXIiOiI4NC0zMzc1MjAwMTEiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsX3ZlcmlmaWVkIjoiVHJ1ZSIsInVuaXF1ZV9uYW1lIjoiMDE3bGFpYmF2aS53dHNAZ21haWwuY29tIiwic3RvcmVJZCI6IjY4NjQ1ODgwMTI0Iiwic3ViZG9tYWluIjoibW9vc2UtZGVzayIsIm9pX3Byc3QiOiJNb29zZWRlc2tfUG9zdG1hbiIsIm9pX2F1X2lkIjoiM2EwOWIzMmYtNGQxMC1hNWIxLTBjNDYtYmIyZmI2ZmQ0NDBiIiwiY2xpZW50X2lkIjoiTW9vc2VkZXNrX1Bvc3RtYW4iLCJvaV90a25faWQiOiIzYTA5YjMyZi00ZDFjLTNiZDgtZGU1YS00NGI4NDU0NGI4OTYiLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiZXhwIjoxNjc3OTk3NzM4LCJpc3MiOiJodHRwczovL2F1dGgubW9vc2VkZXNrLm5ldC8iLCJpYXQiOjE2Nzc3Mzg1Mzh9.IQuq1QKkqqtFx2h3QfZMVpO5PdEFGb-LFvViGlyRknxlejYd0ofdHFKmH5LW1I6XfB82aSRPqpcrobhJ3Q_1UqkN6zZZSOvprLoshqVl9G4ofo5ZyVqv-VuwOuIOhD0IRdMz2DLhIJBPwwH6unIt3q7gL50SwPq547thSK4rnQ9VmF2Pw1U6DX_XFxn6243rMnlw1s9eBFUB4xpnernZrxxfhG632spEgSwRpETigabLZ9Y0EzeBFPHno7HjQ11aVuzYMExY4gwT57OThbpXu63qWnlLNXXPHwxa6nzjgXNDh32do8gMZ308qGdmrJm_7sDWQDBYsWGCy_WsZuTCpw`,
          },
        }
      );
      setData(response.data);
      console.log("hola", response.data);
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

  const flexWithButton = useMemo(() => {
    if (!data) return 100;
    if (data.widgetHeader.length < 5) {
      return 100;
    }
    if (data.widgetHeader.length < 10 && data.widgetHeader.length >= 5) {
      return 150;
    }
    if (data.widgetHeader.length >= 10) {
      return 200;
    }
  }, [data]);

  console.log({ data, flexWithButton });

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
              // padding: 10,
              width: flexWithButton,

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
