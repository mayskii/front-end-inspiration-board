import BoardList from './components/boards/BoardList';
import NewBoardForm from './components/boards/NewBoardForm';
import CardList from './components/cards/CardList';
import NewCardForm from './components/cards/NewCardForm';
import './App.css'

function App() {
  return (
    <div>
      <h1>Inspiration Board</h1>

      <NewBoardForm />
      <BoardList />

      <CardList />
      <NewCardForm />
    </div>
  )
}

export default App
