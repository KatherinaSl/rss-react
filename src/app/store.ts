import { configureStore } from '@reduxjs/toolkit';
import pickerReducer from '../features/picker/cardsPickerSlice';
import { apiBookSeries } from '../features/api/apiSlicer';
// import { listenerMiddleware } from './listenerMiddleware';

export const store = configureStore({
  reducer: {
    picker: pickerReducer,
    [apiBookSeries.reducerPath]: apiBookSeries.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      //   .prepend(listenerMiddleware.middleware)
      .concat(apiBookSeries.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
