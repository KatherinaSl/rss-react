import '@testing-library/jest-dom/vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import renderWithProviders from '../utils/test-utils';
import Flyout from '../../components/flyout/Flyout';

describe('Flyout', () => {
  it('should render Flyout component with correct count', () => {
    renderWithProviders(
      <MemoryRouter>
        <Flyout count={3} />
      </MemoryRouter>
    );
    expect(screen.getByText('3 items selected')).toBeVisible();
  });
});
