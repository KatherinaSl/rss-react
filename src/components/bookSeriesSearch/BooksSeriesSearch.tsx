import { useNavigate, useParams } from 'react-router';
import { SEARCH_TERM } from '../../constants/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import CardList from '../cardList/CardList';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './booksSeriesSearch.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useSearchBooksSeriesMutation } from '../../features/api/apiSlicer';
import PaginationBar from '../pagination/PaginationBar';

export default function BooksSeriesSearch() {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_TERM);
  const { pid } = useParams();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value, false);
  };

  const { theme, handleThemeChange } = useContext(ThemeContext);

  const [
    mutate,
    { isUninitialized, data, isLoading, isSuccess, isError, error },
  ] = useSearchBooksSeriesMutation();
  if (isUninitialized) {
    mutate({ pageNumber: pid ? Number(pid) - 1 : 0, title: searchTerm });
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchTerm.trim());
    mutate({ pageNumber: pid ? Number(pid) - 1 : 0, title: searchTerm });
    navigate('/');
  };

  const onPageChange = (pageNumber: number = 0) => {
    mutate({ pageNumber, title: searchTerm });
  };

  return (
    <div className={`search-section ${theme}`}>
      <div>
        <h1>Star Track Books Series Search:</h1>
        <button onClick={handleThemeChange} className="button-mode">
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <form action="" onSubmit={onSubmit} aria-label="form">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          data-testid="search-input"
        />
        <input type="submit" value="Search" data-testid="search-submit" />
      </form>

      {isLoading && <Spinner />}
      {isError && <ErrorMessage error={error} />}

      {isSuccess && !isLoading && !isError && (
        <>
          <CardList bookSeries={data.bookSeries}></CardList>
          {data.page.numberOfElements > 0 && (
            <PaginationBar page={data.page} onPageChange={onPageChange} />
          )}
        </>
      )}
    </div>
  );
}
