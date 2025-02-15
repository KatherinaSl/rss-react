import { render, RenderOptions } from '@testing-library/react';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => {
  return render(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options,
  });
};

export default renderWithProviders;
