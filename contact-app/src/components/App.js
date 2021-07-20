import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";
import ContactDetails from "./ContactDetails";
import WarningPop from "./WarningPopup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../api/contacts";
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContact] = useState([]);
  const[term,setSearchTerm] = useState("");
  const[searchresults,setsearchResults] = useState([]);
  const getAllcontacts = async () => {
    const resp = await api.get("/contacts");
    return resp.data;
  };
  

  useEffect(() => {
    const finalContacts = async () => {
      const allcontacts = await getAllcontacts();
     if (allcontacts) setContact(allcontacts);
    };
    finalContacts();
  }, []);
  useEffect(() => {
   //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const getContact = async (newcontact) => {

    const request = {
      id:uuid,
      ...newcontact
    };
    const response = await api.post('/contacts',request);
    setContact([...contacts, response.data]);
  };

  const editContact = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email} = response.data;
    setContact(
      contacts.map((contact)=>{
      return contact.id !== id ?  contact : {...response.data};
    })
    );
  };
 
  const removeContact = async (id) => {
    await api.delete(`contacts/${id}`);
    const pendingcontacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContact(pendingcontacts);
  };
  const searchTermHandler = (typedval)=>{
    setSearchTerm(typedval);
    if(typedval!=""){
      setsearchResults(contacts.filter((contact)=>{
        //typedval
        return Object.values(contact).join(" ").toLowerCase().includes(typedval.toLowerCase());
    }));
   
    }else{
      setsearchResults(contacts);
    }
   
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
                contacts={term.length<1 ? contacts : searchresults}
                removeContact={removeContact}
                term={term}
                searchTermHandler={searchTermHandler}
                
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
          <Route
            path="/editcontact/:id"
            render={(props) => (
              <EditContact {...props}  editContact={editContact}/>
            )}
          />
          
          {/* <Route path="/warning/:id" component={WarningPop} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
