import { handlers } from './mockHandlers';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
