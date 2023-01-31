import { useJob, useLocation, useMount, useParams } from "@moose-desk/core";
import { TagRepository } from "@moose-desk/repo";
import { useNavigate, useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  ContextualSaveBar,
  Layout,
  Page,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import TagForm from "src/modules/setting/component/TagForm";
import SettingRoutePaths from "src/modules/setting/routes/paths";

export default function DetailsTag() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState("");

  const formRef = useRef<FormikProps<any>>(null);
  const [disable, setDisable] = useState(true);
  const [banner, setBanner] = useState<{
    isShow: boolean;
    message: string;
    type: BannerStatus;
  }>({
    isShow: false,
    message: "",
    type: "success",
  });
  const { show } = useToast();
  const { run: fetDetailsTag, result } = useJob(
    () => {
      return TagRepository()
        .getOne(id)
        .pipe(
          map(({ data }) => {
            setTitle(`${data.data.name}`);
            return data.data;
          })
        );
    },
    { showLoading: false }
  );
  const handleChangeValueForm = (value: boolean) => {
    setDisable(value);
  };
  const { run: submit } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return TagRepository()
      .update(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setTitle(`${data.data.name}`);
            setBanner({
              isShow: true,
              message: "Tag has been updated succcesfully.",
              type: "success",
            });
            show("Tag has been updated succcesfully.");
          } else {
            if (data.statusCode === 409) {
              setBanner({
                isShow: true,
                type: "critical",
                message: `Tag name is ${dataSubmit.name} already exists.`,
              });
              show(`Tag name is ${dataSubmit.name} already exists.`, {
                isError: true,
              });
            } else {
              setBanner({
                isShow: true,
                type: "critical",
                message: "Customer Profile has been updated failed.",
              });
              show("Customer Profile has been updated failed.", {
                isError: true,
              });
            }
          }
        }),
        catchError((error) => {
          if (error.response.status === 409) {
            setBanner({
              isShow: true,
              type: "critical",
              message: `Tag name is ${dataSubmit.name} already exists.`,
            });
            show(`Tag name is ${dataSubmit.name} already exists.`, {
              isError: true,
            });
          } else {
            setBanner({
              isShow: true,
              type: "critical",
              message: "Customer Profile has been updated failed.",
            });
            show("Customer Profile has been updated failed.", {
              isError: true,
            });
          }
          return of(error);
        })
      );
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);
  const handleResetForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);
  useMount(() => {
    fetDetailsTag();
  });
  useEffect(() => {
    if (state ? state.status === 200 : false) {
      setBanner({
        isShow: true,
        message: "Tag has been created successfully.",
        type: "success",
      });
    }
  }, []);
  return (
    <>
      {!formRef.current?.dirty ? null : (
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
      )}
      <Page
        title={title}
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
                title={undefined}
                status={banner.type}
                onDismiss={() => setBanner({ ...banner, isShow: false })}
              >
                {banner.message}
              </Banner>
            ) : null}
          </Layout.Section>
          <Layout.Section>
            <TagForm
              ref={formRef}
              initialValues={result}
              submit={submit}
              change={handleChangeValueForm}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
