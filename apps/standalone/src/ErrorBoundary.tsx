import { Component, ReactNode } from "react";
import Images from "src/assets/images";
import { ErrorPage } from "src/components/ErrorPage";

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

  render() {
    if (this.state.hasError) {
      return <ErrorPage image={Images.NotFound} />;
    }

    return <>{this.props.children}</>;
  }
}
