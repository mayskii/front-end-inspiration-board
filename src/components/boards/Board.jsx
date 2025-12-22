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

export default Board;