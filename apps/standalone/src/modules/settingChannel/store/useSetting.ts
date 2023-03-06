import { create } from "zustand";
interface WidgetSetting {
  id: number;
  titleText: string;
  widgetHeader: string;
  formTitle: string;
  buttonText: string;
  confirmMessage: string;
  allowAttach: boolean;
  allowCaptcha: boolean;
  headerBackgroundColor: string;
  headerTextColor: string;
  widgetPosition: string;
  offsetBottom: number;
  offsetHorizontal: number;
  buttonAppearanceColor: string;
  textButtonAppearanceColor: string;
  isFormContact: boolean;
}

interface SettingState {
  widgetSetting: WidgetSetting;
  updateWidgetSetting: (object: WidgetSetting) => void;
}
const useWidgetSetting = create<SettingState>()((set) => ({
  widgetSetting: {
    id: 1,
    titleText: "Support Request",
    widgetHeader: "Help",
    formTitle: "Contact us",
    buttonText: "Submit",
    confirmMessage: "Thank you for your feedback.",
    allowAttach: true,
    allowCaptcha: true,
    headerBackgroundColor: "green",
    headerTextColor: "black",
    widgetPosition: "left",
    offsetBottom: 20,
    offsetHorizontal: 30,
    buttonAppearanceColor: "green",
    textButtonAppearanceColor: "black",
    isFormContact: true,
  },
  updateWidgetSetting: (object) => set((state) => ({ widgetSetting: object })),
}));
export default useWidgetSetting;
