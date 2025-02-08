import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Card from '../../components/card/Card';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('Card', () => {
  it('should render valid card on default page', () => {
    render(
      <MemoryRouter>
        <Card uid={'123'} title={'Book'} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(screen.getByRole('heading')).toHaveTextContent(/book/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/page/1/card/123');
  });

  it('should render valid link on provided page', () => {
    render(
      <MemoryRouter initialEntries={['/page/78']}>
        <Routes>
          <Route
            path="/page/:pid"
            element={<Card uid={'567'} title={'Link Test'} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/page/78/card/567');
  });
});
