import BoardList from "./components/boards/BoardList";
import NewBoardForm from "./components/boards/NewBoardForm";
import CardList from "./components/cards/CardList";
import NewCardForm from "./components/cards/NewCardForm";
import Dialog from "./components/dialog/Dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Board   -  { id, title, name, cards }
// Card   -  { id, message, likes, board }

const kbaseURL = "https://back-end-inspiration-board-ijaa.onrender.com";

const getAllBoardsAPI = () => {
  return axios
    .get(`${kbaseURL}/boards`)
    .then((response) => response.data.boards)
    .catch((error) => console.log(error));
};

const getBoardByIdAPI = (id) => {
  return axios
    .get(`${kbaseURL}/boards/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const addBoardByAPI = (newBoard) => {
  return axios
    .post(`${kbaseURL}/boards`, newBoard)
    .catch((error) => console.log(error));
};

const deleteBoardAPI = (id) => {
  return axios
    .delete(`${kbaseURL}/boards/${id}`)
    .catch((error) => console.log(error));
};

const addCardByAPI = (boardId, newCard) => {
  return axios
    .post(`${kbaseURL}/boards/${boardId}/cards`, newCard)
    .catch((error) => console.log(error));
};

const deleteCardAPI = (boardId, cardId) => {
  return axios
    .delete(`${kbaseURL}/boards/${boardId}/cards/${cardId}`)
    .catch((error) => console.log(error));
};

const likeCardAPI = (boardId, cardId) => {
  return axios
    .patch(`${kbaseURL}/boards/${boardId}/cards/${cardId}/like`)
    .catch((error) => console.log(error));
};

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);

  useEffect(() => {
    getAllBoardsAPI().then((data) => setBoards(data));
  }, []);

  const filteredBoards = boards.filter(
    (board) =>
      board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectBoard = (board) => {
    setShowCardForm(false);
    getBoardByIdAPI(board.id).then((data) => {
      const boardData = data?.board ?? data;
      if (boardData) setSelectedBoard(boardData);
    });
  };

  const addBoard = (newBoard) => {
    addBoardByAPI(newBoard).then((response) => {
      const createdBoard = response?.data?.board ?? response?.data;
      if (createdBoard) {
        const boardWithCards = {
          ...createdBoard,
          cards: createdBoard.cards ?? [],
        };
        setBoards((prev) => [...prev, boardWithCards]);
        setSelectedBoard(boardWithCards);
      }
    });
  };

  const deleteBoard = (boardId) => {
    deleteBoardAPI(boardId).then(() => {
      setBoards((prev) => prev.filter((board) => board.id !== boardId));
      if (selectedBoard?.id === boardId) setSelectedBoard(null);
    });
  };

  const addCard = (boardId, newCard) => {
    addCardByAPI(boardId, newCard).then((response) => {
      if (response && response.data) {
        handleSelectBoard({ id: boardId });
      }
    });
  };

  const deleteCard = (cardId) => {
    deleteCardAPI(selectedBoard.id, cardId).then(() => {
      if (selectedBoard) {
        handleSelectBoard({ id: selectedBoard.id });
      }
    });
  };

  const likeCard = (cardId) => {
    likeCardAPI(selectedBoard.id, cardId).then(() => {
      if (selectedBoard) {
        handleSelectBoard({ id: selectedBoard.id });
      }
    });
  };

  return (
    <div className="app-container">
      <h1 className="title">
        <span className="sparkle-emoji">✨</span>
        Inspiration Board
      </h1>
      <div className="columns-wrapper">
        <div className="top-section">
          <section className="search-board-section">
            <i
              className="fa-solid fa-magnifying-glass search-icon"
              aria-hidden="true"
            ></i>
            <input
              className="board-search-input"
              type="text"
              placeholder="Search boards by title or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </section>

          <section className="board-list-wrapper">
            <h2 className="boards-title">Boards</h2>
            <BoardList
              boards={filteredBoards}
              selectedBoard={selectedBoard}
              onSelectBoard={handleSelectBoard}
              onDeleteBoard={deleteBoard}
            />
          </section>

          <section className="selected-board-wrapper">
            <h2 className="selected-boards-title">Selected Board</h2>
            {selectedBoard && (
              <div className="board-details">
                <h2>{selectedBoard.title}</h2>
                <p>Owner: {selectedBoard.name}</p>
              </div>
            )}
          </section>

          <section className="new-board-wrapper">
            <h2 className="form-title">
              <span className="plus-sign">+</span>New board
            </h2>
            <NewBoardForm onAddBoard={addBoard} />
          </section>
        </div>
        <section className="cards-list-wrapper">
          {selectedBoard ? (
            <section className="cards-section">
              {selectedBoard.cards && selectedBoard.cards.length > 0 ? (
                <section className="">
                  <CardList
                    cards={selectedBoard.cards}
                    boardTitle={selectedBoard.title}
                    boardOwner={selectedBoard.name}
                    onDeleteCard={deleteCard}
                    onLikeCard={likeCard}
                    onShowCardForm={() => setShowCardForm(true)}
                  />
                </section>
              ) : (
                <>
                  <div className="cards-header-section">
                    <div className="left-side">
                      <h3 className="card-board-title">
                        {selectedBoard.title}
                      </h3>
                      <p className="owner-name">
                        By{" "}
                        {selectedBoard.name.charAt(0).toUpperCase() +
                          selectedBoard.name.slice(1)}
                      </p>
                      <div className="card-stats">0 cards • 0 likes</div>
                    </div>
                    <button
                      className="right-side submit-button create-card-button"
                      onClick={() => setShowCardForm(true)}
                    >
                      <span>+</span>Create New Card
                    </button>
                  </div>
                  <div className="divide-line"></div>
                  <div className="no-cards">
                    <p className="no-cards-message">No cards yet</p>
                    <p className="no-cards-submessage">
                      Start adding inspiration to your board
                    </p>
                    <button
                      className="add-button"
                      onClick={() => setShowCardForm(true)}
                    >
                      Add your first card
                    </button>
                  </div>
                </>
              )}
            </section>
          ) : (
            <div className="no-board-selected">
              <div className="sparkle-emoji">✨</div>
              <p className="no-board-message">Select a board</p>
              <p className="no-board-submessage">
                Choose a board from the sidebar or create a new one
              </p>
            </div>
          )}
        </section>

        <Dialog
          isOpen={showCardForm}
          onClose={() => setShowCardForm(false)}
          title="Create New Card"
        >
          {selectedBoard && (
            <NewCardForm
              board={selectedBoard}
              onAddCard={(boardId, newCard) => {
                addCard(boardId, newCard);
                setShowCardForm(false);
              }}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
}

export default App;
