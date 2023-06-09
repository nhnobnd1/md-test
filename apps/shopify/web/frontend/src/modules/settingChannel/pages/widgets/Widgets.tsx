import { MediaScreen, generatePath, useJob, useToggle } from "@moose-desk/core";
import {
  BaseListHelpWidgetRequest,
  GetListHelpWidgetRequest,
  HelpWidget,
  HelpWidgetRepository,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  ContextualSaveBar,
  Layout,
  LegacyCard,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Tabs,
  TextContainer,
} from "@shopify/polaris";
import classNames from "classnames";
import { FormikProps } from "formik";
import { isEqual } from "lodash-es";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { Banner } from "src/components/Banner";
import Form from "src/components/Form";
import env from "src/core/env";
import { useBanner } from "src/hooks/useBanner";
import usePreventNav from "src/hooks/usePreventNav";
import Appearance from "src/modules/settingChannel/components/widgets/Appearance/Appearance";
import General from "src/modules/settingChannel/components/widgets/General/General";
import Integration from "src/modules/settingChannel/components/widgets/Integration/Integration";
import { ViewWidget } from "src/modules/settingChannel/components/widgets/ViewWidget";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";

interface WidgetsProps {}

const tabs = [
  {
    id: "general",
    content: "General",
    accessibilityLabel: "General",
    panelID: "general",
  },
  {
    id: "appearance",
    content: "Appearance",
    panelID: "appearance",
  },
  {
    id: "integration",
    content: "Integration",
    panelID: "integration",
  },
];

const Widgets = (props: WidgetsProps) => {
  const [selected, setSelected] = useState(0);
  const { toggle: updateForm } = useToggle();
  const formRef = useRef<FormikProps<any>>(null);
  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );
  const updateSave = useUpdateSave((state) => state.changeUpdate);
  const [initialValues, setInitialValues] = useState(widgetSetting);
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  usePreventNav(MediaScreen.XL);
  const defaultFilter: () => GetListHelpWidgetRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });

  const [filterData, setFilterData] =
    useState<BaseListHelpWidgetRequest>(defaultFilter);

  const [widget, setWidget] = useState<HelpWidget>();

  const { run: getListHelpWidgetApi, processing } = useJob(
    (payload: GetListHelpWidgetRequest) => {
      return HelpWidgetRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setWidget(data.data[0]);

              setInitialValues({
                ...data?.data[0]?.settings,
                id: data.data[0]._id,
              } as any);

              updateWidgetSetting({
                ...data?.data[0]?.settings,
                id: data.data[0]._id,
              });
            } else {
              show("Get data widget failed", {
                isError: true,
              });
            }
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const { run: updateHelpWidgetApi } = useJob(
    (id: string, object: any) => {
      return HelpWidgetRepository()
        .update(id, object)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                show(t("messages:success.update_help_widget"));
                showBanner("success", {
                  title: "",
                  message: t("messages:success.update_help_widget"),
                });
                setInitialValues({
                  ...data.data.settings,
                  id: data.data._id,
                } as any);
                updateWidgetSetting(data.data.settings);
                setWidget(data.data);
              } else {
                showBanner("critical", {
                  title: "",
                  message: t("messages:error.update_help_widget"),
                });
                if (data.statusCode === 409) {
                  show(t("messages:error.update_help_widget"), {
                    isError: true,
                  });
                }
              }
            },
            catchError((err) => {
              const errorCode = err.response.status;
              showBanner("critical", {
                title: "",
                message: t("messages:error.update_help_widget"),
              });
              if (errorCode === 409) {
                show(t("messages:error.update_help_widget"), {
                  isError: true,
                });
              } else {
                show(t("messages:error.update_help_widget"), {
                  isError: true,
                });
              }
              return of(err);
            })
          )
        );
    },
    { showLoading: true }
  );

  const isDirty = useMemo(() => {
    return !isEqual(
      JSON.stringify(initialValues),
      JSON.stringify(widgetSetting)
    );
  }, [initialValues, widgetSetting]);

  useEffect(() => {
    getListHelpWidgetApi(filterData);
  }, [filterData]);

  useEffect(() => {
    return () => {
      updateWidgetSetting(initialValues);
    };
  }, []);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    []
  );

  const handleChangeForm = useCallback(
    (values: any, oldValues: any) => {
      updateWidgetSetting(values);
      updateForm();
    },
    [updateForm]
  );

  const handleSaveWidget = useCallback(() => {
    updateHelpWidgetApi(widget?._id as string, {
      name: widget?.name,
      settings: widgetSetting,
    });
    updateSave(new Date());
  }, [widgetSetting, widget]);

  return (
    <>
      {isDirty && (
        <ContextualSaveBar
          fullWidth
          message={"Unsaved changes"}
          saveAction={{
            onAction: () => formRef.current?.submitForm(),
            disabled: !isDirty,
          }}
          discardAction={{
            onAction: () => updateWidgetSetting(initialValues),
          }}
        />
      )}
      {processing ? (
        <Page fullWidth>
          <SkeletonPage />
          <Layout>
            <Layout.Section>
              <LegacyCard sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="extraLarge" />
                  <SkeletonBodyText />
                </TextContainer>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      ) : (
        <Page
          breadcrumbs={[
            {
              content: "Channel-settings",
              url: generatePath(SettingChannelRoutePaths.Index),
            },
          ]}
          title={(<span>Web Form</span>) as unknown as string}
          fullWidth
        >
          <Layout>
            {banner.visible && (
              <Layout.Section>
                <Banner banner={banner} onDismiss={closeBanner}></Banner>
              </Layout.Section>
            )}
            <Layout.Section>
              <LegacyCard>
                <Tabs
                  tabs={tabs}
                  selected={selected}
                  onSelect={handleTabChange}
                >
                  <LegacyCard.Section>
                    <div className={classNames({ hidden: selected === 2 })}>
                      <div className="flex gap-[24px] flex-wrap-reverse xs:justify-center md:justify-start">
                        <div className="view-widgets mr-[24px]">
                          <LegacyCard sectioned>
                            <ViewWidget />
                          </LegacyCard>
                        </div>

                        <div className="tab-widgets max-w-[500px] flex-1">
                          <Form
                            innerRef={formRef}
                            initialValues={widgetSetting}
                            enableReinitialize
                            onSubmit={handleSaveWidget}
                            onValuesChange={handleChangeForm}
                          >
                            <div
                              className={classNames({ hidden: selected !== 0 })}
                            >
                              <General />
                            </div>
                            <div
                              className={classNames({ hidden: selected !== 1 })}
                            >
                              <Appearance />
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <div className={classNames({ hidden: selected !== 2 })}>
                      <Integration idWidget={widget?._id}></Integration>
                    </div>
                  </LegacyCard.Section>
                </Tabs>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </>
  );
};

export default Widgets;
