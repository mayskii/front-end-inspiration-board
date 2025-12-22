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
    <div>
      <h1>Inspiration Board</h1>

      <div className='boards-container'>
        <section className='board-list-wrapper'>
          <BoardList 
          boards={boards}
          selectedBoard={selectedBoard}
          onSelectBoard={setSelectedBoard}
          onDeleteBoard={deleteBoard}
          />
        </section>

        <section className='selected-board-wrapper'>
          {selectedBoard && (
            <section>
              <h2>{selectedBoard.title}</h2>
              <p>Owner: {selectedBoard.name}</p>

              {/* Card block */}
              <CardList cards={selectedBoard.cards} />
              <NewCardForm board={selectedBoard} />
            </section>
          )}
        </section>
      </div>


      <NewBoardForm onAddBoard={addBoard}/>
    </div>
  )
}

export default App
