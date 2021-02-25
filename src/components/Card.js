import React, {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
   const {card, onCardDelete, onCardClick, onCardLike} = props;
   const currentUser = useContext(CurrentUserContext);

   // Checking if you are the owner of the current card
    const isOwn = card.owner._id === currentUser._id;

   /*  // Creating a variable which you'll then set in `className` for the delete button
   // This code is necessary to make the trash icon visible
    const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    ); */

    // Check if the card was liked by the current user
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleLikeClick(e) {
       onCardLike(card)
    }
    
    function handleDeleteClick() {
      onCardDelete(card)
    }

    return(
        <figure className="elements__element">
                <img className="elements__element-pic" alt={card.name} onClick ={() => onCardClick(card)} src={card && card.link}/>
                <figcaption className="elements__caption">{card.name}</figcaption>
                <div className = "elements__favorite-container">
                    {/* <button className="elements__favorite" type="button" aria-label="Like"></button> */}
                    <button className = {`elements__favorite ${isLiked ? 'elements__favorite_selected' : null}`} aria-label = "Like button" type = "button" onClick = {handleLikeClick} />
                    <p className="elements__likes">{card.likes.length}</p>
                </div>
                {/* <button className="elements__trash" type="button" onClick ={() => onCardDelete(card)} aria-label="Delete"></button> */}
                {isOwn && <button className = "elements__trash" aria-label = "Delete button" type = "reset" onClick = {handleDeleteClick} />}
        </figure>
    );
}

export default Card;