import React from 'react';
import {Link} from 'react-router-dom';
const WarningPop = (props)=>{
    const {contactId} = props.location.state;  
    const deleteIt = (contactId)=>{        
        props.removeContact(contactId);
        props.history.push('/');
    }  
    const goBack= ()=>{
        props.history.push('/');
    }
    return(
        <>
        <h1 className="error">Are you surely want to delete this contact ?</h1>
       
        <button className="ui left floated button red" onClick={()=>deleteIt(contactId)} >Yes</button>
        <button className="ui left floated button blue" onClick={()=>goBack()} >No</button>
        </>
        
    );
};
export default WarningPop;
