import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Tag } from "antd";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import {
  getSettingManager,
  updateSettingManager,
} from "src/modules/setting/api/api";
import SwitchForm from "src/modules/setting/component/Switch/Switch";
import styles from "./styles.module.scss";

const initialValues = {
  autoJoinEnabled: false,
  whitelistDomains: [],
  twoFactorAuthEnabled: false,
  domain: "",
};

export default function IndexAccountManager({ props }: any) {
  const [form] = Form.useForm();
  const [valueInput, setValueInput] = useState("");
  const message = useMessage();
  const { subDomain } = useSubdomain();
  const { t } = useTranslation();

  const { isAdmin } = usePermission();
  const getLinkSignUp = useCallback(
    (mode: string) => {
      if (subDomain) {
        switch (mode) {
          case "development":
            return `https://${subDomain.toLocaleLowerCase()}-dev.moosedesk.net/signup`;
          case "staging":
            return `https://${subDomain.toLocaleLowerCase()}.moosedesk.com/signup`;
          case "production":
            return `https://${subDomain.toLocaleLowerCase()}.moosedesk.com/signup`;
          default:
            break;
        }
      }
    },
    [import.meta.env.MODE, subDomain]
  );
  const notification = useNotification();
  const [stateErrorInput, setStateErrorInput] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const removeSelectedDomain = useCallback(
    (domain) => () => {
      if (!disabled) {
        setSelectedDomain((previousDomain) =>
          previousDomain.filter((previousDomain) => previousDomain !== domain)
        );
      }
    },
    [disabled, setDisabled]
  );
  const selectedMarkup = selectedDomain.map((domain) => (
    <Tag
      className="m-0 pl-2 pr-2"
      key={domain}
      closable={!disabled}
      onClose={removeSelectedDomain(domain)}
    >
      {domain}
    </Tag>
  ));
  const validateObject = useCallback(() => {
    if (selectedDomain.length === 0) {
      return [
        {
          pattern:
            // /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
            /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?:\.|$)){2,}$/,
          message: "The input email domain is not valid!",
        },
        { required: true, message: "The email domain is required!" },
      ];
    } else {
      return [
        {
          pattern:
            // /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
            /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?:\.|$)){2,}$/,
          message: "The input email domain is not valid!",
        },
      ];
    }
  }, [selectedDomain]);
  const handleSubmitDomain = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        if (!stateErrorInput) {
          if (
            valueInput &&
            selectedDomain.indexOf(valueInput.toLocaleLowerCase()) === -1
          ) {
            setSelectedDomain([
              ...selectedDomain,
              valueInput.toLocaleLowerCase(),
            ]);
          }
          form.setFieldValue("domain", "");
          setValueInput("");
        }
        event.preventDefault();
      }
    },
    [selectedDomain, valueInput, stateErrorInput]
  );
  const {
    data: accountData,
    isLoading,
    isFetching,
    refetch: refetchAccountData,
  } = useQuery({
    queryKey: [QUERY_KEY.ACCOUNT_MANAGE],
    queryFn: () => getSettingManager(),
    keepPreviousData: true,
    enabled: isAdmin,
    onSuccess: ({ data }) => {
      setSelectedDomain(data.data.whitelistDomains);
      setDisabled(!data.data.autoJoinEnabled);
    },
  });
  const { mutate: updateAccountMutate, isLoading: updating } = useMutation({
    mutationFn: (payload: any) => updateSettingManager(payload),
    onMutate: () => {
      message.loading.show(t("messages:loading.updating_account_manager"));
    },
    onSuccess: async () => {
      await refetchAccountData();
      message.loading.hide();
      notification.success(t("messages:success.update_access_manager"));
    },
    onError: () => {
      message.loading.hide();
      notification.error(t("messages:error.update_access_manager"));
    },
  });
  const handleSubmit = useCallback(
    (data: any) => {
      const dataSubmit = {
        ...data,
        whitelistDomains: selectedDomain,
        autoJoinEnabled: false,
      };
      updateAccountMutate(dataSubmit);
    },
    [selectedDomain]
  );

  // reset form
  const handleResetForm = () => {
    form.setFieldsValue(accountData?.data?.data);
  };

  return (
    <div>
      <Header title="Access Manager" />
      <div className={styles.wrapForm}>
        <Form
          initialValues={accountData?.data?.data || initialValues}
          onFinish={handleSubmit}
          // enableLoadForm
          enableReinitialize
          form={form}
        >
          {/* <Card title="Auto-Join Settings">
        <div className="flex">
          <div className="flex items-center  mt-1">
            <Form.Item name="autoJoinEnabled">
              <SwitchForm setDisabledInput={setDisabled} />
            </Form.Item>
          </div>
          <div className="ml-4">
            <p className="mb-2 mt-2">
              Allow users with email addresses from an approved email domain to
              use the sign up link.
            </p>
            <div>
              <a>{getLinkSignUp(import.meta.env.MODE)}</a>
            </div>
          </div>
        </div>
        <div className="flex items-start mt-4">
          <div className="w-36">
            <span>Email domain:</span>
          </div>
          <div className="w-full">
            {!disabled ? (
              <Form.Item
                name="domain"
                className="mb-0"
                rules={!disabled ? validateObject() : []}
              >
                <InputDisableSubmit
                  setValueInput={setValueInput}
                  handleSubmitDomain={handleSubmitDomain}
                  setStateErrorInput={setStateErrorInput}
                />
              </Form.Item>
            ) : (
              <InputDisableSubmit
                valueInput={valueInput}
                setValueInput={setValueInput}
                handleSubmitDomain={handleSubmitDomain}
                disabled={true}
              />
            )}
            <Form.Item name="whitelistDomains" className="mb-0">
              <Space className="mt-1" wrap>
                {selectedMarkup}
              </Space>
            </Form.Item>
          </div>
        </div>
      </Card> */}
          <div className={styles.formTitle}>
            <Header subTitle="Two-Factor Authentication (2FA)" />
          </div>

          {isLoading ? (
            <MDSkeleton lines={1} width={300} />
          ) : (
            <div className="flex">
              <div className="flex items-center">
                <Form.Item name="twoFactorAuthEnabled">
                  <SwitchForm />
                </Form.Item>
              </div>
              <div className="ml-4">
                <p className="mt-1">Enable 2FA for all users.</p>
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="mt-4 flex justify-end">
              <MDSkeleton lines={1} width={150} />
            </div>
          ) : (
            <div className={classNames(styles.groupButton, "text-right")}>
              <MDButton onClick={handleResetForm} disabled={updating}>
                Cancel
              </MDButton>
              <MDButton htmlType="submit" type="primary" loading={updating}>
                Save
              </MDButton>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
