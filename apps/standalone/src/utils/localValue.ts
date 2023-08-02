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
function wrapImageWithAnchorTag(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const images = doc.getElementsByTagName("img");

  for (const img of images) {
    const anchor = doc.createElement("a");
    anchor.href = img.src;
    anchor.target = "_blank";
    img.parentNode?.insertBefore(anchor, img);

    anchor.appendChild(img);
  }

  return doc.body.innerHTML;
}
function trimHtmlCssJs(html: string): string {
  html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
  html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
  html = html.replace(/<\/div>/gi, "\n");
  html = html.replace(/<\/li>/gi, "\n");
  html = html.replace(/<li>/gi, "  *  ");
  html = html.replace(/<\/ul>/gi, "\n");
  html = html.replace(/<\/p>/gi, "\n");
  html = html.replace(/<br\s*[\\/]?>/gi, "\n");
  html = html.replace(/<[^>]+>/gi, "");

  return html;
}
export {
  defaultFilter,
  getBaseToken,
  getRefreshToken,
  getStoreId,
  trimHtmlCssJs,
  wrapImageWithAnchorTag,
};
