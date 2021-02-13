import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {
  const [editAvatarOpen, setEditAvatarOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    {/* handlers */}
    function handleEditAvatarClick(event){
      setEditAvatarOpen(true);
    }

    function handleEditProfileClick(event){
      setEditProfileOpen(true);
    }

    function handleAddCardClick(event){
      setAddCardOpen(true);
    }

    function handleDeleteCardClick(event) {
      setDeletePopupOpen(true);
    }

    function closeAllPopups(){
      setEditAvatarOpen(false);
      setEditProfileOpen(false);
      setAddCardOpen(false);
      setDeletePopupOpen(false);
      setImagePopupOpen(false);
      setSelectedCard({name: '', link: ''});
    }

    function handleClosePopups(event){
      if(event.target !== event.currentTarget)
      return
          closeAllPopups();
    }

    

    function handleCardClick(card) {
      setSelectedCard(card);
      setImagePopupOpen(true);
    }  

      return (
        <div className="body">  
          <Header />
          <Main onEditAvatar = {handleEditAvatarClick}
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddCardClick}
                onCardDelete = {handleDeleteCardClick}
                onCardClick = {handleCardClick} />
          <Footer />

          <PopupWithForm 
              name="type_avatar"
              title="Change Profile Picture" 
              buttonText="Save" 
              isOpen={editAvatarOpen} 
              onClose={handleClosePopups}>
              <input type='url' name='avatarlink' className="popup__input popup__input_type_avatar-link" minLength="2" />
              <span id="avatar-URL-error" className = "popup__error"></span>
          </PopupWithForm>

          <PopupWithForm 
              name="type_edit" 
              title="Edit Profile" 
              buttonText="Save" 
              isOpen={editProfileOpen} 
              onClose={handleClosePopups}>
              <input id = "profile-name" type='text' name='name' className="popup__input popup__input_type_name" placeholder='Jacques Cousteau' required maxLength="40" minLength="2"/>
              <span id="profile-name-error" className = "popup__error"></span>

              <input id = "profile-text" type='text' name='job' className='popup__input popup__input_type_job' placeholder='Explorer' required maxLength="200" minLength="2"/>
              <span id="profile-text-error" className = "popup__error"></span>
          </PopupWithForm>

          <PopupWithForm 
              name="type_add-card" 
              title="New Place" 
              buttonText="Create" 
              isOpen={addCardOpen} 
              onClose={handleClosePopups}>
              <input id="card-title" type='text' name='card-title' className="popup__input popup__input_type_title" placeholder='Title' required maxLength="30" minLength="2"/>
              <span id="card-title-error" className = "popup__error"></span>

              <input id="card-url" type='url' name='card-link' className='popup__input popup__input_type_link' placeholder='Image Link' required/>
              <span id="card-url-error" className = "popup__error"></span>
          </PopupWithForm>

          <PopupWithForm 
              name="type_delete-card" 
              title="Are you sure?" 
              buttonText="Yes" 
              isOpen={deletePopupOpen} 
              onClose={handleClosePopups} />

          <PopupWithImage card={selectedCard} isOpen={imagePopupOpen} onClose={handleClosePopups} />    
    </div>
  );
}

export default App;
