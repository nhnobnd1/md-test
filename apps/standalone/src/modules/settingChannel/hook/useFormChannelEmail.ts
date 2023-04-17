import {
  AccessType,
  CreateEmailIntegrationRequest,
  MailBoxType,
} from "@moose-desk/repo";
import { useCallback } from "react";
import { ValuesForm } from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import {
  settingIncoming,
  settingOutgoing,
} from "src/modules/settingChannel/constant/setting";
import { useAppSelector } from "src/redux/hook";

export function useFormChannelEmail() {
  const signCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  const getSettingIncomingMail = useCallback(
    (values: ValuesForm) => {
      return {
        port: settingIncoming.port,
        mailServer: settingIncoming.mailServer,
        authentication: settingIncoming.authentication,
        useSsl: settingIncoming.useSsl,
        email: values.supportEmail,
        password: "",
        deleteFromServer: !!values.deleteFromServer,
      };
    },
    [settingIncoming]
  );

  const getSettingOutGoingMail = useCallback((values: ValuesForm) => {
    return {
      port: settingOutgoing.port,
      mailServer: settingOutgoing.mailServer,
      authentication: settingOutgoing.authentication,
      useSsl: settingOutgoing.useSsl,
      email: values.supportEmail,
      password: "",
    };
  }, []);

  const payloadEmailGoogle = useCallback<
    (values: ValuesForm) => CreateEmailIntegrationRequest
  >(
    (values: ValuesForm) => {
      return {
        name: values.name,
        supportEmail: values.supportEmail,
        isPrimaryEmail: values.isPrimaryEmail,
        mailboxType: values.mailboxType,
        mailboxConfig: {
          accessType: AccessType.Both,
          refKey: signCallback.refKey,
          incoming: getSettingIncomingMail(values),
          outgoing: getSettingOutGoingMail(values),
        },
      };
    },
    [signCallback]
  );

  const payloadMailExternal = useCallback<
    (values: Required<ValuesForm>) => CreateEmailIntegrationRequest
  >(
    (values: Required<ValuesForm>) => {
      return {
        name: values.name,
        isPrimaryEmail: values.isPrimaryEmail,
        supportEmail: values.supportEmail,
        mailboxType: values.mailboxType,
        ...(!!values.incoming &&
          !!values.outgoing && {
            mailboxConfig: {
              incoming: values.incoming,
              outgoing: values.outgoing,
            },
          }),
      };
    },
    [signCallback]
  );

  const payloadMailMooseDesk = useCallback<
    (values: ValuesForm) => CreateEmailIntegrationRequest
  >(
    (values: ValuesForm) => {
      return {
        name: values.name,
        supportEmail: values.supportEmail,
        isPrimaryEmail: values.isPrimaryEmail,
        mailboxType: MailBoxType.MOOSEDESK,
        mailboxConfig: {
          forwardEmail: values.supportEmail,
        },
      };
    },
    [signCallback]
  );
  const payloadMailOther = useCallback<
    (values: ValuesForm) => CreateEmailIntegrationRequest
  >(
    (values: ValuesForm) => {
      return {
        name: values.name,
        supportEmail: values.supportEmail,
        isPrimaryEmail: values.isPrimaryEmail,
        mailboxType: MailBoxType.OTHER,
        mailboxConfig: {
          forwardEmail: values.supportEmail,
        },
      };
    },
    [signCallback]
  );

  return {
    payloadEmailGoogle,
    payloadMailExternal,
    payloadMailMooseDesk,
    payloadMailOther,
  };
}
