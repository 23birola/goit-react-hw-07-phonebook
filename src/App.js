import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import { addItem, deleteItem } from './redux/slices/contacts-slice';
import { filterContacts } from './redux/slices/filter-slice';
import Filter from './components/Filter/Filter';
import css from './App.module.css';
import { useEffect } from 'react';
import { fetchContacts } from './redux/slices/contacts-slice';

export default function App() {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  console.log('contacts', contacts);
  const filter = useSelector(state => state.filter);

  const onSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;
    const id = uuidv4();
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (existingContact) {
      return toast.error(`${name} is already in contacts!!!`);
    }
    dispatch(addItem({ id, name, number }));

    e.target.elements.name.value = '';
    e.target.elements.number.value = '';
  };

  const handleChange = e => {
    const filterName = e.target.value.toLowerCase();
    console.log(filterName);
    dispatch(filterContacts(filterName));
  };

  const handleFilter = () => {
    if (!filter) {
      return;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter),
      );
    }
  };

  const deleteContact = contactId => {
    dispatch(deleteItem(contactId));
  };

  const selectedContacts = handleFilter();

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmit} />

      <h2>Contacts</h2>
      <Filter filterByName={handleChange} />
      {!filter && (
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      )}
      {filter && (
        <ContactList
          contacts={selectedContacts}
          deleteContact={deleteContact}
        />
      )}
      <Toaster />
    </div>
  );
}
