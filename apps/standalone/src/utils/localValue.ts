import jwt_decode from "jwt-decode";
import env from "src/core/env";

const modeEnv = import.meta.env.MODE;

const getStoreId = () => {
  const baseToken = getBaseToken();
  if (!baseToken) {
    return "";
  }
  const decode = jwt_decode(baseToken) as any;
  return decode?.storeId;
};
const getBaseToken = () => {
  return (
    localStorage.getItem(`${modeEnv}_${getSubDomain()}_base_token`) || undefined
  );
};
const getRefreshToken = () => {
  return (
    localStorage.getItem(`${modeEnv}_${getSubDomain()}}_refresh_token`) ||
    undefined
  );
};

const getSubDomain = () => {
  const domain = window.location.hostname;
  if (import.meta.env.MODE === "development") {
    if (domain.includes(".moosedesk.net")) {
      return domain.replace(".moosedesk.net", "");
    }
    return import.meta.env.VITE_SUB_DOMAIN;
  } else {
    return domain.replace(".moosedesk.com", "");
  }
};
const defaultFilter = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
});
export { defaultFilter, getBaseToken, getRefreshToken, getStoreId };
