import React, {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/api.js';

function App() {
  const [editAvatarOpen, setEditAvatarOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); 
  const [submitStatus, setSubmitStatus] = useState(false);


    {/* handlers */}
   /*  function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
      });
    } */

    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.updateLikes(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(err))
  } 

    function handleCardDelete(card){
      api.removeCard(card._id)
      .then(() => {
          const cardList = cards.filter((i) => (i._id !== card._id))
          setCards(cardList);
      })
      .catch((err) => console.log(err));
   }
 
  
     //call server for profile content
     useEffect(() => {
         api.getInitialCards()
         .then((res) => {
             setCards(res)
         })
         .catch(err => console.log(err));
     }, []);
 
     useEffect(() => {
         api.getUserInfo()
         .then((res) => {
             setCurrentUser(res);
         })
         .catch(err => console.log(err));
     }, []);


    function handleEditAvatarClick(event){
      setEditAvatarOpen(true);
    }

    function handleEditProfileClick(event){
      setEditProfileOpen(true);
    }

    function handleAddCardClick(event){
      setAddCardOpen(true);
    }

    function handleCardClick(card) {
      setSelectedCard(card);
      setImagePopupOpen(true);
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
      console.log("Am I handling all close popups");
      if(event.target !== event.currentTarget)
        return  
      closeAllPopups();
    } 
    

  //This function is not working in the first review
  /* function handleAddPlace({name, link}){
      api.addCard({name, link})
      .then((newCard)=> {
         console.log("The newly added card details are:");
         console.log(name);
         console.log(link);
         setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }  */

  /*  function handleAddPlace(cardData) {
    api.addCard({name: cardData.name, link: cardData.link})
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }  */

  function handleAddCardSubmit(cardData) {
    api
      .addCard({ name: cardData.name, link: cardData.link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  
  
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
    .then((res) => {
        setCurrentUser(res);
    })
    .catch((err)=> console.log(err))
    .finally(() => closeAllPopups());
  }

  function handleUpdateUser({name, about}){
    api.setUserInfo({name, about})
    .then((res) => {
        setCurrentUser(res);
    })
    .catch((err) => console.log(err))
    .finally(() => closeAllPopups());
  }


      return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="body">  
          <Header />
          <Main cards = {cards}
                onEditAvatar = {handleEditAvatarClick}
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddCardClick}
                onCardDelete = {handleCardDelete}
                onCardClick = {handleCardClick}
                onCardLike = {handleCardLike} />
          <Footer />

          <EditAvatarPopup 
              isOpen={editAvatarOpen} 
              onClose={handleClosePopups} 
              onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup 
              isOpen={editProfileOpen} 
              onClose={handleClosePopups} 
              onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
              isOpen={addCardOpen}
              onClose = {handleClosePopups}
              /* onAddPlace = {handleAddPlace}  */
              onAddPlace={handleAddCardSubmit}
              submitStatus={submitStatus}
              setSubmitStatus={setSubmitStatus} />
             
          <PopupWithForm 
              name="type_delete-card" 
              title="Are you sure?" 
              buttonText="Yes" 
              isOpen={deletePopupOpen} 
              onClose={handleClosePopups} />

          <PopupWithImage card={selectedCard} isOpen={imagePopupOpen} onClose={handleClosePopups} />    
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
