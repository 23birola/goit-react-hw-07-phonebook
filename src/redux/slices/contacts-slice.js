import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const result = await axios.get(
      'https://611a211bcbf1b30017eb54f5.mockapi.io/api/v1/contacts',
    );
    return result.data;
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const result = await axios.post(
      'https://611a211bcbf1b30017eb54f5.mockapi.io/api/v1/contacts',
      contact,
    );
    return result.data;
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await axios.delete(
      `https://611a211bcbf1b30017eb54f5.mockapi.io/api/v1/contacts/${id}`,
    );
    return id;
  },
);

const ItemsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: null,
    error: null,
  },

  extraReducers: {
    [fetchContacts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = null;
      state.error = null;
    },
    [fetchContacts.pending]: (state, _) => {
      state.status = 'loading';
    },
    [fetchContacts.rejected]: (state, _) => {
      state.status = null;
      state.error = 'Error';
    },

    [addContact.fulfilled]: (state, action) => {
      state.items = [...state.items, action.payload];
      state.status = null;
      state.error = null;
    },
    [addContact.pending]: (state, _) => {
      state.status = 'loading';
      state.error = null;
    },
    [addContact.rejected]: (state, _) => {
      state.status = null;
      state.error = 'Error';
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload,
      );
    },
  },
});

export const { addItem, deleteItem } = ItemsSlice.actions;
export default ItemsSlice.reducer;
