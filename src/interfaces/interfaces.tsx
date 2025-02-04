import { ReactNode } from 'react';

export interface BookSeries {
  title: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfBooks?: number;
}

export interface BookSeriesDetailes {
  label: string;
  value?: number;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ErrorMessageProps {
  message?: string;
  resetError?: () => void;
}

export interface SearchInputState {
  searchTerm: string;
  data: BookSeries[];
  loading: boolean;
  error?: string;
}

export interface Page {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface BookSeriesResponse {
  bookSeries: BookSeries[];
  page: Page;
}

export interface SearchInputProperties {
  searchUrl: string;
}
