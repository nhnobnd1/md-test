import { useToast } from "@shopify/app-bridge-react";
import { Banner, ContextualSaveBar, Layout, Page } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import { useJob } from "src/core/hooks";
import useAuth from "src/hooks/useAuth";
import TagForm from "src/modules/setting/component/TagForm";
import { CreateTagRequest } from "src/modules/setting/modal/workDesk/Tag";
import TagRepository from "src/modules/setting/repository/workDesk/TagRepository";
import SettingRoutePaths from "src/modules/setting/routes/paths";

export default function CreateTag() {
  const formRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { show } = useToast();
  const [disable, setDisable] = useState(true);
  const [messageError, setMessageError] = useState("");
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
  const { run: submit } = useJob((dataSubmit: CreateTagRequest) => {
    return TagRepository.create(dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          show("Tag has been created successfully.");
          navigateShowDetails(data.data._id, data.statusCode);
        } else {
          setBanner(true);
          if (data.statusCode === 409) {
            setMessageError(`Tag name is ${dataSubmit.name} already exists.`);
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
  });

  const handleChangeValueForm = (value: boolean) => {
    setDisable(value);
  };

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);

  const handleResetForm = useCallback(() => {
    formRef.current?.resetForm();
  }, [formRef.current]);

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
              change={handleChangeValueForm}
              initialValues={initialValuesForm}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
