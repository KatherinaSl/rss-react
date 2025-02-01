import { Component, ReactNode } from 'react';
import SearchInput from './components/searchInput/SearchInput';
import ErrorBoundary from './components/error/ErrorBoundary';
import './index.css';
import ThrowErrorButton from './components/button/ThrowErrorButton';
import { URL_API } from './constants/constants';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <SearchInput searchUrl={URL_API} />
        <ThrowErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
