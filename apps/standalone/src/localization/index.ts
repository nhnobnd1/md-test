import dayjs, { isDayjs } from "dayjs";
import i18n from "i18next";
import { camelCase, kebabCase } from "lodash-es";
import { initReactI18next } from "react-i18next";
import locales from "src/localization/locales";

export const resources = locales;

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: "vi",
    lng: "vi",
    debug: true,
    ns: Object.keys(resources),
    resources,

    interpolation: {
      escapeValue: false,
      format(value, format) {
        if (typeof value === "string") {
          switch (format) {
            case "uppercase":
              return value.toUpperCase();
            case "lowercase":
              return value.toLowerCase();
            case "firstLetterUppercase":
              return value.charAt(0).toUpperCase() + value.slice(1);
            case "pascalCase":
              return value.charAt(0).toUpperCase() + camelCase(value.slice(1));
            case "camelCase":
              return camelCase(value);
            case "kebabCase":
              return kebabCase(value);
          }
        }

        if (isDayjs(value) || value instanceof Date) {
          return dayjs(value).format(format);
        }

        return value;
      },
    },
  });

export { i18n };
