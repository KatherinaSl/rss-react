import SearchInput from './components/searchInput/SearchInput';
import ErrorBoundary from './components/error/ErrorBoundary';
import ThrowErrorButton from './components/button/ThrowErrorButton';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import ErrorPage from './components/error/ErrorPage';
import CardDetails from './components/cardDetails/CardDetails';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Outlet />}>
            <Route index element={<SearchInput />} />
            <Route path={'page/:pid'} element={<SearchInput />} />
            <Route path={'page/:pid/card/:cardId'} element={<SearchInput />}>
              <Route index element={<CardDetails />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ThrowErrorButton />
    </ErrorBoundary>
  );
}
