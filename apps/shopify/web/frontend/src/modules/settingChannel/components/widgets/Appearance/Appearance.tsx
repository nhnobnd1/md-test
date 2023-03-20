import { FormLayout, Text, TextField } from "@shopify/polaris";
import { ButtonColor } from "src/components/ButtonColor";
import FormItem from "src/components/Form/Item";
import RadioGroup from "src/components/Radio/RadioGroup";
import "./Appearance.scss";
interface AppearanceProps {}

const Appearance = (props: AppearanceProps) => {
  return (
    <div className="Appearance">
      <div className="card-contact mb-4">
        <div className="header">
          <Text as="h5" variant="headingMd">
            Widget Appearance
          </Text>
        </div>
        <div className="body">
          <FormLayout>
            <div className="flex items-center mb-2">
              <div className="mr-4">
                <Text as="span" variant="bodyMd">
                  Header Background Color:
                </Text>
              </div>
              <FormItem name="headerBackgroundColor">
                <ButtonColor />
              </FormItem>
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-4">
                <Text as="span" variant="bodyMd">
                  Text Color:
                </Text>
              </div>
              <FormItem name="headerTextColor">
                <ButtonColor />
              </FormItem>
            </div>
          </FormLayout>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <div className="mr-4">
          <Text as="span" variant="bodyMd">
            Widget Position:
          </Text>
        </div>
        <FormItem name="widgetPosition">
          <RadioGroup
            layout={"inline"}
            options={[
              { label: "Bottom Left", value: "left" },
              { label: "Bottom Right", value: "right" },
            ]}
          />
        </FormItem>
      </div>
      <div className="ml-[-20px] mb-6">
        <FormLayout.Group>
          <FormItem name="offsetBottom">
            <TextField
              label="Offset from bottom (pixels)"
              type="number"
              autoComplete="off"
            />
          </FormItem>
          <FormItem name="offsetHorizontal">
            <TextField
              label="Offset from left/right (pixels)"
              type="number"
              autoComplete="off"
            />
          </FormItem>
        </FormLayout.Group>
      </div>
      <div className="card-contact mb-4">
        <div className="header">
          <Text as="h5" variant="headingMd">
            Button Appearance
          </Text>
        </div>
        <div className="body">
          <FormLayout>
            <div className="flex items-center mb-2">
              <div className="mr-4">
                <Text as="span" variant="bodyMd">
                  Background Color:
                </Text>
              </div>
              <FormItem name="buttonAppearanceColor">
                <ButtonColor />
              </FormItem>
            </div>

            <div className="flex items-center mb-2">
              <div className="mr-4">
                <Text as="span" variant="bodyMd">
                  Text Color:
                </Text>
              </div>
              <FormItem name="textButtonAppearanceColor">
                <ButtonColor />
              </FormItem>
            </div>
          </FormLayout>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
