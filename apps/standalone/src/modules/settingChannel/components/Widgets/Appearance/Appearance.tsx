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
import { useCallback, useMemo, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { UIWidget } from "src/modules/settingChannel/components/Widgets/UIWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
import ArrowDownLeft from "~icons/bi/box-arrow-down-left";
import ArrowDownRight from "~icons/bi/box-arrow-down-right";

export default function Appearance() {
  const [color, setColor] = useState<ColorResult>();
  const [textColor, setTextColor] = useState<ColorResult>();
  const [buttonColor, setButtonColor] = useState<ColorResult>();
  const [buttonTextColor, setButtonTextColor] = useState<ColorResult>();

  const [targetButton, setTargetButton] = useState<number>(1);

  const { rgb } = color || {};
  const { rgb: rgbText } = textColor || {};
  const { rgb: rgbButton } = buttonColor || {};
  const { rgb: rgbButtonText } = buttonTextColor || {};

  const [form] = Form.useForm();
  const data = useWidgetSetting((state) => state.widgetSetting);
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );

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

  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ marginTop: 20, position: "relative" }}
        initialValues={{
          widgetBackgroundColor: "",
          widgetTextColor: "",
          widgetPosition: "",
          offsetBot: 30,
          offsetHorizontal: 30,
          buttonBackgroundColor: "",
          textColor: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        autoComplete="off"
      >
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
                    backgroundColor: `${color?.hex}`,
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
                    backgroundColor: `${textColor?.hex}`,
                    marginLeft: 20,
                  }}
                ></Button>
              </Popover>
            </Col>
          </Row>
        </Card>

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
            onClick={() => {
              handleChangeTargetButton(1);
              updateWidgetSetting({
                ...data,
                widgetPosition: "left",
              });
            }}
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
            onClick={() => {
              handleChangeTargetButton(2);
              updateWidgetSetting({
                ...data,
                widgetPosition: "right",
              });
            }}
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
          <Col span={20}>
            <Form.Item
              labelAlign="left"
              label="Offset from bottom (pixels)"
              name="offsetBot"
            >
              <InputNumber
                onChange={(e: any) => {
                  updateWidgetSetting({
                    ...data,
                    offsetBottom: e,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={20}>
            <Form.Item
              labelAlign="left"
              label="Offset from left/right (pixels)"
              name="offsetHorizontal"
            >
              <InputNumber
                onChange={(e: any) => {
                  updateWidgetSetting({
                    ...data,
                    offsetHorizontal: e,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

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
                    backgroundColor: `${buttonColor?.hex}`,
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
                    backgroundColor: `${buttonTextColor?.hex}`,
                    marginLeft: 20,
                  }}
                ></Button>
              </Popover>
            </Col>
          </Row>
        </Card>
        <UIWidget />
      </Form>
    </>
  );
}
