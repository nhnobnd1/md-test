import { resources } from "src/localization";
declare global {
  interface Localizations {}
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["vi"] & typeof resources["en"] & Localizations;
  }
}
