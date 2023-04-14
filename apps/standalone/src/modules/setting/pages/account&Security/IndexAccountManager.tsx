import { useJob } from "@moose-desk/core";
import { AccessManger, UserSettingRepository } from "@moose-desk/repo";
import { Button, Card, Space, Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import InputDisableSubmit from "src/modules/setting/component/InputDisableSubmit/InputDisableSubmit";
import SwitchForm from "src/modules/setting/component/Switch/Switch";
export default function IndexAccountManager({ props }: any) {
  const [form] = Form.useForm();
  const [valueInput, setValueInput] = useState("");
  const message = useMessage();
  const { subDomain } = useSubdomain();
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
  const initialValues = useMemo(
    () => ({
      autoJoinEnabled: false,
      whitelistDomains: [],
      twoFactorAuthEnabled: false,
      domain: "",
    }),
    [props]
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
            /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
          message: "The input email domain is not valid!",
        },
        { required: true, message: "The email domain is required!" },
      ];
    } else {
      return [
        {
          pattern:
            /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
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
  // fetch init data
  const { run: fetchAccountManagerStatus, result } = useJob(
    () => {
      return UserSettingRepository()
        .getAccessManagerSetting()
        .pipe(
          map(({ data }) => {
            setSelectedDomain(data.data.whitelistDomains);
            return data.data;
          })
        );
    }
    // { showLoading: true }
  );
  // update data
  const handleSubmit = useCallback(
    (data: any) => {
      const dataSubmit = { ...data, whitelistDomains: selectedDomain };
      submit(dataSubmit);
    },
    [selectedDomain]
  );
  const { run: submit } = useJob((dataSubmit: AccessManger) => {
    message.loading.show("Updating account manager ...");
    return UserSettingRepository()
      .updateAccessManagerSetting(dataSubmit)
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success("Access manager updated successfully.");
            fetchAccountManagerStatus();
          } else {
            notification.error("Update failed.");
          }
        }),
        catchError((error) => {
          message.loading.hide();
          notification.error("Update failed.");
          return of(error);
        })
      );
  });
  // reset form
  const handleResetForm = () => {
    form.resetFields();
    fetchAccountManagerStatus();
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isAdmin ? fetchAccountManagerStatus() : "";
  }, []);
  return (
    <Form
      initialValues={result || initialValues}
      onFinish={handleSubmit}
      // enableLoadForm
      enableReinitialize
      form={form}
    >
      <Card title="Auto-Join Settings">
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
      </Card>
      <Card title="Two-Factor Authentication (2FA)" className="mt-8">
        <div className="flex">
          <div className="flex items-center">
            <Form.Item name="twoFactorAuthEnabled">
              <SwitchForm />
            </Form.Item>
          </div>
          <div className="ml-4">
            <p className="mt-1">Toggle 2FA for all users.</p>
          </div>
        </div>
      </Card>
      <div className="flex-1 text-right mt-4">
        <Button onClick={handleResetForm}>Cancel</Button>
        <Button htmlType="submit" type="primary" className="ml-4">
          Save
        </Button>
      </div>
    </Form>
  );
}
