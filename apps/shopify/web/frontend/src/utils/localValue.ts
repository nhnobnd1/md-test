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
export { defaultFilter, wrapImageWithAnchorTag };
