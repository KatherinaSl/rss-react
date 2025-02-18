import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit/react';
import { ReactNode } from 'react';
import { BookSeries, Page } from './models';

export interface CardListProps {
  bookSeries: BookSeries[];
}

export interface BookSeriesDetailsProps {
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
  error?: FetchBaseQueryError | SerializedError;
  message?: string;
}

export interface PaginationBarProps {
  page: Page;
  onPageChange: (pageNumber: number) => void;
}

export interface CardState {
  pickedValues: BookSeries[];
}

export interface ThemeContextProps {
  theme: string;
  handleThemeChange?: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface FlyoutProps {
  count: number;
}

export interface CheckboxProps {
  id: string;
  onClick: (isChecked: boolean) => void;
}
