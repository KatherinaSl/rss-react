import { ReactNode } from 'react';

interface Page {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface CardListProperties {
  bookSeries: BookSeries[];
}

export interface SearchBookSeriesResponse {
  bookSeries: BookSeries[];
  page: Page;
}

export interface GetBookSeriesResponse {
  bookSeries: BookSeries;
}

export interface BookSeries {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfBooks?: number;
  books?: Book[];
}

export interface Book {
  title: string;
  publishedYear?: number;
}

export interface BookSeriesDetails {
  label: string;
  value?: number | string;
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
}

export interface PaginationBarProps {
  page: Page;
  onPageChange: (pageNumber: number) => void;
}
