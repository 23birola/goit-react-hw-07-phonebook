import { FILTER_CONTACTS } from '../types/phonebookTypes';

export const filterContacts = data => ({
  type: FILTER_CONTACTS,
  payload: data,
});
