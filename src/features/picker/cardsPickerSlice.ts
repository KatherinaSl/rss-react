import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BookSeries } from '../../interfaces/interfaces';

export interface CardState {
  pickedValues: BookSeries[];
}

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

export const { save, remove, removeAll } = cardsPickerSlice.actions;

export default cardsPickerSlice.reducer;
