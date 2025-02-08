import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ErrorNotFound from '../../components/error/ErrorNotFound';

describe('ErrorNotFound', () => {
  it('should render the ErrorNotFound component', () => {
    render(<ErrorNotFound />);
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
