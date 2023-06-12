import { useJob, useToggle } from "@moose-desk/core";
import {
  AgentRepository,
  CreateAgentRequest,
  ErrorCodeCreate,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, Modal } from "@shopify/polaris";
import { FormikProps } from "formik";
import { FC, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import useAuth from "src/hooks/useAuth";
import AgentForm, {
  AgentFormValues,
} from "src/modules/agent/components/AgentForm/AgentForm";

interface ModalAddNewAgentProps {
  getListAgentApi: () => void;
}

export const ModalAddNewAgent: FC<ModalAddNewAgentProps> = ({
  getListAgentApi,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const formRef = useRef<FormikProps<any>>(null);
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const { toggle } = useToggle();
  const { user } = useAuth();

  const { run: createAgentApi, processing: loadingCreate } = useJob(
    (payload: CreateAgentRequest) => {
      return AgentRepository()
        .create(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show(t("messages:success.inactive_email"));
              getListAgentApi();
              setActive(false);
            } else {
              if (data.errorCode) {
                show(getMessageCreateError(data.errorCode as ErrorCodeCreate), {
                  isError: true,
                });
                setActive(false);
              }
            }
          }),
          catchError((err) => {
            const errorCode = err.response.data.errorCode;
            if (errorCode) {
              show(getMessageCreateError(errorCode as ErrorCodeCreate), {
                isError: true,
              });

              setActive(false);
            }
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const handleSubmit = useCallback(
    (values: AgentFormValues) => {
      const payload: CreateAgentRequest = {
        ...values,
        storeId: user?.id ?? null,
      };
      createAgentApi(payload);
    },
    [user]
  );
  const getMessageCreateError = useCallback((errorCode: ErrorCodeCreate) => {
    switch (errorCode) {
      case ErrorCodeCreate.INVITATION_EXISTS:
        return "The invitation is already sent to the user.";
      case ErrorCodeCreate.USER_IS_EXISTS:
        return "The invitation is sent to an existing user.";

      default:
        return t("messages:error.add_agent");
    }
  }, []);

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

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="New agent"
        primaryAction={{
          content: " Send Invitation Email",
          onAction: () => {
            // handleSubmit();
            formRef.current?.submitForm();
          },
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              formRef.current?.resetForm();
              setActive(false);
            },
          },
        ]}
      >
        <Modal.Section>
          <AgentForm
            innerRef={formRef}
            onSubmit={handleSubmit}
            onValuesChange={toggle}
          />
        </Modal.Section>
      </Modal>
    </div>
  );
};
