import { Component, FormEvent, ReactNode } from 'react';
import Card from '../card/Card';
import './searchInput.css';
import './loadingSpiner.css';
import {
  BookSeries,
  BookSeriesResponse,
  Properties,
  SearchInputState,
} from '../data/interfaces';

class SearchInput extends Component<Properties, SearchInputState> {
  constructor(props: Properties) {
    super(props);
    const savedSearchTerm = localStorage.getItem('SEARCH_TERM') || '';

    this.state = {
      searchTerm: savedSearchTerm,
      loading: false,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: event.target.value });
  };

  onSubmit(event: FormEvent): void {
    event.preventDefault();

    const { searchTerm } = this.state;
    const url = this.props.searchUrl;

    this.setState({ loading: true });
    localStorage.setItem('SEARCH_TERM', searchTerm);

    fetch(url, {
      method: 'POST',
      body: new URLSearchParams({ title: searchTerm }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response): Promise<BookSeriesResponse> => response.json())
      .then((data) => {
        const filteredData = data.bookSeries.filter((bookSeries: BookSeries) =>
          bookSeries.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ data: filteredData, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ error: 'Failed to fetch data', loading: false });
        this.setState(() => {
          throw new Error('Asynchronous error: Fetch failed');
        });
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
              data.map((bookSeries: BookSeries, index: number) => (
                <Card key={index} {...bookSeries} />
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
