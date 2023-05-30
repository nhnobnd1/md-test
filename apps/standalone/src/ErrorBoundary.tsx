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
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return <>{this.props.children}</>;
  }
}
