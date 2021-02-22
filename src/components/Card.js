import React, {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
   const {card, onCardDelete, onCardClick} = props;
   const currentUser = useContext(CurrentUserContext);

   // Checking if you are the owner of the current card
    const isOwn = card.owner._id === currentUser._id;

    // Creating a variable which you'll then set in `className` for the delete button
    const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );

    // Check if the card was liked by the current user
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Create a variable which you then set in `className` for the like button
    const cardLikeButtonClassName = `...`; 

    return(
        <figure className="elements__element">
                <img className="elements__element-pic" alt="card image" onClick ={() => onCardClick(card)} src={card && card.link}/>
                <figcaption className="elements__caption">{card.name}</figcaption>
                <div className = "elements__favorite-container">
                    <button className="elements__favorite" type="button" aria-label="Like"></button>
                    <p className="elements__likes">{card.likes.length}</p>
                </div>
                <button className="elements__trash" type="button" onClick ={() => onCardDelete(card)} aria-label="Delete"></button>
        </figure>
    );
}

export default Card;