
import Card from "./Card";
import PropTypes from "prop-types";
import './Cards.css';

const CardList = ({ cards, boardTitle, boardOwner, onDeleteCard, onLikeCard, onShowCardForm }) =>{
  return (
    <section className="cards-list-container"> 
      <section className="cards-header-section">
        <div className="left-side">
          <h3 className="card-board-title">{boardTitle}</h3>
          <p className="owner-name">By {boardOwner.charAt(0).toUpperCase() + boardOwner.slice(1)}</p>
          <div className="card-stats">{cards.length} cards • {cards.reduce((totalLikes, card) => totalLikes + card.likes, 0)} likes</div>
        </div>
        <button className="right-side submit-button create-card-button" onClick={onShowCardForm}><span>+</span>Create New Card</button>
      </section>
      <div className="divide-line"></div>
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
    </section>
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
    boardOwner: PropTypes.string.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
    onLikeCard: PropTypes.func.isRequired,
    onShowCardForm: PropTypes.func.isRequired,
};

export default CardList;