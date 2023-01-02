import { notification } from "antd";
import { ArgsProps } from "antd/es/notification/interface";

export default function useNotification() {
  const $notificationKey = Symbol("notification");

  function success(message: string, payload?: Omit<ArgsProps, "message">) {
    return notification.success({
      key: $notificationKey.description,
      message,
      ...payload,
    });
  }

  function info(message: string, payload?: Omit<ArgsProps, "message">) {
    return notification.info({
      key: $notificationKey.description,
      message,
      ...payload,
    });
  }

  function warning(message: string, payload?: Omit<ArgsProps, "message">) {
    return notification.warning({
      key: $notificationKey.description,
      message,
      ...payload,
    });
  }

  function error(message: string, payload?: Omit<ArgsProps, "message">) {
    return notification.error({
      key: $notificationKey.description,
      message,
      ...payload,
    });
  }

  function open(message: string, payload?: Omit<ArgsProps, "message">) {
    return notification.open({
      key: $notificationKey.description,
      message,
      ...payload,
    });
  }

  return {
    success,
    warning,
    info,
    error,
    open,
  };
}
