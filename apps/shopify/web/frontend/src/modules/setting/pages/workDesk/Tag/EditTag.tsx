import {
  useJob,
  useLocation,
  useMount,
  useParams,
  useToggle,
} from "@moose-desk/core";
import { Tag, TagRepository } from "@moose-desk/repo";
import { useNavigate, useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  ContextualSaveBar,
  Layout,
  Page,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import TagForm from "src/modules/setting/component/TagForm";
import SettingRoutePaths from "src/modules/setting/routes/paths";

export default function DetailsTag() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const { toggle: updateForm } = useToggle();
  const initialValuesForm = useMemo<any>(() => {
    return {
      name: "",
      description: "",
    };
  }, []);
  const [dataTag, setDataTag] = useState<Tag>();
  const formRef = useRef<FormikProps<any>>(null);
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
  const { t, i18n } = useTranslation();

  const { run: fetDetailsTag } = useJob(
    () => {
      return TagRepository()
        .getOne(id)
        .pipe(
          map(({ data }) => {
            setTitle(`${data.data.name}`);
            setDataTag(data.data);
            return data.data;
          }),
          catchError((err) => {
            show(t("messages:error.something_went_wrong"), { isError: true });
            return of(err);
          })
        );
    },
    { showLoading: false }
  );

  const { run: submit, processing: loading } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return TagRepository()
      .update(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setTitle(`${data.data.name}`);
            setBanner({
              isShow: true,
              message: t("messages:success.update_tag"),
              type: "success",
            });
            show(t("messages:success.update_tag"));
            setDataTag(data.data);
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
                message: t("messages:error.update_tag"),
              });
              show(t("messages:error.update_tag"), {
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
              message: t("messages:error.update_tag"),
            });
            show(t("messages:error.update_tag"), {
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
    formRef.current?.resetForm();
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
      {formRef.current?.dirty && (
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
              initialValues={dataTag || initialValuesForm}
              submit={submit}
              updateForm={updateForm}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
