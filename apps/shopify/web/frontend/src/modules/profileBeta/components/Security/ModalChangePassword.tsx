import { useToast } from "@shopify/app-bridge-react";
import {
  FormLayout,
  Layout,
  LegacyCard,
  Modal,
  TextField,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { validateSchemaObjectPassword } from "src/constaint/regex";
import { updatePassword } from "src/modules/profileBeta/helper/api";
// import { MediaScreen } from "@moose-desk/core";
interface IProps {
  visible: boolean;
  onClose: () => void;
}
export default function ModalChangePassword({ visible, onClose }: IProps) {
  const formRef = useRef<FormikProps<any>>(null);
  const { show } = useToast();
  const validateObject = validateSchemaObjectPassword;
  const { t, i18n } = useTranslation();

  const { mutate: updatePasswordMutate, isLoading: updating } = useMutation({
    mutationFn: (payload: any) => updatePassword(payload),
    onSuccess: async () => {
      onClose();
      show(t("messages:success.change_password"));
    },
    onError: () => {
      show(t("messages:error.change_password"));
    },
  });

  const handleSubmit = (data: any) => {
    updatePasswordMutate(data);
  };

  return (
    <Modal
      open={visible}
      onClose={onClose}
      title="Change Password"
      // large={selectedTabs === 1}
      primaryAction={{
        content: "Save",
        onAction: () => formRef.current?.submitForm(),
        loading: updating,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Form
        initialValues={{}}
        ref={formRef}
        onSubmit={handleSubmit}
        validationSchema={validateObject}
        enableReinitialize
      >
        <LegacyCard sectioned>
          <Layout>
            <Layout.Section>
              <FormLayout>
                <FormItem name="currentPassword">
                  <TextField
                    label="Current Password"
                    autoComplete="off"
                    type="password"
                  />
                </FormItem>
                <FormItem name="newPassword">
                  <TextField
                    minLength={8}
                    label="New Password"
                    type="password"
                    autoComplete="off"
                  />
                </FormItem>
                <FormItem name="confirmNewPassword">
                  <TextField
                    minLength={8}
                    label="Confirm New Password"
                    type="password"
                    autoComplete="off"
                  />
                </FormItem>
              </FormLayout>
            </Layout.Section>
          </Layout>
        </LegacyCard>
      </Form>
    </Modal>
  );
}
