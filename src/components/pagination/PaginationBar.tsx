import './paginationBar.css';
import { Page } from '../../interfaces/interfaces';
import { Link } from 'react-router';

interface PaginationBarProps {
  page: Page;
  onPageChange: (pageNumber: number) => void;
}

export default function PaginationBar(props: PaginationBarProps) {
  const page = props.page;
  const totalPages = Math.ceil(page.totalElements / page.pageSize);

  const generatePageNumbers = () => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <Link
        to={`/page/${page.pageNumber}`}
        className="pagination-link"
        aria-disabled={`${page.firstPage}`}
        onClick={() => props.onPageChange(page.pageNumber - 1)}
      >
        {'<'}
      </Link>

      <div className="pagination-pages">
        {generatePageNumbers().map((displayNumber) => (
          <Link
            key={displayNumber}
            to={`/page/${displayNumber}`}
            className="pagination-link"
          >
            <div
              className={`pagination-page ${page.pageNumber === displayNumber - 1 ? 'active' : ''}`}
              onClick={() => props.onPageChange(displayNumber - 1)}
            >
              {displayNumber}
            </div>
          </Link>
        ))}
      </div>

      <Link
        to={`/page/${page.pageNumber}`}
        className="pagination-link"
        aria-disabled={`${page.lastPage}`}
        onClick={() => props.onPageChange(page.pageNumber + 1)}
      >
        {'>'}
      </Link>
    </div>
  );
}
