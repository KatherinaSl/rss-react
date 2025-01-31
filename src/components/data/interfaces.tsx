import { ReactNode } from 'react';

export interface BookSeries {
  title: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfBooks?: number;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface SearchInputState {
  searchTerm: string;
  data?: BookSeries[];
  loading: boolean;
  error?: string;
}

export interface BookSeriesResponse {
  bookSeries: BookSeries[];
}

export interface Properties {
  searchUrl: string;
  // onSumbit:
}
