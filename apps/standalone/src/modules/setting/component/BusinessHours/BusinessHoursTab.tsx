import { AutoReply } from "@moose-desk/repo";
import { Card, Radio, Typography } from "antd";
import { Form } from "src/components/UI/Form";
import BoxSelectAutoReply from "src/modules/setting/component/BoxSelectAutoReply/BoxSelectAutoReply";
import CustomTimeWorkingCard from "src/modules/setting/component/BusinessHours/CustomTimeWorkingCard";

interface BusinessHoursTabProps {
  disabled?: boolean;
  dataAutoReply: AutoReply[];
}

const BusinessHoursTab = ({
  disabled,
  dataAutoReply,
  ...props
}: BusinessHoursTabProps) => {
  return (
    <div className="p-2">
      <div className="mb-2 mt-2 ml-4">
        <Form.Item name="businessHoursType">
          <Radio.Group className="flex gap-10 flex-wrap">
            <div className="flex">
              <Radio value="24/7">
                <div className="flex flex-col-reverse">
                  <Typography.Text type="secondary">
                    Fulltime support
                  </Typography.Text>
                  <Typography.Text>24hrs x7 days</Typography.Text>
                </div>
              </Radio>
            </div>
            <div className="flex">
              <Radio value="CUSTOM">
                <div className="flex flex-col-reverse">
                  <Typography.Text type="secondary">
                    Setup custom working hours for your agents
                  </Typography.Text>
                  <Typography.Text>Custom Business hours</Typography.Text>
                </div>
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>
      <Card title="Working Hours" className="overflow-scroll">
        <Form.Item name="businessHours">
          <CustomTimeWorkingCard disabled={disabled} />
        </Form.Item>
      </Card>
      <Form.Item
        name="businessHoursAutoReplyCode"
        label=" Auto-Reply"
        className="mb-0 mt-4"
        hidden={!!disabled}
      >
        <BoxSelectAutoReply dataAutoReply={dataAutoReply} />
      </Form.Item>
    </div>
  );
};

export default BusinessHoursTab;
