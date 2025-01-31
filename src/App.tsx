import { Component, ReactNode } from 'react';
import SearchInput from './components/searchInput/SearchInput';
import ErrorBoundary from './components/error/ErrorBoundary';
import './index.css';
import ThrowButton from './components/button/ErrorButton';

const URL_API = 'https://stapi.co/api/v1/rest/bookSeries/search?pageNumber=0';

class App extends Component {
  render(): ReactNode {
    return (
      <div className="main-wrapper">
        <ErrorBoundary>
          <SearchInput searchUrl={URL_API} />
          <ThrowButton />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
