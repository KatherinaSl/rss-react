import BooksSeriesSearch from './components/bookSeriesSearch/BooksSeriesSearch';
import ErrorBoundary from './components/error/ErrorBoundary';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import ErrorNotFound from './components/error/ErrorNotFound';
import CardDetails from './components/cardDetails/CardDetails';
import { ThemeProvider } from './components/themeProvider/ThemeProvider';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
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
              <Route path="*" element={<ErrorNotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
