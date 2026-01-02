import BoardList from './components/boards/BoardList';
import NewBoardForm from './components/boards/NewBoardForm';
import CardList from './components/cards/CardList';
import NewCardForm from './components/cards/NewCardForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Board   -  { id, title, name, cards }
// Card   -  { id, message, likes, board }

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

const addCardByAPI = (boardId, newCard) => {
  return axios.post(`${kbaseURL}/boards/${boardId}/cards`, newCard)
    .catch(error => console.log(error));
};

const deleteCardAPI = (boardId, cardId) => {
  return axios.delete(`${kbaseURL}/boards/${boardId}/cards/${cardId}`)
    .catch(error => console.log(error));
}

const likeCardAPI = (boardId, cardId) => {
  return axios.patch(`${kbaseURL}/boards/${boardId}/cards/${cardId}/like`)
    .catch(error => console.log(error));
}


function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    getAllBoardsAPI().then(data => setBoards(data));
  }, []);

  const handleSelectBoard = (board) => {
    getBoardByIdAPI(board.id).then(data => {
      const boardData = data?.board ?? data;
      if (boardData) setSelectedBoard(boardData);
    });
  }

  const addBoard = (newBoard) => {
    addBoardByAPI(newBoard).then(response => {
      const createdBoard = response?.data?.board ?? response?.data;
        if (createdBoard) {
          const boardWithCards = { ...createdBoard, cards: createdBoard.cards ?? [] };
          setBoards(prev => [...prev, boardWithCards]);
          setSelectedBoard(boardWithCards);
        }
    });
  }

  const deleteBoard = (boardId) => {
    deleteBoardAPI(boardId).then(() => {
      setBoards(prev => prev.filter(board => board.id !== boardId));
      if(selectedBoard?.id === boardId) setSelectedBoard(null);
    });
  }

  const addCard = (boardId, newCard) => {
    addCardByAPI(boardId, newCard).then(response => {
      if(response && response.data) {
        handleSelectBoard({ id: boardId });
      }});
    }

  const deleteCard = (cardId) => {
    deleteCardAPI(selectedBoard.id, cardId).then(() => {
      if(selectedBoard) {
        handleSelectBoard({ id: selectedBoard.id });
      }
    });
  }

  const likeCard = (cardId) => {
    likeCardAPI(selectedBoard.id, cardId).then(() => {
      if(selectedBoard) {
        handleSelectBoard({ id: selectedBoard.id });
      }
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
            <section className='cards-list-wrapper'>
              <CardList 
                cards={selectedBoard.cards}
                boardTitle={selectedBoard.title}
                onDeleteCard={deleteCard}
                onLikeCard={likeCard}
              />
            </section>

            <section className='new-card-wrapper'>
              <h2>Create a new card</h2>
              <NewCardForm 
                board={selectedBoard}
                onAddCard={addCard} 
              />
            </section>
            
          </section>
        )}
    </div>
  )
}

export default App
