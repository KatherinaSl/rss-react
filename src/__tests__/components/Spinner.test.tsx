import { render, screen } from '@testing-library/react';
import Spinner from '../../components/spinner/Spinner';
import '@testing-library/jest-dom/vitest';

describe('Spinner', () => {
  it('should render the Spinner component', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
