import BoardList from './components/boards/BoardList';
import NewBoardForm from './components/boards/NewBoardForm';
import CardList from './components/cards/CardList';
import NewCardForm from './components/cards/NewCardForm';
import { useState } from 'react';
import './App.css'

// Board   -  { id, title, name, cards }
// Card   -  { id, message, likes }

const BOARDS = [
  { id: 1, title: 'Travel', name: 'Maya', cards: [] },
  { id: 2, title: 'Ideas', name: 'Mumina', cards: [] },
  { id: 3, title: 'Cooking', name: 'Wenxin', cards: [] },
  { id: 4, title: 'Sport', name: 'Hsiang-ting', cards: [] },
];

function App() {
  const [boards, setBoards] = useState(BOARDS);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const addBoard = (newBoard) => {
    setBoards(prev => [...prev, newBoard])
  }

  const deleteBoard = (boardId) => {
    setBoards(prev => prev.filter(board => board.id !== boardId));

    if(selectedBoard?.id === boardId) {
      setSelectedBoard(null);
    }
  }

  return (
    <div className="app-container">
      <h1 className='title'>Inspiration Board</h1>
      <div className='top-section'>

        <section className='board-list-wrapper'>
          <h2 className='boards-title'>Boards</h2>
          <BoardList 
          boards={boards}
          selectedBoard={selectedBoard}
          onSelectBoard={setSelectedBoard}
          onDeleteBoard={deleteBoard}
          />
        </section>

        <section className="selected-board-wrapper">
          <h2 className='selected-boards-title'>Selected Board</h2>
          {selectedBoard && (
            <div className="board-details">
              <h2>{selectedBoard.title}</h2>
              <p>Owner: {selectedBoard.name}</p>
            </div>
          )}
        </section>

        <section className='new-board-wrapper'>
          <h2 className='form-title'>Create a new board</h2>
          <NewBoardForm 
            onAddBoard={addBoard}
          />
        </section>
      </div>
      
        {selectedBoard && (
          <section className="cards-section">
            <CardList cards={selectedBoard.cards} />
            <NewCardForm board={selectedBoard} />
          </section>
        )}
    </div>
  )
}

export default App
