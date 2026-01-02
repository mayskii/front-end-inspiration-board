import PropTypes from "prop-types";
import './Cards.css';

const Card = ({ card, onDelete, onLikeCard }) =>{
  return (
    <div>
      <p className="card-message">{card.message}</p>
      <div>Amount of likes: {card.likes}</div>
      <button onClick={() => onLikeCard(card.id)}>+1</button>
      <button onClick={() => onDelete(card.id)}>Delete</button>
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