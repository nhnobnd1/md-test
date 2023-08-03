import { AutoReply } from "@moose-desk/repo";
import { Card, Radio, Typography } from "antd";
import { Form } from "src/components/UI/Form";
import BoxSelectAutoReply from "src/modules/setting/component/BoxSelectAutoReply/BoxSelectAutoReply";
import CustomTimeWorkingCard from "src/modules/setting/component/BusinessHours/CustomTimeWorkingCard";
import useBusinessHour from "src/modules/setting/store/Businesshour";

interface BusinessHoursTabProps {
  disabled?: boolean;
  dataAutoReply: AutoReply[];
}

const BusinessHoursTab = ({
  disabled,
  dataAutoReply,
}: BusinessHoursTabProps) => {
  const updateTabSelected = useBusinessHour((state) => state.updateTabSelected);
  return (
    <div className="p-2">
      <div className="mb-2 mt-2 ml-4">
        <Form.Item name="businessHoursType">
          <Radio.Group className="flex gap-10 flex-wrap">
            <div className="flex">
              <Radio value="24/7">
                <div className="flex flex-col-reverse">
                  <Typography.Text type="secondary">
                    Your agents can respond 24/7
                  </Typography.Text>
                  <Typography.Text> Full-Time Support</Typography.Text>
                </div>
              </Radio>
            </div>
            <div className="flex">
              <Radio value="CUSTOM">
                <div className="flex flex-col-reverse">
                  <Typography.Text type="secondary">
                    Setup custom working hours for your agents
                  </Typography.Text>
                  <Typography.Text>Set Custom Hours</Typography.Text>
                </div>
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>
      <Card title="Working Hours" className="">
        <Form.Item name="businessHours">
          <CustomTimeWorkingCard disabled={disabled} />
        </Form.Item>
      </Card>
      <Form.Item
        name="businessHoursAutoReplyCode"
        label="Auto-Reply"
        className="mb-0 mt-4"
        hidden={!!disabled}
        help={
          <span style={{ fontSize: 13, opacity: 0.6 }}>
            Choose your auto-reply outside of business hours. You can set up new
            message in the{" "}
            <span
              onClick={() => {
                updateTabSelected("3");
              }}
              className="cursor-pointer hover:underline text-blue-500 opacity-1"
            >
              Auto-Reply
            </span>{" "}
            Tab
          </span>
        }
      >
        <BoxSelectAutoReply dataAutoReply={dataAutoReply} />
      </Form.Item>
    </div>
  );
};

export default BusinessHoursTab;
