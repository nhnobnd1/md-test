import { useEffect, useState } from "react";

const useHtmlStringHeight = (htmlString: string): number => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const hiddenElement = document.createElement("div");
    hiddenElement.style.visibility = "hidden";
    hiddenElement.style.position = "absolute";
    hiddenElement.innerHTML = htmlString;

    document.body.appendChild(hiddenElement);

    let calculatedHeight = hiddenElement.clientHeight;
    if (calculatedHeight < 1000 && calculatedHeight >= 500) {
      calculatedHeight = calculatedHeight + 200;
    }
    if (calculatedHeight < 500 && calculatedHeight >= 200) {
      calculatedHeight = calculatedHeight + 100;
    }
    if (calculatedHeight < 200) {
      calculatedHeight = calculatedHeight + 50;
    }

    setHeight(calculatedHeight);

    document.body.removeChild(hiddenElement);
  }, [htmlString]);

  return height;
};

export default useHtmlStringHeight;
