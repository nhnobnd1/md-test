import { useJob, useToggle } from "@moose-desk/core";
import { Tag, TagRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, Icon, Modal } from "@shopify/polaris";
import { EditMajor } from "@shopify/polaris-icons";
import { FormikProps } from "formik";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import TagForm from "src/modules/setting/component/TagForm";

interface ModalDetailTagProps {
  dataTag: Tag;
  fetchListTag: () => void;
}

export const ModalDetailTag: FC<ModalDetailTagProps> = ({
  dataTag,
  fetchListTag,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const formRef = useRef<FormikProps<any>>(null);
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const { toggle: updateForm } = useToggle();

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);

  const activator = (
    <Button
      onClick={() => {
        setActive(true);
      }}
      icon={() => <Icon source={() => <EditMajor />} color="base" />}
    ></Button>
  );

  const initialValuesForm = useMemo(() => {
    return {
      name: "",
      description: "",
    };
  }, []);
  const { run: submit, processing: loading } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return TagRepository()
      .update(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setActive(false);
            fetchListTag();
            show(t("messages:success.update_tag"));
          } else {
            setActive(false);
            if (data.statusCode === 409) {
              show(`Tag name is ${dataSubmit.name} already exists.`, {
                isError: true,
              });
            } else {
              show(t("messages:error.update_tag"), {
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
            show(t("messages:error.update_tag"), {
              isError: true,
            });
          }
          return of(error);
        })
      );
  });
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
            initialValues={dataTag || initialValuesForm}
          />
        </Modal.Section>
      </Modal>
    </div>
  );
};
