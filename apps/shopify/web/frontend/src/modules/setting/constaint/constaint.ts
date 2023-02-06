export const optionSelectTime = [
  { value: "00:00", label: "00:00 AM", valueSelect: 0 },
  { value: "00:30", label: "00:30 AM", valueSelect: 0.5 },
  { value: "01:00", label: "01:00 AM", valueSelect: 1 },
  { value: "01:30", label: "01:30 AM", valueSelect: 1.5 },
  { value: "02:00", label: "02:00 AM", valueSelect: 2 },
  { value: "02:30", label: "02:30 AM", valueSelect: 2.5 },
  { value: "03:00", label: "03:00 AM", valueSelect: 3 },
  { value: "03:30", label: "03:30 AM", valueSelect: 3.5 },
  { value: "04:00", label: "04:00 AM", valueSelect: 4 },
  { value: "04:30", label: "04:30 AM", valueSelect: 4.5 },
  { value: "05:00", label: "05:00 AM", valueSelect: 5 },
  { value: "05:30", label: "05:30 AM", valueSelect: 5.5 },
  { value: "06:00", label: "06:00 AM", valueSelect: 6 },
  { value: "06:30", label: "06:30 AM", valueSelect: 6.5 },
  { value: "07:00", label: "07:00 AM", valueSelect: 7 },
  { value: "07:30", label: "07:30 AM", valueSelect: 7.5 },
  { value: "08:00", label: "08:00 AM", valueSelect: 8 },
  { value: "08:30", label: "08:30 AM", valueSelect: 8.5 },
  { value: "09:00", label: "09:00 AM", valueSelect: 9 },
  { value: "09:30", label: "09:30 AM", valueSelect: 9.5 },
  { value: "10:00", label: "10:00 AM", valueSelect: 10 },
  { value: "10:30", label: "10:30 AM", valueSelect: 10.5 },
  { value: "11:00", label: "11:00 AM", valueSelect: 11 },
  { value: "11:30", label: "11:30 AM", valueSelect: 11.5 },
  { value: "12:00", label: "12:00 AM", valueSelect: 12 },
  { value: "12:30", label: "00:30 PM", valueSelect: 12.5 },
  { value: "13:00", label: "01:00 PM", valueSelect: 13 },
  { value: "13:30", label: "01:30 PM", valueSelect: 13.5 },
  { value: "14:00", label: "02:00 PM", valueSelect: 14 },
  { value: "14:30", label: "02:30 PM", valueSelect: 14.5 },
  { value: "15:00", label: "03:00 PM", valueSelect: 15 },
  { value: "15:30", label: "03:30 PM", valueSelect: 15.5 },
  { value: "16:00", label: "04:00 PM", valueSelect: 16 },
  { value: "16:30", label: "04:30 PM", valueSelect: 16.5 },
  { value: "17:00", label: "05:00 PM", valueSelect: 17 },
  { value: "17:30", label: "05:30 PM", valueSelect: 17.5 },
  { value: "18:00", label: "06:00 PM", valueSelect: 18 },
  { value: "18:30", label: "06:30 PM", valueSelect: 18.5 },
  { value: "19:00", label: "07:00 PM", valueSelect: 19 },
  { value: "19:30", label: "07:30 PM", valueSelect: 19.5 },
  { value: "20:00", label: "08:00 PM", valueSelect: 20 },
  { value: "20:30", label: "08:30 PM", valueSelect: 20.5 },
  { value: "21:00", label: "09:00 PM", valueSelect: 21 },
  { value: "21:30", label: "09:30 PM", valueSelect: 21.5 },
  { value: "22:00", label: "10:00 PM", valueSelect: 22 },
  { value: "22:30", label: "10:30 PM", valueSelect: 22.5 },
  { value: "23:00", label: "11:00 PM", valueSelect: 23 },
  { value: "23:30", label: "11:30 PM", valueSelect: 23.5 },
  { value: "23:59", label: "11:59 PM", valueSelect: 24 },
];

export const tabs = [
  {
    id: "business-hours",
    content: "Business Hours",
    panelID: "business-hours",
  },
  {
    id: "holiday",
    content: "Holidays",
    panelID: "holiday",
  },
  {
    id: "auto-reply",
    content: "Auto-Reply",
    panelID: "auto-reply",
  },
];

export const initialValueCustomHours = [
  {
    id: "Sunday",
    timeRanges: {
      startTime: "00:00",
      endTime: "00:00",
    },
    checked: false,
  },
  {
    id: "Monday",
    timeRanges: {
      startTime: "09:00",
      endTime: "17:00",
    },
    checked: true,
  },
  {
    id: "Tuesday",
    timeRanges: {
      startTime: "09:00",
      endTime: "17:00",
    },
    checked: true,
  },
  {
    id: "Wednesday",
    timeRanges: {
      startTime: "09:00",
      endTime: "17:00",
    },
    checked: true,
  },
  {
    id: "Thursday",
    timeRanges: {
      startTime: "09:00",
      endTime: "17:00",
    },
    checked: true,
  },
  {
    id: "Friday",
    timeRanges: {
      startTime: "09:00",
      endTime: "17:00",
    },
    checked: true,
  },
  {
    id: "Saturday",
    timeRanges: {
      startTime: "00:00",
      endTime: "00:00",
    },
    checked: false,
  },
];
