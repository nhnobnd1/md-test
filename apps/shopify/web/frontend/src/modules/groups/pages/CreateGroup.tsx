import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import { CreateUserGroupRequest, UserGroupRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Card, ContextualSaveBar, Layout, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef } from "react";
import { map } from "rxjs";
import { Banner } from "src/components/Banner";
import useAuth from "src/hooks/useAuth";
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
  const { user } = useAuth();
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const { storeId } = useStore();
  const navigate = useNavigate();
  const formRef = useRef<FormikProps<any>>(null);

  const { run: createGroupApi, processing: loadingAddGroup } = useJob(
    (payload: CreateUserGroupRequest) => {
      return UserGroupRepository()
        .create(payload)
        .pipe(
          map(({ data }) => {
            console.log(data);
            if (data.statusCode === 200) {
              show("Create Group Success");
              navigate(
                generatePath(GroupsRoutePaths.Detail, { id: data.data._id }),
                {
                  state: {
                    banner: {
                      status: "success",
                      message: `Create group success.`,
                    },
                  },
                }
              );
            } else {
              if (data.errorCode) {
                showBanner("critical", {
                  message: "Create group failed.",
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
    },
    [storeId]
  );

  return (
    <>
      <ContextualSaveBar
        fullWidth
        message="Unsaved changes"
        saveAction={{
          onAction: () => formRef.current?.submitForm(),
          disabled: false,
          loading: loadingAddGroup,
        }}
        discardAction={{
          onAction: () => {},
        }}
      />
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
                <GroupForm innerRef={formRef} onSubmit={handleSubmit} />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default CreateGroup;
