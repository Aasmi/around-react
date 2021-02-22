import React, {useState, useEffect, useContext} from 'react';
import api from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
    const {onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardDelete,
    onCardLike,
    cards
     } = props;

    const currentUser = useContext(CurrentUserContext);

    //set states for profile content - Context added , usestate is not needed
   /* const [userAvatar, setUserAvatar] = useState('');
   const [userName, setUserName] = useState('');
   const [userDescription, setUserDescription] = useState('');
   const [isLoaded, setIsLoaded] = useState(false);
 */
   //set states for cards
   //const [cards, setCards] = useState([]);
   
   //call server for profile content
  /*  useEffect(() => {
       api.getUserInfo()
       .then((res) => {
           setUserAvatar(res.avatar);
           console.log("Am I getting user variables?");
           console.log(res);
           setUserName(res.name);
           setUserDescription(res.about);
       })
       .catch(err => console.log(err));

       //call server to get initial cards
       api.getInitialCards()
       .then((res) => {
           console.log(res)
           setCards(res)
       })
       .catch(err => console.log(err));
   }, []);
 */

   //JSX of main section
    return(
            <main className="content">
                <section className="profile">
                        <div className="profile__avatar">
                            <img className="profile__image" src={currentUser.avatar} alt={currentUser.avatar}/>
                            <button onClick={onEditAvatar} className="profile__image-edit" type="button" aria-label="Edit Avatar"></button>
                        </div>
                        <div className="profile__info">
                            <h1 className="profile__info-title">{currentUser.name}</h1>
                            <button className="profile__edit-button" onClick={onEditProfile} aria-label="Edit Profile"></button>
                            <p className="profile__info-subtitle">{currentUser.about}</p>   
                        </div>
                         <button className="profile__add-button" onClick={onAddPlace} aria-label="Add"></button>
                </section>
                <section className="elements">
                    <>
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card = {card}
                            onCardDelete = {onCardDelete}
                            onCardClick = {onCardClick}
                            onCardLike = {onCardLike}
                        />
                        )
                    )}
                    </>
                </section>
            </main>
    );
}

export default Main;
