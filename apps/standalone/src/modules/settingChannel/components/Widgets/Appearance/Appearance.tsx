import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  InputNumber,
  Popover,
  Row,
} from "antd";
import { Crisp } from "crisp-sdk-web";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { MDButton } from "src/components/UI/Button/MDButton";
import { UIWidget } from "src/modules/settingChannel/components/Widgets/UIWidget";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import ArrowDownLeft from "~icons/bi/box-arrow-down-left";
import ArrowDownRight from "~icons/bi/box-arrow-down-right";
import "./styles.scss";
export default function Appearance() {
  const [color, setColor] = useState<ColorResult | null>();
  const [textColor, setTextColor] = useState<ColorResult | null>();
  const [buttonColor, setButtonColor] = useState<ColorResult | null>();
  const [buttonTextColor, setButtonTextColor] = useState<ColorResult | null>();

  const { rgb } = color || {};
  const { rgb: rgbText } = textColor || {};
  const { rgb: rgbButton } = buttonColor || {};
  const { rgb: rgbButtonText } = buttonTextColor || {};

  const [form] = Form.useForm();
  const data = useWidgetSetting((state) => state.widgetSetting);
  const initialFormValues = {
    widgetBackgroundColor: data?.headerBackgroundColor,
    widgetTextColor: data?.headerTextColor,
    widgetPosition: data?.widgetPosition,
    offsetBot: data?.offsetBottom,
    offsetHorizontal: data?.offsetHorizontal,
    buttonBackgroundColor: data?.buttonAppearanceColor,
    textColor: data?.textButtonAppearanceColor,
  };
  const [targetButton, setTargetButton] = useState<number>(
    data?.widgetPosition === "right" ? 2 : 1
  );
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );
  const cancelState = useUpdateSave((state) => state.cancel);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeTargetButton = (number: number) => {
    setTargetButton(number);
  };

  const updateColor = useCallback(
    (color: ColorResult) => {
      setColor(color);
      updateWidgetSetting({
        ...data,
        headerBackgroundColor: color?.hex,
      });
    },
    [data]
  );
  const updateTextColor = useCallback(
    (color: ColorResult) => {
      setTextColor(color);
      updateWidgetSetting({
        ...data,
        headerTextColor: color?.hex,
      });
    },
    [data]
  );
  const updateButtonColor = useCallback(
    (color: ColorResult) => {
      setButtonColor(color);
      updateWidgetSetting({
        ...data,
        buttonAppearanceColor: color?.hex,
      });
    },
    [data]
  );
  const updateButtonTextColor = useCallback(
    (color: ColorResult) => {
      setButtonTextColor(color);
      updateWidgetSetting({
        ...data,
        textButtonAppearanceColor: color?.hex,
      });
    },
    [data]
  );
  const backgroundHeader = useMemo(() => {
    return <SketchPicker color={rgb} onChange={updateColor} />;
  }, [color, data]);
  const bgText = useMemo(() => {
    return <SketchPicker color={rgbText} onChange={updateTextColor} />;
  }, [textColor, data]);
  const bgButton = useMemo(() => {
    return <SketchPicker color={rgbButton} onChange={updateButtonColor} />;
  }, [buttonColor, data]);
  const bgButtonText = useMemo(() => {
    return (
      <SketchPicker color={rgbButtonText} onChange={updateButtonTextColor} />
    );
  }, [buttonTextColor, data]);

  useEffect(() => {
    form.resetFields();
    setTargetButton(data?.widgetPosition === "right" ? 2 : 1);
    setColor(null);
    setButtonTextColor(null);
    setButtonColor(null);
    setTextColor(null);
  }, [data.id, cancelState]);
  const handleUpdateButton = (e: any) => {
    updateWidgetSetting({
      ...data,
      offsetBottom: e,
    });
  };
  const handleUpdateSetting = () => {
    handleChangeTargetButton(2);
    updateWidgetSetting({
      ...data,
      widgetPosition: "right",
    });
  };
  const handleUpdateWidgetPosition = () => {
    handleChangeTargetButton(1);
    updateWidgetSetting({
      ...data,
      widgetPosition: "left",
    });
  };
  const handleUpdateOffset = (e: any) => {
    updateWidgetSetting({
      ...data,
      offsetHorizontal: e,
    });
  };
  const handleContactSupport = () => {
    Crisp.chat.open();
    Crisp.message.send("text", "Hi, I'd like to change font widget");
  };
  return (
    <>
      <div className="flex flex-row-reverse gap-10 flex-wrap justify-center">
        <Form
          // labelCol={{ span: 14 }}
          // wrapperCol={{ span: 16 }}
          initialValues={initialFormValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
          className="flex-1 basis-3/6 mt-5"
          layout="vertical"
        >
          <div>
            <Card className="md-card w-full">
              <h2>Widget Appearance</h2>
              <Divider />
              <Row className="max-w-[300px] flex gap-2">
                <span className="w-[200px]">Header Background Color</span>
                <div>
                  <Popover content={backgroundHeader}>
                    <Button
                      style={{
                        width: 20,
                        backgroundColor: `${
                          color?.hex ? color?.hex : data?.headerBackgroundColor
                        }`,
                      }}
                    ></Button>
                  </Popover>
                </div>
              </Row>
              <Row className="max-w-[300px] flex gap-2 mt-5">
                <span className="w-[200px]"> Text Color</span>
                <Col span={3}>
                  <Popover content={bgText}>
                    <Button
                      style={{
                        width: 20,
                        backgroundColor: `${
                          textColor?.hex
                            ? textColor?.hex
                            : data?.headerTextColor
                        }`,
                      }}
                    ></Button>
                  </Popover>
                </Col>
              </Row>
            </Card>

            <Card className="md-card my-3 w-full">
              <div className="mb-5 flex flex-col gap-2">
                <span className="w-[200px]">Widget Position</span>
                <div className="flex gap-4">
                  <MDButton
                    onClick={handleUpdateWidgetPosition}
                    type={targetButton === 1 ? "primary" : "default"}
                    icon={
                      <ArrowDownLeft
                        fontSize={14}
                        style={{ marginRight: 8, paddingTop: 5 }}
                      />
                    }
                  >
                    Bottom Left
                  </MDButton>
                  <MDButton
                    onClick={handleUpdateSetting}
                    type={targetButton === 2 ? "primary" : "default"}
                    icon={
                      <ArrowDownRight
                        fontSize={14}
                        style={{ marginRight: 8, paddingTop: 5 }}
                      />
                    }
                  >
                    Bottom Right
                  </MDButton>
                </div>
              </div>
              <Row className="max-w-[300px] flex gap-2 mt-5">
                <Form.Item
                  labelAlign="left"
                  label="Offset from bottom (pixels)"
                  name="offsetBot"
                  className="w-full"
                >
                  <InputNumber
                    className="w-[200px]"
                    onChange={handleUpdateButton}
                  />
                </Form.Item>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item
                    labelAlign="left"
                    label="Offset from left/right (pixels)"
                    name="offsetHorizontal"
                  >
                    <InputNumber
                      className="w-[200px]"
                      onChange={handleUpdateOffset}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card className="md-card w-full">
              <h2>Button Appearance</h2>
              <Divider />
              <Row className="max-w-[300px] flex gap-2">
                <span className="w-[200px]">Background Color</span>
                <div>
                  <Popover content={bgButton}>
                    <Button
                      style={{
                        width: 20,
                        backgroundColor: `${
                          buttonColor?.hex
                            ? buttonColor?.hex
                            : data?.buttonAppearanceColor
                        }`,
                      }}
                    ></Button>
                  </Popover>
                </div>
              </Row>
              <Row className="max-w-[300px] flex gap-2 mt-5">
                <span className="w-[200px]">Text Color</span>
                <div>
                  <Popover content={bgButtonText}>
                    <Button
                      style={{
                        width: 20,
                        backgroundColor: `${
                          buttonTextColor?.hex
                            ? buttonTextColor?.hex
                            : data?.textButtonAppearanceColor
                        }`,
                      }}
                    ></Button>
                  </Popover>
                </div>
              </Row>
            </Card>
          </div>
          <div className=" m-top-16">
            <MDButton className="btn-outline" onClick={handleContactSupport}>
              Change font
            </MDButton>
            <p className="py-16-12">
              Chat with us now to get this customization for free
            </p>
          </div>
        </Form>
        <UIWidget />
      </div>
    </>
  );
}
