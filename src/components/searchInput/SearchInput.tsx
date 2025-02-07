import { useParams } from 'react-router';
import { SEARCH_TERM } from '../../constants/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SearchBookSeriesResponse } from '../../interfaces/interfaces';
import { searchBooksSeries } from '../../services/booksSeriesService';
import CardList from '../cardList/CardList';
import ErrorMessage from '../error/ErrorMessage';
import PaginationBar from '../pagination/PaginationBar';
import Spinner from '../spinner/Spinner';
import './searchInput.css';
import { useEffect, useState } from 'react';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_TERM);
  const [response, setResponse] = useState<SearchBookSeriesResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { pid } = useParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value, false);
  };

  function fetchData(pageNumber: number = 0) {
    console.log(`fetch be page: ${pageNumber}`);
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
  }

  //todo | dependency list issue??? maybe use custom hook
  //TODO  | where pid is from router (in dependencies), and search term is from LS inside hook
  useEffect(() => {
    console.log('useEffect hook');
    fetchData(pid ? Number(pid) - 1 : 0);
    //todo remove suppression
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchTerm.trim());
    fetchData();
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

      {!error && !loading && response && response.page.numberOfElements > 0 && (
        <PaginationBar page={response.page} onPageChange={fetchData} />
      )}
    </div>
  );
}
