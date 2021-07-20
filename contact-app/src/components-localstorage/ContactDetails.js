import React from 'react';
import  userimg from '../images/user.jpg';
import {Link} from 'react-router-dom';
const ContactDetails = (props)=>{
   const{name,email} = props.location.state.contact;
    return(
        <div className="main">
            <div className="ui card centered">
                    <div className="image">
                        <img src ={userimg} alt="user" />
                    </div>
                    <div className="content">
                            <div className="header">{name}</div> 
                            <div className="description">{email}</div> 
                    </div>
             </div>
                    <div className="center-div">
                       <Link to="/" >
                       <button className="ui button blue center">Back To Contact list</button>
                       </Link>
                    </div>
        </div>
    );
}
export default ContactDetails;