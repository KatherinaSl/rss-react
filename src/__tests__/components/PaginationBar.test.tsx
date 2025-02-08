import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import PaginationBar from '../../components/pagination/PaginationBar';

const page = {
  pageNumber: 2,
  pageSize: 3,
  numberOfElements: 3,
  totalElements: 15,
  totalPages: 5,
  firstPage: false,
  lastPage: false,
};

const firstPage = {
  pageNumber: 1,
  pageSize: 3,
  numberOfElements: 3,
  totalElements: 15,
  totalPages: 5,
  firstPage: true,
  lastPage: false,
};

const lastPage = {
  pageNumber: 5,
  pageSize: 3,
  numberOfElements: 3,
  totalElements: 15,
  totalPages: 5,
  firstPage: false,
  lastPage: true,
};

const dummyOnPageChage = (page: number) => page++;

describe('Pagination Bar', () => {
  const onClick = vi.fn();
  it('should render correct number and destinations of page links', () => {
    render(
      <MemoryRouter>
        <PaginationBar page={page} onPageChange={onClick} />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(7);
    expect(links[0]).toHaveAttribute('href', '/page/2');
    expect(links[4]).toHaveAttribute('href', '/page/4');

    fireEvent.click(links[0]);
    expect(onClick).toBeCalled();
  });

  it('should render first page with disabled prev button', () => {
    render(
      <MemoryRouter>
        <PaginationBar page={firstPage} onPageChange={dummyOnPageChage} />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links.at(0)).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render last page with disabled next button', () => {
    render(
      <MemoryRouter>
        <PaginationBar page={lastPage} onPageChange={dummyOnPageChage} />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links.at(links.length - 1)).toHaveAttribute('aria-disabled', 'true');
  });
});
