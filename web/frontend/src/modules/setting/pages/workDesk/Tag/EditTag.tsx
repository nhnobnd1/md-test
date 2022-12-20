import { useNavigate, useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  Card,
  ContextualSaveBar,
  Layout,
  Page,
  Tabs,
} from "@shopify/polaris";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import { useJob, useMount } from "src/core/hooks";
import TagForm, { RefProperties } from "src/modules/setting/component/TagForm";
import TagRepository from "src/modules/setting/repository/workDesk/TagRepository";
import SettingRoutePaths from "src/modules/setting/routes/paths";
export default function DetailsTag() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const formRef = useRef<RefProperties>(null);
  const [disable, setDisable] = useState(true);
  const [banner, setBanner] = useState<{
    isShow: boolean;
    message: string;
    type: BannerStatus;
    title: string;
  }>({
    isShow: false,
    message: "",
    type: "success",
    title: "",
  });
  const { show } = useToast();
  const { run: fetDetailsTag, result } = useJob(
    () => {
      return TagRepository.getOne(id).pipe(
        map(({ data }) => {
          return data.data;
        })
      );
    },
    { showLoading: false }
  );
  const [selectedTabs, setSelectedTabs] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTabs(selectedTabIndex),
    []
  );
  const handleChangeValueForm = (value: boolean) => {
    setDisable(value);
  };
  const { run: submit } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return TagRepository.update(_id, dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          setBanner({
            isShow: true,
            message: "Edit tag success",
            type: "success",
            title: "Edit tag is successful",
          });
          show("Edit tag success");
        } else {
          setBanner({
            message: "Edit tag is success",
            isShow: true,
            type: "critical",
            title: "There is an error with this tag initialization",
          });
          show("Edit tag failed", {
            isError: true,
          });
        }
      }),
      catchError((error) => {
        setBanner({
          isShow: true,
          message: error.response.data.error[0],
          type: "critical",
          title: "There is an error with this tag initialization",
        });
        show("Edit tag failed", {
          isError: true,
        });
        return of(error);
      })
    );
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.save();
  }, []);
  const handleResetForm = useCallback(() => {
    formRef.current?.reset();
  }, []);
  const profileTag = (
    <TagForm
      ref={formRef}
      initialValues={result}
      submit={submit}
      change={handleChangeValueForm}
    />
  );
  const tabs = [
    {
      id: "tag-profile",
      content: "Tag profile",
      value: profileTag,
      accessibilityLabel: "Tag profile",
      panelID: "tag-profile",
    },
    {
      id: "list-ticket-of-tag",
      content: "List ticket",
      value: "List ticket",
      panelID: "list-ticket-of-tag",
    },
  ];
  useMount(() => {
    fetDetailsTag();
  });
  useEffect(() => {
    if (state ? state.status === 200 : false) {
      setBanner({
        isShow: true,
        message: "Create tag is success",
        type: "success",
        title: "Create tag is successful",
      });
    }
  }, []);
  return (
    <>
      <ContextualSaveBar
        fullWidth
        message="Unsaved changes"
        saveAction={{
          onAction: handleSubmitForm,
          disabled: disable,
        }}
        discardAction={{
          onAction: handleResetForm,
        }}
      />
      <Page
        title={`${result?.name}`}
        subtitle="Details Tag"
        compactTitle
        breadcrumbs={[
          { onAction: () => navigate(SettingRoutePaths.Workdesk.Tag.Index) },
        ]}
        fullWidth
      >
        <Layout sectioned>
          <Layout.Section>
            {banner.isShow ? (
              <Banner
                title={banner.title}
                status={banner.type}
                onDismiss={() => setBanner({ ...banner, isShow: false })}
              ></Banner>
            ) : null}
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Tabs
                tabs={tabs}
                selected={selectedTabs}
                onSelect={handleTabChange}
              >
                <Card.Section title={tabs[selectedTabs].content}>
                  {tabs[selectedTabs].value}
                </Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
