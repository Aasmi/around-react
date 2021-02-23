import React, {useContext} from 'react';
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
                            currentUserId = {currentUser._id}
                        />
                        )
                    )}
                    </>
                </section>
            </main>
    );
}

export default Main;
