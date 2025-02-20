import { Page } from '../../interfaces/models';
import './paginationBar.css';
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

  function renderArrow(arrow: string, isForward: boolean) {
    const destPageLink = isForward ? page.pageNumber + 2 : page.pageNumber;
    const destPage = isForward ? page.pageNumber + 1 : page.pageNumber - 1;
    const isArrowDisabled =
      (page.lastPage && isForward) || (page.firstPage && !isForward);
    return (
      <Link
        to={`/page/${destPageLink}`}
        className="pagination-link"
        aria-disabled={`${isArrowDisabled}`}
        onClick={() => props.onPageChange(destPage)}
      >
        {arrow}
      </Link>
    );
  }

  return (
    <div className="pagination">
      {renderArrow('<', false)}

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

      {renderArrow('>', true)}
    </div>
  );
}
