import './paginationBar.css';
import { Page } from '../../interfaces/interfaces';

interface PaginationBarInterface {
  page: Page;
  onPageChange: (pageNumber: number) => void;
}

export default function PaginationBar(props: PaginationBarInterface) {
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
      <button
        className="pagination-button"
        onClick={() => props.onPageChange(page.pageNumber - 1)}
        disabled={page.firstPage}
      >
        {'<'}
      </button>

      <div className="pagination-pages">
        {generatePageNumbers().map((displayNumber) => (
          <div
            key={displayNumber}
            className={`pagination-page ${page.pageNumber === displayNumber - 1 ? 'active' : ''}`}
            onClick={() => props.onPageChange(displayNumber - 1)}
          >
            {displayNumber}
          </div>
        ))}
      </div>

      <button
        className="pagination-button"
        onClick={() => props.onPageChange(page.pageNumber + 1)}
        disabled={page.lastPage}
      >
        {'>'}
      </button>
    </div>
  );
}
