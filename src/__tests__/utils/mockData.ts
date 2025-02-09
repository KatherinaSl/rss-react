export const page = {
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

export const bookSeriesOne = {
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

export const emptyBookSeries = {
  bookSeries: {
    uid: '12345',
    title: 'TestBookSeries',
    books: [],
  },
};

export const bookSeriesResponseOne = {
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
