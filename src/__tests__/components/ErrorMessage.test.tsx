import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ErrorMessage from '../../components/error/ErrorMessage';

describe('ErrorMessage', () => {
  it('should render the ErrorMessage component', () => {
    render(<ErrorMessage message="Test Error" />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });
});
