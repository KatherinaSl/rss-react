import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CardState } from '../../interfaces/interfaces';
import { RootState } from '../../app/store';
import { BookSeries } from '../../interfaces/models';

const initialState: CardState = {
  pickedValues: [],
};

export const cardsPickerSlice = createSlice({
  name: 'picker',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<BookSeries>) => {
      state.pickedValues.push(action.payload);
    },
    remove: (state, action: PayloadAction<BookSeries>) => {
      const index = state.pickedValues.indexOf(action.payload);
      state.pickedValues.splice(index, 1);
    },
    removeAll: (state) => {
      state.pickedValues = [];
    },
  },
});

export const selectCheckbox = (state: RootState) =>
  state.picker.pickedValues.length;

export const selectIsBookInStore = (state: RootState, id: string): boolean =>
  state.picker.pickedValues.some((bookSeries) => bookSeries.uid === id);

export const { save, remove, removeAll } = cardsPickerSlice.actions;

export default cardsPickerSlice.reducer;
