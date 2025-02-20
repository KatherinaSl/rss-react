import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BooksDetails from '../../components/booksDetails/BooksDetails';

describe('BooksDetails', () => {
  it('should render BooksDetails component if value provided', () => {
    const value = '5';
    render(<BooksDetails label={'Number'} value={value} />);
    expect(screen.getByText(/Number/)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('should not render BooksDetails component if value is missing', () => {
    render(<BooksDetails label={'Page'} />);
    const paragraph = screen.queryByText(/Page/);
    expect(paragraph).not.toBeInTheDocument();
  });
});
