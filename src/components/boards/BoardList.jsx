import Board from './Board';
import PropTypes from 'prop-types';

const BoardList = ({ boards, selectedBoard, onSelectBoard }) =>{
    return (
        <ol>
            {boards.map(board => (
                <Board 
                    key={board.id}
                    board={board}
                    isSelected={selectedBoard?.id === board.id}
                    onSelect={onSelectBoard}/>
            ))}
        </ol>
    );
};



export default BoardList;