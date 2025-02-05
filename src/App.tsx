import SearchInput from './components/searchInput/SearchInput';
import ErrorBoundary from './components/error/ErrorBoundary';
import ThrowErrorButton from './components/button/ThrowErrorButton';
// import Navigation from './services/Navigation';
// import PaginationBar from './components/pagination/PaginationBar';

export default function App() {
  return (
    <ErrorBoundary>
      <SearchInput />
      {/* <PaginationBar totalCards={50} cardsPerPage={4}></PaginationBar> */}
      <ThrowErrorButton />
      {/* <Navigation></Navigation> */}
    </ErrorBoundary>
  );
}
