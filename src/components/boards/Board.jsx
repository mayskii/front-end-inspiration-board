import PropTypes from 'prop-types';
import './Boards.css'

const Board = ({ board, isSelected, onSelect, onDelete }) =>{
    return (
        <li className={`board-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(board)}
        >
            <div className="board-item-content">
                <h3 className="board-title">{board.title}</h3>
                <p className="board-owner">By {board.name.charAt(0).toUpperCase() + board.name.slice(1)}</p>
            </div>
            
            <button id='delete-button'
                onClick={(e) => { 
                    e.stopPropagation();
                    onDelete(board.id);
                }}
            > 
            <i className="fa-regular fa-trash-can"></i>
            </button>
        </li>
    )
}

Board.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                message: PropTypes.string.isRequired,
                likes: PropTypes.number,
            })
        ).isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};


export default Board;