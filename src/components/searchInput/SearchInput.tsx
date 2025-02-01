import { Component, FormEvent, ReactNode } from 'react';
import './searchInput.css';
import {
  BookSeries,
  BookSeriesResponse,
  SearchInputProperties,
  SearchInputState,
} from '../../interfaces/interfaces';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Card from '../card/Card';
import { SEARCH_TERM } from '../../constants/constants';

class SearchInput extends Component<SearchInputProperties, SearchInputState> {
  constructor(props: SearchInputProperties) {
    super(props);
    const savedSearchTerm = localStorage.getItem(SEARCH_TERM) || '';

    this.state = {
      searchTerm: savedSearchTerm,
      loading: false,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchTerm: event.target.value });
  }

  private onSubmit(event: FormEvent): void {
    event.preventDefault();
    this.fetchData();
  }

  private fetchData() {
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim();
    const url = this.props.searchUrl;

    this.setState({ loading: true });
    localStorage.setItem(SEARCH_TERM, searchTerm);

    fetch(url, {
      method: 'POST',
      body: new URLSearchParams({ title: searchTerm }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response): Promise<BookSeriesResponse> => {
        if (response.ok) {
          return response.json();
        }
        const code = response.status;
        throw new Error(`Server answered with ${code} error`);
      })
      .then((data) => {
        this.setState({ data: data.bookSeries, loading: false });
      })
      .catch((error: Error) => {
        this.setState({ error: error.message, loading: false });
        console.error('Error caught in SearchInput:', error);
      });
  }

  private renderCards(data: BookSeries[]): ReactNode {
    return (
      <div className="cards">
        {data.length > 0 ? (
          data.map((bookSeries: BookSeries, index: number) => (
            <Card key={index} {...bookSeries} />
          ))
        ) : (
          <p>No book series found for the given search term.</p>
        )}
      </div>
    );
  }

  private renderForm() {
    return (
      <form action="" onSubmit={this.onSubmit.bind(this)}>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.handleChange.bind(this)}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }

  render(): ReactNode {
    const { data, loading, error } = this.state;
    return (
      <div className="search-section">
        <h1>Star Track Books Series Search:</h1>
        {this.renderForm()}

        {loading && <Spinner />}

        {error && !loading && <ErrorMessage message={error} />}

        {data && !loading && !error && this.renderCards(data)}
      </div>
    );
  }
}

export default SearchInput;
