import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';
import { deleteContact } from '../../redux/slices/contacts-slice';
import { useDispatch } from 'react-redux';

const ContactListItem = ({ contact}) => {
  
const dispatch = useDispatch();
const deleteItem = (id) => {
    dispatch(deleteContact(id));
  };

return (
    <li className={css.contactItem}>
        <span className={css.name}>{contact.name}</span>
        <span className={css.number}>{contact.number}</span>
        <button type="button" onClick={() => deleteItem(contact.id)}>Delete</button>
    </li>);
}
    
ContactListItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactListItem;