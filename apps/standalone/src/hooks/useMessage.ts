import { message, MessageArgsProps } from "antd";

export default function useMessage() {
  const $messageKey = Symbol("messageKey");

  const loading = {
    content: "",
    option: {},
    show: function (
      content: string,
      option?: Omit<MessageArgsProps, "key" | "content">
    ) {
      this.content = content;
      this.option = option ?? {};
      return message.loading({
        key: $messageKey.description,
        content,
        duration: 0,
        ...option,
      });
    },
    hide: function () {
      return message.loading({
        key: $messageKey.description,
        content: this.content,
        duration: 0.5,
        ...this.option,
      });
    },
  };

  function success(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.success({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  function info(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.info({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  function warning(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.warning({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  function error(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.error({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  return {
    loading,
    success,
    info,
    warning,
    error,
  };
}
