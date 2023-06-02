import { Component, ReactNode } from "react";

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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const numberRetry = sessionStorage.getItem("retry_error");
    if (!numberRetry) {
      console.log(error, errorInfo);
      window.location.reload();
      sessionStorage.setItem("retry_error", "1");
    } else {
      if (Number(numberRetry) > 3) {
        return;
      }
      setTimeout(() => {
        window.location.reload();
        sessionStorage.setItem("retry_error", `${Number(numberRetry) + 1}`);
      }, 1000);
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return <>{this.props.children}</>;
  }
}
