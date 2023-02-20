import { generatePath, useJob, useNavigate, useToggle } from "@moose-desk/core";
import { CreateTagRequest, TagRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Banner, ContextualSaveBar, Layout, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import useAuth from "src/hooks/useAuth";
import TagForm from "src/modules/setting/component/TagForm";
import SettingRoutePaths from "src/modules/setting/routes/paths";

export default function CreateTag() {
  const formRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { show } = useToast();
  const [messageError, setMessageError] = useState("");
  const { toggle: updateForm } = useToggle();
  const [banner, setBanner] = useState(false);
  const initialValuesForm = useMemo(() => {
    return {
      name: "",
      description: "",
      storeId: auth.user?.id ?? "",
    };
  }, [auth.user]);

  const navigateShowDetails = useCallback((id: string, statusCode: number) => {
    navigate(generatePath(SettingRoutePaths.Workdesk.Tag.Edit, { id }), {
      state: { status: statusCode },
    });
  }, []);
  const { run: submit, processing: loading } = useJob(
    (dataSubmit: CreateTagRequest) => {
      return TagRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show("Tag has been created successfully.");
              navigateShowDetails(data.data._id, data.statusCode);
            } else {
              setBanner(true);
              if (data.statusCode === 409) {
                setMessageError(
                  `Tag name is ${dataSubmit.name} already exists.`
                );
                show(`Tag name is ${dataSubmit.name} already exists.`, {
                  isError: true,
                });
              } else {
                show("Create tag failed", {
                  isError: true,
                });
              }
            }
          }),
          catchError((error) => {
            setBanner(true);
            if (error.response.status === 409) {
              setMessageError(`Tag name is ${dataSubmit.name} already exists.`);
              show(`Tag name is ${dataSubmit.name} already exists.`, {
                isError: true,
              });
            } else {
              show("Create tag failed", {
                isError: true,
              });
            }
            return of(error);
          })
        );
    }
  );

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);

  const handleResetForm = useCallback(() => {
    formRef.current?.resetForm();
  }, [formRef.current]);

  return (
    <>
      {!formRef.current?.dirty ? null : (
        <ContextualSaveBar
          fullWidth
          message="Unsaved changes"
          saveAction={{
            onAction: handleSubmitForm,
            disabled: !formRef.current?.dirty,
            loading: loading,
          }}
          discardAction={{
            onAction: handleResetForm,
          }}
        />
      )}
      <Page
        title="Create tag"
        compactTitle
        breadcrumbs={[
          { onAction: () => navigate(SettingRoutePaths.Workdesk.Tag.Index) },
        ]}
        fullWidth
      >
        <Layout sectioned>
          <Layout.Section>
            {banner ? (
              <Banner status="critical" onDismiss={() => setBanner(false)}>
                {messageError}
              </Banner>
            ) : null}
          </Layout.Section>
          <Layout.Section>
            <TagForm
              ref={formRef}
              submit={submit}
              updateForm={updateForm}
              initialValues={initialValuesForm}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
