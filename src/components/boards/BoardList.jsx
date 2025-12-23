import Board from './Board';
import PropTypes from 'prop-types';
import './Boards.css'

const BoardList = ({ boards, selectedBoard, onSelectBoard, onDeleteBoard }) =>{
    return (
        <ul className='board-list'>
            {boards.map(board => (
                <Board 
                    key={board.id}
                    board={board}
                    isSelected={selectedBoard?.id === board.id}
                    onSelect={onSelectBoard}
                    onDelete={onDeleteBoard}
                    />
            ))}
        </ul>
    );
};

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ).isRequired,
    selectedBoard: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        name: PropTypes.string,
        cards: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                message: PropTypes.string,
                likes: PropTypes.number,
            })
        ),
    }),
    onSelectBoard: PropTypes.func.isRequired,
    onDeleteBoard: PropTypes.func.isRequired,
};


export default BoardList;