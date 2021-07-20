import React,{useRef} from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
const ContactList = (props) => {

  const getContactClicked = (id) => {
    props.removeContact(id);
  };
  const inputEle= useRef(""); 
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        getContactClicked={getContactClicked}
      ></ContactCard>
    );
  });
  const searchTerm = () => {
     if(inputEle.current.value.length){ 
        props.searchTermHandler(inputEle.current.value);
    }
  };
  return (
    <>
      <div className="main">
        <h2>
          Contact List
          <Link to="/add">
            <button className="ui right floated button blue">
              Add Contact
            </button>
          </Link>
        </h2>
        <div className="ui search full">
          <div className="ui icon input">
            <input
              type="text"
              ref={inputEle}
              value={props.term}
              onChange={searchTerm}
              className="prompt"
              placeholder="Search Contacts"
            ></input>
            <i className="search icon"></i>
          </div>
        </div>
      </div>
      <div className="ui celled list">{renderContactList.length < 1 ? "No contacts available" : renderContactList}</div>
    </>
  );
};
export default ContactList;
