import { configureStore } from '@reduxjs/toolkit';
import pickerReducer from '../features/picker/cardsPickerSlice';
import { apiBookSeries } from '../features/api/apiSlicer';

export const store = configureStore({
  reducer: {
    picker: pickerReducer,
    [apiBookSeries.reducerPath]: apiBookSeries.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBookSeries.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
