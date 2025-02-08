import { render } from '@testing-library/react';
import Spinner from '../../components/spinner/Spinner';
import '@testing-library/jest-dom/vitest';

describe('Spinner', () => {
  it('should render the Spinner component', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.spinner');
    expect(spinner).not.toBeNull();
  });
});
