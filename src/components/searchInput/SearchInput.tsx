import { BookSeriesResponse } from '../../interfaces/interfaces';
import searchBooksSeries from '../../services/booksSeriesService';
import CardList from '../cardList/CardList';
import ErrorMessage from '../error/ErrorMessage';
import PaginationBar from '../pagination/PaginationBar';
import Spinner from '../spinner/Spinner';
import './searchInput.css';
import { useEffect, useState } from 'react';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('SEARCH_TERM') || ''
  );
  const [response, setResponse] = useState<BookSeriesResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  //todo duplicated code, to fix
  useEffect(() => {
    const term = localStorage.getItem('SEARCH_TERM');
    setLoading(true);
    searchBooksSeries(term ? term : '')
      .then((response) => setResponse(response))
      .catch((error: Error) => {
        setError(error);
        console.error('Error caught in SearchInput:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  //todo useActionState???
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchTerm.trim());
    localStorage.setItem('SEARCH_TERM', searchTerm.trim());
    setLoading(true);
    searchBooksSeries(searchTerm)
      .then((response) => setResponse(response))
      .catch((error: Error) => {
        setError(error);
        console.error('Error caught in SearchInput:', error);
      })
      .finally(() => setLoading(false));
  };

  const onPageChange = (pageNumber: number) => {
    const term = localStorage.getItem('SEARCH_TERM');
    setLoading(true);
    searchBooksSeries(term ? term : '', pageNumber)
      .then((response) => setResponse(response))
      .catch((error: Error) => {
        setError(error);
        console.error('Error caught in SearchInput:', error);
      })
      .finally(() => setLoading(false));
  };

  const renderForm = () => {
    return (
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    );
  };

  return (
    <div className="search-section">
      <h1>Star Track Books Series Search:</h1>
      {renderForm()}

      {loading && <Spinner />}
      {response && !loading && !error && <CardList data={response}></CardList>}

      {error && !loading && <ErrorMessage message={error.message} />}

      {response && response.page.numberOfElements > 0 && (
        <PaginationBar page={response.page} onPageChange={onPageChange} />
      )}
    </div>
  );
}
