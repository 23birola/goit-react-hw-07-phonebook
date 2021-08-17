import PropTypes from 'prop-types';
import css from './ContactList.module.css';

import ContactListItem from "../ContactListItem/ContactListItem";


const ContactList = ({ contacts}) => {
  return (
      <ul className={css.contactList}>
        {contacts.map(contact =>
          <ContactListItem contact={contact} key={contact.id}/>)}
      </ul>);
}

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
};

export default ContactList;