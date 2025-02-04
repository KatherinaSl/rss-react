import SearchInput from './components/searchInput/SearchInput';
import ErrorBoundary from './components/error/ErrorBoundary';
import ThrowErrorButton from './components/button/ThrowErrorButton';

export default function App() {
  return (
    <ErrorBoundary>
      <SearchInput />
      <ThrowErrorButton />
    </ErrorBoundary>
  );
}
