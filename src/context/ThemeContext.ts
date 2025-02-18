import { createContext } from 'react';
import { ThemeContextProps } from '../interfaces/interfaces';

export const ThemeContext = createContext<ThemeContextProps>({ theme: 'dark' });
