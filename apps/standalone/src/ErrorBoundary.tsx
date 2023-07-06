import { Component, ReactNode } from "react";
import Images from "src/assets/images";
import { MDButton } from "src/components/UI/Button/MDButton";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, any> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   const numberRetry = sessionStorage.getItem("retry_error");
  //   console.log({ numberRetry });
  //   if (!numberRetry) {
  //     console.log(error, errorInfo);
  //     window.location.reload();
  //     sessionStorage.setItem("retry_error", "1");
  //   } else {
  //     if (Number(numberRetry) > 3) {
  //       return;
  //     }
  //     setTimeout(() => {
  //       window.location.reload();
  //       sessionStorage.setItem("retry_error", `${Number(numberRetry) + 1}`);
  //     }, 1000);
  //   }
  // }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[100vh] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <img src={Images.Logo.ReportError} alt="report-error" />
            <h1 className="mt-5 text-center">Something went wrong</h1>
            <span className="text-sm text-gray-400 text-center">
              Please try again or report an issue to support
            </span>
            <div className="flex gap-2 flex-wrap mt-5">
              <MDButton
                onClick={() => {
                  window.location.reload();
                }}
                type="primary"
              >
                Try again
              </MDButton>
              <MDButton
                onClick={() => {
                  window.open("mailto:support@moosedesk.com");
                }}
              >
                Issue to support
              </MDButton>
            </div>
          </div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}
