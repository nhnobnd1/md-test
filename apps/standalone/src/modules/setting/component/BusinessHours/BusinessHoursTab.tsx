import { AutoReply } from "@moose-desk/repo";
import { Card, Radio, Space, Typography } from "antd";
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
          <Radio.Group>
            <Space align="center" size={120}>
              <div className="flex">
                <div>
                  <Radio value="24/7" />
                </div>
                <div className="flex flex-col-reverse">
                  <Typography.Text type="secondary">
                    Fulltime support
                  </Typography.Text>
                  <Typography.Text>24hrs x7 days</Typography.Text>
                </div>
              </div>
              <div className="flex">
                <div>
                  <Radio value="CUSTOM" />
                </div>
                <div className="flex flex-col-reverse">
                  <Typography.Text type="secondary">
                    Setup custom working hours for your agents
                  </Typography.Text>
                  <Typography.Text>Custom Business hours</Typography.Text>
                </div>
              </div>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>
      <Card title="Working Hours">
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