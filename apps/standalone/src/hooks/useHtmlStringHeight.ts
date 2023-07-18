import { useEffect, useState } from "react";

const addHeight = (height: number): number => {
  let calculatedHeight = height;
  if (calculatedHeight < 1000 && calculatedHeight >= 500) {
    calculatedHeight = calculatedHeight + 200;
  }
  if (calculatedHeight < 500 && calculatedHeight >= 200) {
    calculatedHeight = calculatedHeight + 100;
  }
  if (calculatedHeight < 200) {
    calculatedHeight = calculatedHeight + 50;
  }
  return calculatedHeight;
};

const useHtmlStringHeight = (htmlString: string): number => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const hiddenElement = document.createElement("div");
    hiddenElement.style.visibility = "hidden";
    hiddenElement.style.position = "absolute";
    hiddenElement.innerHTML = htmlString;

    document.body.appendChild(hiddenElement);
    const images = hiddenElement.getElementsByTagName("img");

    if (images.length === 0) {
      setHeight(addHeight(hiddenElement.clientHeight));
      document.body.removeChild(hiddenElement);
    } else {
      let loadedImages = 0;
      for (let i = 0; i < images.length; i++) {
        if (images[i].complete) {
          loadedImages++;
        } else {
          images[i].addEventListener("load", () => {
            loadedImages++;
            if (loadedImages === images.length) {
              setHeight(addHeight(hiddenElement.offsetHeight));
              document.body.removeChild(hiddenElement);
            }
          });
        }
      }
    }
  }, [htmlString]);
  return height;
};

export default useHtmlStringHeight;
