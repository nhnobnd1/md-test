import Calendar from "antd/es/calendar/locale/en_US";
import DatePicker from "antd/es/date-picker/locale/en_US";
import { Locale } from "antd/es/locale";
import TimePicker from "antd/es/time-picker/locale/en_US";

const typeTemplate = "${label} invalid";

const antEnLocale: Locale = {
  locale: "en",
  Calendar,
  DatePicker,
  TimePicker,

  global: {
    placeholder: "Please choose",
  },
  Table: {
    filterTitle: "Filter",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "There are no filters",
    emptyText: "No data",
    selectAll: "Select all",
    selectInvert: "Choose the opposite",
    selectNone: "Remove all",
    selectionAll: "Select all",
    sortTitle: "Sort",
    expand: "Expand",
    collapse: "Collapse",
    triggerDesc: "Sort descending",
    triggerAsc: "Sort ascending",
    cancelSort: "Cancel sort",
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK",
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel",
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all",
    removeAll: "Remove all",
    selectInvert: "Chọn ngược lại",
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Delete files",
    uploadError: "Upload failed",
    previewFile: "Preview",
    downloadFile: "Download",
  },
  Empty: {
    description: "Không có dữ liệu",
  },
  Icon: {
    icon: "icon",
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand",
  },
  PageHeader: {
    back: "Back",
  },
  Form: {
    optional: "(Optional)",
    defaultValidateMessages: {
      default: "Invalid ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be [${enum}]",
      whitespace: "Please enter ${label}",
      date: {
        format: "${label} is not in the correct date format",
        parse: "${label} cannot be converted to date format",
        invalid: "${label} is not day",
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: "${label} must have ${len} characters",
        min: "${label} at least ${min} characters",
        max: "${label} up to ${max} characters",
        range: "${label} should be between ${min} and ${max} characters",
      },
      number: {
        len: "${label} must equal ${len}",
        min: "${label} must have more ${min}",
        max: "${label} must have less ${max}",
        range: "${label} must in range ${min}-${max}",
      },
      array: {
        len: "Must have ${len} ${label}",
        min: "Must have the least ${min} ${label}",
        max: "Must have the most ${max} ${label}",
        range: "Amount ${label} must in range ${min}-${max}",
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}",
      },
    },
  },
  Image: {
    preview: "Preview",
  },
};

export default antEnLocale;
