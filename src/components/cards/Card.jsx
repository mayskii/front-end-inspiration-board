import PropTypes from "prop-types";
import './Cards.css';

const Card = ({ card, onDelete, onLikeCard }) =>{
  const colors = ["yellow", "mint", "lavender", "peach", "sky"];
  const colorIndex = card.id % colors.length;
  const cardColor = colors[colorIndex];
  
  return (
    <div className="card-container">
      <div className="pin"></div>
      <div className={`note ${cardColor}`}>
        <p className="card-message">{card.message}</p>
          <div className="note-buttons-container">
          <button onClick={() => onLikeCard(card.id)} className="like-button"><div>❤️</div>{card.likes}</button>
          <button onClick={() => onDelete(card.id)} className="delete-button"><i className="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
      
    </div>
  )
}

Card.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        likes: PropTypes.number,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onLikeCard: PropTypes.func.isRequired,
};

export default Card;