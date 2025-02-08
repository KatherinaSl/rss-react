import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ErrorBoundary from '../../components/error/ErrorBoundary';

describe('ErrorBoundary', () => {
  const reallErrorWriter = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = reallErrorWriter;
  });

  it('should render the ErrorBoundary error', () => {
    const ThrowError = () => {
      throw new Error('test');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
        <p>OK</p>
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
  });

  it('should render the ErrorBoundary without error', () => {
    render(
      <ErrorBoundary>
        <p>OK</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('OK')).toBeInTheDocument();
  });
});
