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
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { UIWidget } from "src/modules/settingChannel/components/Widgets/UIWidget";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import ArrowDownLeft from "~icons/bi/box-arrow-down-left";
import ArrowDownRight from "~icons/bi/box-arrow-down-right";

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
  return (
    <>
      <Form
        labelCol={{ span: 14 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 20, position: "relative" }}
        initialValues={initialFormValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        autoComplete="off"
      >
        <div style={{ marginLeft: 450 }}>
          <Card
            style={{
              maxWidth: 500,
              // marginTop: 16,
            }}
          >
            <h2>Widget Appearance</h2>
            <Divider />
            <Row>
              <Col
                span={10}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Header Background Color
              </Col>
              <Col span={3}>
                <Popover content={backgroundHeader}>
                  <Button
                    style={{
                      width: 20,
                      backgroundColor: `${
                        color?.hex ? color?.hex : data?.headerBackgroundColor
                      }`,
                      marginLeft: 20,
                    }}
                  ></Button>
                </Popover>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col
                span={10}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Text Color
              </Col>
              <Col span={3}>
                <Popover content={bgText}>
                  <Button
                    style={{
                      width: 20,
                      backgroundColor: `${
                        textColor?.hex ? textColor?.hex : data?.headerTextColor
                      }`,
                      marginLeft: 20,
                    }}
                  ></Button>
                </Popover>
              </Col>
            </Row>
          </Card>

          <div style={{ maxWidth: 500 }}>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <span>Widget Position</span>
              <Button
                onClick={handleUpdateWidgetPosition}
                type={targetButton === 1 ? "primary" : "default"}
                style={{ marginLeft: 20, marginRight: 20 }}
                size="large"
                icon={
                  <ArrowDownLeft
                    fontSize={14}
                    style={{ marginRight: 8, paddingTop: 5 }}
                  />
                }
              >
                Bottom Left
              </Button>
              <Button
                onClick={handleUpdateSetting}
                type={targetButton === 2 ? "primary" : "default"}
                style={{ marginLeft: 20, marginRight: 20 }}
                size="large"
                icon={
                  <ArrowDownRight
                    fontSize={14}
                    style={{ marginRight: 8, paddingTop: 5 }}
                  />
                }
              >
                Bottom Right
              </Button>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <Form.Item
                  labelAlign="left"
                  label="Offset from bottom (pixels)"
                  name="offsetBot"
                >
                  <InputNumber onChange={handleUpdateButton} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  labelAlign="left"
                  label="Offset from left/right (pixels)"
                  name="offsetHorizontal"
                >
                  <InputNumber onChange={handleUpdateOffset} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Card
            style={{
              maxWidth: 500,
              // marginTop: 16,
            }}
          >
            <h2>Button Appearance</h2>
            <Divider />
            <Row>
              <Col
                span={7}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Background Color
              </Col>
              <Col span={3}>
                <Popover content={bgButton}>
                  <Button
                    style={{
                      width: 20,
                      backgroundColor: `${
                        buttonColor?.hex
                          ? buttonColor?.hex
                          : data?.buttonAppearanceColor
                      }`,
                      marginLeft: 20,
                    }}
                  ></Button>
                </Popover>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col
                span={7}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Text Color
              </Col>
              <Col span={3}>
                <Popover content={bgButtonText}>
                  <Button
                    style={{
                      width: 20,
                      backgroundColor: `${
                        buttonTextColor?.hex
                          ? buttonTextColor?.hex
                          : data?.textButtonAppearanceColor
                      }`,
                      marginLeft: 20,
                    }}
                  ></Button>
                </Popover>
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
      <UIWidget />
    </>
  );
}
