export interface Page {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface BookSeries {
  uid: string;
  title: string;
  publishedYearFrom?: number;
  publishedYearTo?: number;
  numberOfBooks?: number;
  miniseries?: boolean;
  eBookSeries?: boolean;
  books?: Book[];
  url?: string;
}

export interface Book {
  title: string;
  publishedYear?: number;
}

export interface SearchBookSeriesResponse {
  bookSeries: BookSeries[];
  page: Page;
}

export interface GetBookSeriesResponse {
  bookSeries: BookSeries;
}
