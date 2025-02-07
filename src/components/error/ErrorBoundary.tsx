import { Component, ReactNode } from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../../interfaces/interfaces';
import './error.css';
import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorMessage message={this.state.error?.message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
