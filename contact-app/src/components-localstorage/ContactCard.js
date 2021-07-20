import React from 'react';
import user from '../images/user.jpg'
import {Link} from 'react-router-dom';
const ContactCard = (props)=>{
    
    const {email,id,name} = props.contact;
    console.log(email);
    console.log(id);
    console.log('<br/>');
    const removeContact = (id)=>{
        props.getContactClicked(id);
    }
    return (
        <div className="item" key={id}>
            <img className="ui avatar image" src={user} />
            <div className="content">
            <Link to={{pathname: `contactdetails/${id}`,state:{contact:props.contact}}} >    
                <div className="header">{name}</div>
                <div>{email}</div>
            </Link>
            </div>
            {/* <i className="trash alternate outline icon" onClick={()=>{removeContact(id)}}></i> */}
            <Link to={{pathname: `warning/${id}`, state:{contactId:id}}}><i className="trash alternate outline icon"></i></Link>
        </div>
     )
}
export default ContactCard;