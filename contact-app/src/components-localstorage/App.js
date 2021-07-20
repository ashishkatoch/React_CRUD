import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";
import ContactDetails from "./ContactDetails";
import WarningPop from "./WarningPopup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../api/contacts";
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContact] = useState([]);
  // const getAllcontacts = async () => {
  //   const resp = await api.get("/contacts");
  //   return resp;
  // };
  useEffect(() => {
    // const finalContacts = async () => {
    //   const allcontacts = await getAllcontacts();
    //   if (allcontacts) setContact(allcontacts);
    // };
    // finalContacts();
    const allcontacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(allcontacts) setContact(allcontacts);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const getContact = (newcontact) => {
    setContact([...contacts, { id: uuid(), ...newcontact }]);
  };
  const removeContact = (id) => {
    const pendingcontacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContact(pendingcontacts);
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                removeContact={removeContact}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} getContact={getContact} />
            )}
          />
          {/* <Route path="/contactdetails/:id" render={(props)=>(<ContactDetails />)} /> */}
          <Route path="/contactdetails/:id" component={ContactDetails} />
          <Route
            path="/warning/:id"
            render={(props) => (
              <WarningPop {...props} removeContact={removeContact} />
            )}
          />
          {/* <Route path="/warning/:id" component={WarningPop} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
