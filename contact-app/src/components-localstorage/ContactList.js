import React from 'react';
import ContactCard from './ContactCard';
import {Link} from 'react-router-dom';
const ContactList = (props) => {
    const getContactClicked = (id)=>{
        props.removeContact(id);
    }
    const renderContactList = props.contacts.map((contact)=>{
             return (
                <ContactCard contact={contact} getContactClicked={getContactClicked}></ContactCard>
                )
    });
    return (
        <>
        <div className="main">
        <h2>Contact List<Link to="/add">
        <button className="ui right floated button blue">Add Contact</button>
        </Link></h2>
        
        </div>
        
        <div className="ui celled list">{renderContactList}</div>
        </>
    )
}
export default ContactList;