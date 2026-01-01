
import Card from "./Card";
import PropTypes from "prop-types";
import './Cards.css';

const CardList = ({ cards, boardTitle, onDeleteCard, onLikeCard }) =>{
  return (
    <> 
      <h3>{boardTitle}</h3>
      <ul className='card-list'>
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            onLikeCard={onLikeCard}
            onDelete={onDeleteCard}
          />
        ))}
      </ul>
    </>
  )
}

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes: PropTypes.number,
        })
    ).isRequired,
    boardTitle: PropTypes.string.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
    onLikeCard: PropTypes.func.isRequired,
};

export default CardList;