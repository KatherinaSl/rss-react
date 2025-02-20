import { http, HttpResponse } from 'msw';
import { BASE_URL, SEARCH } from '../../constants/constants';
import { Page } from '../../interfaces/models';

export const handlers = [
  http.get(`${BASE_URL}`, ({ request }) => {
    const url = new URL(request.url);
    const uid = url.searchParams.get('uid');
    if (uid === '400') {
      return HttpResponse.json(
        {
          bookSeries: {
            uid,
            title: `Test${uid}`,
            books: [],
          },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        bookSeries: {
          uid,
          title: `Test${uid}`,
          books: [{ title: `TestBook${uid}`, publishedYear: 1111 }],
        },
      },
      { status: 200 }
    );
  }),

  http.post(`${BASE_URL}/${SEARCH}`, async ({ request }) => {
    const bodyText = await request.text();
    const body = new URLSearchParams(bodyText);

    const { title } = Object.fromEntries(body.entries());

    const respBody = {
      bookSeries: [createBookSeries('12345', title)],
      page: createPage(),
    };

    return HttpResponse.json(respBody, { status: 200 });
  }),
];

const createPage = (): Page => {
  return {
    pageNumber: 3,
    pageSize: 5,
    numberOfElements: 5,
    totalElements: 50,
    totalPages: 10,
    firstPage: false,
    lastPage: false,
  };
};

const createBookSeries = (uid: string, title: string) => {
  return {
    uid,
    title: title === '' ? 'BookSeriesTitle' : title,
    books: [{ title: `TestBook${uid}`, publishedYear: 1111 }],
  };
};
