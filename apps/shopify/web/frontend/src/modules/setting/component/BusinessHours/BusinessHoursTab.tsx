import { Card } from "@shopify/polaris";
import FormItem from "src/components/Form/Item";
import RadioGroup from "src/components/RadioGroup/RadioGroup";
import RowCheckbox from "src/modules/setting/component/BusinessHours/RowCheckbox";
interface BusinessHoursTabProps {
  disabled?: boolean;
}

const BusinessHoursTab = ({ disabled, ...props }: BusinessHoursTabProps) => {
  return (
    <div className="p-2">
      <div className="mb-2 mt-2 ml-4">
        <FormItem name="businessHoursType">
          <RadioGroup
            options={[
              {
                label: "Full-Time Support",
                helpText: "Your agents can respond 24/7",
                id: "24/7",
              },
              {
                label: "Set Custom Hours",
                helpText: "Setup custom working hours for your agents",
                id: "CUSTOM",
              },
            ]}
            vertical={false}
          ></RadioGroup>
        </FormItem>
      </div>
      <Card title="Working Hours" subdued={disabled} sectioned>
        <FormItem name="businessHours">
          <RowCheckbox disabled={disabled} />
        </FormItem>
      </Card>
    </div>
  );
};

export default BusinessHoursTab;
