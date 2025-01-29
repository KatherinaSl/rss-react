import { Component, FormEvent, ReactNode } from 'react';
import Card from '../card/Card';
import './searchInput.css';
import './loading.css';

interface Properties {
  text?: string;
}

interface SearchInputState {
  searchTerm: string;
  data: BookSeriesSearchRequest[] | null;
  loading: boolean;
  error: string | null;
}

interface BookSeriesSearchRequest {
  title: string;
  publishedYearFrom: number | null;
  publishedYearTo: number | null;
  numberOfBooksFrom: number | null;
  numberOfBooks: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  miniseries: boolean;
  ebookSeries: boolean;
}

class SearchInput extends Component<Properties, SearchInputState> {
  constructor(props: Properties) {
    super(props);
    const savedSearchTerm = localStorage.getItem('SEARCH_TERM') || '';

    this.state = {
      searchTerm: savedSearchTerm,
      data: null,
      loading: false,
      error: null,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`on change ${event.target.value}`);
    this.setState({ searchTerm: event.target.value });
  };

  onSubmit(event: FormEvent) {
    event.preventDefault();

    const { searchTerm } = this.state;

    this.setState({ loading: true });
    localStorage.setItem('SEARCH_TERM', searchTerm);

    const url = 'https://stapi.co/api/v1/rest/bookSeries/search?pageNumber=0';
    // const url = 'https://stapi.co/api/v1/rest/bookSeries/search';

    fetch(url, {
      method: 'POST',
      body: new URLSearchParams({ title: searchTerm }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.bookSeries.filter(
          (bookSeries: BookSeriesSearchRequest) =>
            bookSeries.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ data: filteredData, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ error: 'Failed to fetch data', loading: false });
      });
  }

  render(): ReactNode {
    const { searchTerm, data, loading } = this.state;
    return (
      <div className="search">
        <h1>Star Track Books Series:</h1>
        <form action="" onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
        </form>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {data && !loading && (
          <div className="cards">
            {data.length > 0 ? (
              data.map((bookSeries: BookSeriesSearchRequest, index: number) => (
                <Card
                  key={index}
                  title={bookSeries.title}
                  publishedYearFrom={bookSeries.publishedYearFrom}
                  publishedYearTo={bookSeries.publishedYearTo}
                  numberOfBooks={bookSeries.numberOfBooks}
                />
              ))
            ) : (
              <p>No book series found for the given search term.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchInput;
