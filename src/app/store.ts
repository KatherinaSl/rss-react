import { configureStore } from '@reduxjs/toolkit';
import pickerReducer from '../features/picker/cardsPickerSlice';

export const store = configureStore({
  reducer: { picker: pickerReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
