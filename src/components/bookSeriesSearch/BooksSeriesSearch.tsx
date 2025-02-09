import { useNavigate, useParams } from 'react-router';
import { SEARCH_TERM } from '../../constants/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SearchBookSeriesResponse } from '../../interfaces/interfaces';
import { searchBooksSeries } from '../../services/booksSeriesService';
import CardList from '../cardList/CardList';
import ErrorMessage from '../error/ErrorMessage';
import PaginationBar from '../pagination/PaginationBar';
import Spinner from '../spinner/Spinner';
import './booksSeriesSearch.css';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function BooksSeriesSearch() {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_TERM);
  const [response, setResponse] = useState<SearchBookSeriesResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const isLoadedRef = useRef(false);
  const { pid } = useParams();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value, false);
  };

  const fetchData = useCallback(
    (pageNumber: number = 0) => {
      setLoading(true);
      searchBooksSeries(searchTerm, pageNumber)
        .then((response) => {
          setResponse(response);
        })
        .catch((error: Error) => {
          setError(error);
          console.error('Error caught in SearchInput:', error);
        })
        .finally(() => setLoading(false));
    },
    [searchTerm]
  );

  useEffect(() => {
    if (isLoadedRef.current) {
      return;
    }
    isLoadedRef.current = true;
    fetchData(pid ? Number(pid) - 1 : 0);
  }, [fetchData, pid]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchTerm.trim());
    fetchData();
    navigate('/');
  };

  return (
    <div className="search-section">
      <h1>Star Track Books Series Search:</h1>
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

      {loading && <Spinner />}
      {error && <ErrorMessage message={error.message} />}

      {response && !loading && !error && (
        <>
          <CardList bookSeries={response.bookSeries}></CardList>
          {response.page.numberOfElements > 0 && (
            <PaginationBar page={response.page} onPageChange={fetchData} />
          )}
        </>
      )}
    </div>
  );
}
