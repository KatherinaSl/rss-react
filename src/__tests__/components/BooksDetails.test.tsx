import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BooksDetails from '../../components/booksDetails/BooksDetails';

describe('BooksDetails', () => {
  it('should render BooksDetails component if value provided', () => {
    render(<BooksDetails label={'Number'} value={5} />);
    screen.debug();

    expect(screen.getByText(/Number/)).toBeInTheDocument();
    expect(screen.getByText(5)).toBeInTheDocument();
  });

  it('should not render BooksDetails component if value is missing', () => {
    render(<BooksDetails label={'Page'} />);
    screen.debug();
    const paragraph = screen.queryByText(/Page/);
    expect(paragraph).toBeNull();
  });
});
