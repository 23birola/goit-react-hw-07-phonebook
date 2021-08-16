import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const initialState = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const result = await axios.get(
      'https://611a211bcbf1b30017eb54f5.mockapi.io/api/v1/contacts',
    );
    return result.data;
  },
);

const ItemsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {
    addItem: (state, action) => [...state, action.payload],
    deleteItem: (state, action) =>
      state.filter(contact => contact.id !== action.payload),
  },
  extraReducers: {
    [fetchContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload.data;
      state.status = null;
      state.error = null;
    },
    [fetchContacts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchContacts.rejected]: (state, action) => {
      state.status = null;
      state.error = 'Error';
    },
  },
});

export const { addItem, deleteItem } = ItemsSlice.actions;
export default ItemsSlice.reducer;
