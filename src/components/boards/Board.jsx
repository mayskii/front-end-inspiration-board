import PropTypes from 'prop-types';

const Board = ({ board, isSelected, onSelect }) =>{
    return (
        <li className={`board-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(board)}
        >
            <h3>{board.title}</h3>
            <p>{board.name}</p>
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
};


export default Board;