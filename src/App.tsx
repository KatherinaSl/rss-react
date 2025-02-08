import BooksSeriesSearch from './components/searchInput/BooksSeriesSearch';
import ErrorBoundary from './components/error/ErrorBoundary';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import ErrorPage from './components/error/ErrorPage';
import CardDetails from './components/cardDetails/CardDetails';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Outlet />}>
            <Route index element={<BooksSeriesSearch />} />
            <Route path={'page/:pid'} element={<BooksSeriesSearch />} />
            <Route
              path={'page/:pid/card/:cardId'}
              element={<BooksSeriesSearch />}
            >
              <Route index element={<CardDetails />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
