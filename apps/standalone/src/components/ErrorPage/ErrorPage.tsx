import { useEffect } from "react";

interface ErrorPageProps {
  image: any;
  width?: string | number;
  height?: string | number;
}

export const ErrorPage = ({
  image,
  width = "100vw",
  height = "100vh",
}: ErrorPageProps) => {
  useEffect(() => {
    console.log("test");
    window.location.reload();
  }, []);
  return (
    <div
      id="error-boundary-page"
      style={{
        backgroundImage: `url(${image})`,
        width,
        height,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

export default ErrorPage;
