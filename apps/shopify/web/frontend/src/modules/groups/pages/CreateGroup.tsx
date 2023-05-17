import { generatePath, useJob, useNavigate, useToggle } from "@moose-desk/core";
import { CreateUserGroupRequest, UserGroupRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Card, ContextualSaveBar, Layout, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { map } from "rxjs";
import { Banner } from "src/components/Banner";
import { useBanner } from "src/hooks/useBanner";
import {
  GroupForm,
  GroupFormValues,
} from "src/modules/groups/components/GroupForm";
import GroupsRoutePaths from "src/modules/groups/routes/paths";
import { useStore } from "src/providers/StoreProviders";

interface CreateGroupProps {}

const CreateGroup = (props: CreateGroupProps) => {
  const { show } = useToast();
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const { storeId } = useStore();
  const navigate = useNavigate();
  const { toggle } = useToggle();
  const { t, i18n } = useTranslation();

  const formRef = useRef<FormikProps<any>>(null);

  const { run: createGroupApi, processing: loadingAddGroup } = useJob(
    (payload: CreateUserGroupRequest) => {
      return UserGroupRepository()
        .create(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show(t("messages:success.create_group"));
              navigate(
                generatePath(GroupsRoutePaths.Detail, { id: data.data._id }),
                {
                  state: {
                    banner: {
                      status: "success",
                      message: t("messages:success.create_group"),
                    },
                  },
                }
              );
            } else {
              if (data.errorCode) {
                showBanner("critical", {
                  message: t("messages:error.create_group"),
                });
              }
            }
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const handleSubmit = useCallback(
    (values: GroupFormValues) => {
      const payload: CreateUserGroupRequest = {
        name: values.name,
        description: values.description,
        groupMembers: values.groupMembers,
        storeId,
      };
      createGroupApi(payload);
      window.scrollTo(0, 0);
    },
    [storeId]
  );

  return (
    <>
      {formRef.current?.dirty && (
        <ContextualSaveBar
          fullWidth
          message={"Unsaved changes"}
          saveAction={{
            onAction: () => formRef.current?.submitForm(),
            disabled: !formRef.current?.dirty,
            loading: loadingAddGroup,
          }}
          discardAction={{
            onAction: () => formRef.current?.resetForm(),
          }}
        />
      )}

      <Page
        breadcrumbs={[
          { content: "Groups", url: generatePath(GroupsRoutePaths.Index) },
        ]}
        title="Create new group"
        fullWidth
      >
        <Layout>
          {banner.visible && (
            <Layout.Section>
              <Banner banner={banner} onDismiss={closeBanner}></Banner>
            </Layout.Section>
          )}

          <Layout.Section>
            <Card>
              <Card.Section>
                <GroupForm
                  innerRef={formRef}
                  enableReinitialize
                  onValuesChange={toggle}
                  onSubmit={handleSubmit}
                />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default CreateGroup;
