import env from "src/core/env";

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
const defaultFilter = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
});
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
export { defaultFilter, trimHtmlCssJs, wrapImageWithAnchorTag };
