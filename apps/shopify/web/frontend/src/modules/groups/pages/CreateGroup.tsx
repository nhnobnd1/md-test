import { generatePath, useNavigate } from "@moose-desk/core";
import { useToast } from "@shopify/app-bridge-react";
import { Card, ContextualSaveBar, Layout, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef } from "react";
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
  console.log(storeId);

  const handleSubmit = useCallback(
    (values: GroupFormValues) => {
      console.log(values, storeId);
    },
    [user]
  );

  return (
    <>
      <ContextualSaveBar
        fullWidth
        message="Unsaved changes"
        saveAction={{
          onAction: () => {},
          disabled: false,
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
