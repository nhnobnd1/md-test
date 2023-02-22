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

  render() {
    if (this.state.hasError) {
      return <h4>Error page</h4>;
    }

    return <>{this.props.children}</>;
  }
}
