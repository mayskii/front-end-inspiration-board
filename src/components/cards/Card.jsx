import PropTypes from "prop-types";
import './Cards.css';

const Card = ({ card, onDelete, onLikeCard }) =>{
  return (
    <div className="card-container">
      <i className="pin"></i>
      <div className="note yellow">
        <p className="card-message">{card.message}</p>
        <div>
          <p className="card-likes">Amount of likes: {card.likes} 💜</p>
          <button onClick={() => onLikeCard(card.id)} className="like-button">+1</button>
          <button onClick={() => onDelete(card.id)} className="delete-button">Delete</button>
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