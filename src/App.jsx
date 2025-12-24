import BoardList from './components/boards/BoardList';
import NewBoardForm from './components/boards/NewBoardForm';
import CardList from './components/cards/CardList';
import NewCardForm from './components/cards/NewCardForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

// Board   -  { id, title, name, cards }
// Card   -  { id, message, likes, board }

// const BOARDS = [
//   { id: 1, title: 'Travel', name: 'Maya', cards: [] },
//   { id: 2, title: 'Ideas', name: 'Mumina', cards: [] },
//   { id: 3, title: 'Cooking', name: 'Wenxin', cards: [] },
//   { id: 4, title: 'Sport', name: 'Hsiang-ting', cards: [] },
// ];

const kbaseURL = 'http://localhost:5000';

const getAllBoardsAPI = () => {
  return axios.get(`${kbaseURL}/boards`)
    .then(response => response.data.boards)
    .catch(error => console.log(error));
};

const getBoardByIdAPI = (id) => {
  return axios.get(`${kbaseURL}/boards/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const addBoardByAPI = (newBoard) => {
  return axios.post(`${kbaseURL}/boards`, newBoard)
    .catch(error => console.log(error));
};

const deleteBoardAPI = id => {
  return axios.delete(`${kbaseURL}/boards/${id}`)
    .catch(error => console.log(error));
};


function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    getAllBoardsAPI().then(data => setBoards(data));
  }, []);

  const handleSelectBoard = (board) => {
    getBoardByIdAPI(board.id).then(data => setSelectedBoard(data));
  }

  const addBoard = (newBoard) => {
    addBoardByAPI(newBoard).then(response => {
      if(response && response.data) {
        setBoards(prev => [...prev, newBoard]);
      }
    })   
  }

  const deleteBoard = (boardId) => {
    deleteBoardAPI(boardId).then(() => {
      setBoards(prev => prev.filter(board => board.id !== boardId));
      if(selectedBoard?.id === boardId) setSelectedBoard(null);
    });
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
          onSelectBoard={handleSelectBoard}
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
