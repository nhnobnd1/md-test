import { BusinessHoursType } from "@moose-desk/repo";
import {
  Button,
  ButtonGroup,
  Card,
  Layout,
  Page,
  Stack,
  Tabs,
  Text,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef, useState } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import AutoReplyTab from "src/modules/setting/component/AutoReply/AutoReplyTab";
import BoxSelectAutoReply from "src/modules/setting/component/BusinessHours/BoxSelectAutoReply";
import BusinessHoursTab from "src/modules/setting/component/BusinessHours/BusinessHoursTab";
import HolidayTab from "src/modules/setting/component/Holidays/HolidayTab";
import SelectTimeZone from "src/modules/setting/component/SelectTimeZone/SelectTimeZone";
import { tabs } from "src/modules/setting/constaint/constaint";
import "./BusinessHours.scss";
interface BusinessHoursProps {}

const BusinessHours = (props: BusinessHoursProps) => {
  const [selected, setSelected] = useState(0);
  const formRef = useRef<FormikProps<any>>(null);
  const [disabled, setDisabled] = useState(false);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const handleSubmit = useCallback((data: any) => {
    console.log("data", data);
  }, []);
  const handleChangeValues = useCallback((value) => {
    if (value.businessHoursType) {
      switch (value.businessHoursType) {
        case BusinessHoursType.Full:
          setDisabled(true);
          break;
        case BusinessHoursType.Custom:
          setDisabled(false);
          break;
        default:
          break;
      }
    }
  }, []);
  return (
    <>
      <Page title="Business Hours" fullWidth>
        <Form
          initialValues={{}}
          ref={formRef}
          onSubmit={handleSubmit}
          onValuesChange={handleChangeValues}
          enableReinitialize
        >
          <Card sectioned>
            <Layout>
              <Layout.Section>
                <div className="flex items-center content-between">
                  <Text as="span" variant="bodyMd">
                    Time zone:
                  </Text>
                  <div className="w-3/6 ml-4">
                    <FormItem name="timezone">
                      <SelectTimeZone />
                    </FormItem>
                  </div>
                </div>
              </Layout.Section>
              <Layout.Section>
                <Card>
                  <Tabs
                    tabs={tabs}
                    selected={selected}
                    onSelect={handleTabChange}
                  >
                    <div className="tabs">
                      {selected === 0 ? (
                        <BusinessHoursTab disabled={disabled} />
                      ) : null}
                      {selected === 1 ? (
                        <FormItem name="holidays">
                          <HolidayTab />
                        </FormItem>
                      ) : null}
                      {selected === 2 ? (
                        <FormItem name="auto-reply">
                          <AutoReplyTab />
                        </FormItem>
                      ) : null}
                    </div>
                  </Tabs>

                  {!disabled && selected === 0 ? (
                    <Card.Section>
                      <div className="flex items-center content-between">
                        <div className="mr-4">
                          <Text as="span" variant="bodyMd">
                            Auto-Reply
                          </Text>
                        </div>
                        <BoxSelectAutoReply />
                      </div>
                    </Card.Section>
                  ) : null}
                </Card>
              </Layout.Section>
              <Layout.Section>
                <Stack distribution="trailing">
                  <ButtonGroup>
                    <Button onClick={() => formRef.current?.resetForm()}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => formRef.current?.submitForm()}
                      primary
                    >
                      Save
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Layout.Section>
            </Layout>
          </Card>
        </Form>
      </Page>
    </>
  );
};

export default BusinessHours;
