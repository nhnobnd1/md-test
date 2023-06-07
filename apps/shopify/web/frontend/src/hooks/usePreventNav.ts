import { useEffect } from "react";
import useFullScreen from "src/store/useFullScreen";

export default function usePreventNav() {
  //   const [matches, setMatches] = useState(
  //     window.matchMedia("(min-width: 768px)").matches
  //   );
  const changeShowNav = useFullScreen((state) => state.changeShowNav);

  useEffect(() => {
    changeShowNav(false);
    // window
    //   .matchMedia("(min-width: 768px)")
    //   .addEventListener("change", (e) => setMatches(e.matches));
    return () => {
      changeShowNav(true);
    };
  }, []);
}
