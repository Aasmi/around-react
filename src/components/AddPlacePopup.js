import PopupWithForm from './PopupWithForm.js';
import React, {useState} from 'react';

function AddPlacePopup(props) {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')



  function handleNameChange(e) {
    setName(e.target.value);
  }


  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
    props.setSubmitStatus(true);
    setName('');
    setLink('');
  } 

    return (

        <PopupWithForm 
            name = 'type_add-card' 
            formType = 'type_profile' 
            title = 'New Place' 
            buttonText = { props.submitStatus ? 'Creating...' : 'Create' } 
            isOpen = {props.isOpen} 
            onClose = {props.onClose}
            onSubmit = {handleSubmit}>

            <input id="card-title" 
            type= 'title' 
            name='card-title' 
            value = {name}
            onChange = {handleNameChange}
            className="popup__input popup__input_type_title" 
            placeholder='Title' required maxLength="30" minLength="2"/>
            <span id="card-title-error" className = "popup__error"></span>

            <input id="card-url" 
            type='url' 
            name='card-link' 
            value = {link} 
            onChange = {handleLinkChange}
            className='popup__input popup__input_type_link' 
            placeholder='Image Link' required/>
            <span id="card-url-error" className = "popup__error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;