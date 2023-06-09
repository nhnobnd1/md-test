import { useJob, useToggle } from "@moose-desk/core";
import { CreateTagRequest, TagRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, Modal } from "@shopify/polaris";
import { FormikProps } from "formik";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import useAuth from "src/hooks/useAuth";
import TagForm from "src/modules/setting/component/TagForm";

interface ModalAddNewTagProps {
  fetchListTag: () => void;
}

export const ModalAddNewTag: FC<ModalAddNewTagProps> = ({ fetchListTag }) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const formRef = useRef<FormikProps<any>>(null);
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const { toggle: updateForm } = useToggle();
  const auth = useAuth();

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);
  const handleResetForm = useCallback(() => {
    formRef.current?.resetForm();
  }, [formRef.current]);
  const activator = (
    <Button
      primary
      onClick={() => {
        setActive(true);
      }}
    >
      Add new
    </Button>
  );

  const initialValuesForm = useMemo(() => {
    return {
      name: "",
      description: "",
      storeId: auth.user?.id ?? "",
    };
  }, [auth.user]);
  const { run: submit, processing: loading } = useJob(
    (dataSubmit: CreateTagRequest) => {
      return TagRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show(t("messages:success.create_tag"));
              fetchListTag();
              setActive(false);
            } else {
              setActive(false);
              if (data.statusCode === 409) {
                show(`Tag name is ${dataSubmit.name} already exists.`, {
                  isError: true,
                });
              } else {
                show(t("messages:error.create_tag"), {
                  isError: true,
                });
              }
            }
          }),
          catchError((error) => {
            setActive(false);
            if (error.response.status === 409) {
              show(`Tag name is ${dataSubmit.name} already exists.`, {
                isError: true,
              });
            } else {
              show(t("messages:error.create_tag"), {
                isError: true,
              });
            }
            return of(error);
          })
        );
    }
  );
  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Create Tag"
        primaryAction={{
          content: "Apply",
          onAction: handleSubmitForm,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              setActive(false);
            },
          },
        ]}
      >
        <Modal.Section>
          <TagForm
            ref={formRef}
            submit={submit}
            updateForm={updateForm}
            initialValues={initialValuesForm}
          />
        </Modal.Section>
      </Modal>
    </div>
  );
};
