import { useState } from "react";
import PropTypes from "prop-types";
import "./Cards.css";

const kDefaultsFormState = {
  message: "",
};

const NewCardForm = ({ board, onAddCard }) => {
  const [formState, setFormState] = useState(kDefaultsFormState);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const newCard = {
      message: formState.message,
      likes: 0,
    };

    if (!formState.message.trim()) {
      setError("Message is required");
      return;
    }

    onAddCard(board.id, newCard);
    setFormState(kDefaultsFormState);
    setError("");
  };

  return (
    <form className="new-card-form" onSubmit={handlesubmit}>
      <div className="error-message">{error || "\u00A0"}</div>
      <div className="form-group">
        <p className="form-label">What's inspiring you?</p>
        <textarea
          id="card-message"
          type="text"
          name="message"
          value={formState.message}
          onChange={handleInputChange}
          className="form-input"
          placeholder="write your inspiration..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="card-preview" className="form-label">
          Preview:
        </label>
        <p id="card-preview" className="card-message">
          {formState.message}
        </p>
      </div>

      <button type="submit" className="submit-button card-add-button">
        Add to Board
      </button>
    </form>
  );
};

NewCardForm.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onAddCard: PropTypes.func.isRequired,
};

export default NewCardForm;
