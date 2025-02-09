export const defaultPage = {
  pageNumber: 2,
  pageSize: 3,
  numberOfElements: 3,
  totalElements: 15,
  totalPages: 5,
  firstPage: false,
  lastPage: false,
};

export const firstPage = {
  pageNumber: 1,
  pageSize: 3,
  numberOfElements: 3,
  totalElements: 15,
  totalPages: 5,
  firstPage: true,
  lastPage: false,
};

export const lastPage = {
  pageNumber: 5,
  pageSize: 3,
  numberOfElements: 3,
  totalElements: 15,
  totalPages: 5,
  firstPage: false,
  lastPage: true,
};

export const simpleBookSeriesDetails = {
  bookSeries: {
    uid: '12345',
    title: 'TestBookSeries',
    books: [
      {
        title: 'test book',
        publishedYear: 1996,
      },
    ],
  },
};

export const emptyBookSeriesDetails = {
  bookSeries: {
    uid: '12345',
    title: 'TestBookSeries',
    books: [],
  },
};

export const bookSeriesResponse = {
  bookSeries: [
    {
      uid: '12345',
      title: 'TestBookSeries1',
    },
    {
      uid: '56789',
      title: 'TestBookSeries2',
    },
  ],
  page: firstPage,
};

export const bookSeriesSearchResponse = {
  bookSeries: [
    {
      uid: 'Test1',
      title: 'Book series1',
    },
  ],
  page: {
    pageNumber: 1,
    pageSize: 5,
    numberOfElements: 5,
    totalElements: 5,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
};

export const firstBook = {
  bookSeries: {
    uid: 'Test1',
    title: 'Book series1',
  },
};

export const bookSeries = [
  { uid: '123', title: 'TestSeries1' },
  { uid: '345', title: 'TestSeries2' },
];
