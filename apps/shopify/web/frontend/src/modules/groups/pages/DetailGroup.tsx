import {
  generatePath,
  useJob,
  useLocation,
  useNavigate,
  useParams,
  useToggle,
} from "@moose-desk/core";
import {
  UpdateUserGroupRequest,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Card, ContextualSaveBar, Layout, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Banner } from "src/components/Banner";
import useAuth from "src/hooks/useAuth";
import { useBanner } from "src/hooks/useBanner";
import { GroupForm } from "src/modules/groups/components/GroupForm";
import GroupsRoutePaths from "src/modules/groups/routes/paths";

interface DetailGroupProps {}

const DetailGroup = (props: DetailGroupProps) => {
  const { show } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<FormikProps<any>>(null);
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const [group, setGroup] = useState<UserGroup>();
  const { state } = useLocation();
  const { toggle: updateForm } = useToggle();
  const { id } = useParams();

  const { run: getGroupApi } = useJob(() => {
    return UserGroupRepository()
      .getOne(id ?? "")
      .pipe(
        map(({ data }) => {
          setGroup(data.data);
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });

  const { run: updateGroupApi, processing: loadingUpdateGroup } = useJob(
    (id: string, payload: UpdateUserGroupRequest) => {
      return UserGroupRepository()
        .update(id, payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show("Update Group Success");
              navigate(
                generatePath(GroupsRoutePaths.Detail, { id: data.data._id }),
                {
                  state: {
                    banner: {
                      status: "success",
                      message: `Group has been updated succcesfully.`,
                    },
                  },
                }
              );
              setGroup(data.data);
            } else {
              if (data.errorCode) {
                showBanner("critical", {
                  message: "Update group failed.",
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

  const initialValues = useMemo(() => {
    return {
      name: group?.name ?? "",
      description: group?.description ?? "",
      groupMembers: group?.memberIds ?? [],
    };
  }, [group]);

  const handleSubmit = useCallback(
    (values) => {
      if (id) {
        updateGroupApi(id, values);
        window.scrollTo(0, 0);
      }
    },
    [id]
  );

  useEffect(() => {
    if (state?.banner && state.banner?.status) {
      showBanner(state.banner.status, {
        title: state.banner.title ?? "",
        message: state.banner.message ?? "",
      });
    }
  }, [state]);

  useEffect(() => {
    getGroupApi();
  }, []);

  return (
    <>
      {formRef.current?.dirty && (
        <ContextualSaveBar
          fullWidth
          message={"Unsaved changes"}
          saveAction={{
            onAction: () => formRef.current?.submitForm(),
            disabled: !formRef.current?.dirty,
            loading: loadingUpdateGroup,
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
        title={group?.name || "Detail Group"}
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
                  initialValues={initialValues}
                  enableReinitialize
                  onValuesChange={updateForm}
                  id={id}
                  innerRef={formRef}
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

export default DetailGroup;
