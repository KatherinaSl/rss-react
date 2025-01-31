import { Component, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../data/interfaces';
import './error.css';
import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // return (
      //   <div role="alert" className="error">
      //     <h3>Something went wrong...</h3>
      //     <p>{this.state.error?.message}</p>
      //   </div>
      // );
      return <ErrorMessage message={this.state.error?.message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
