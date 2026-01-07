import { useState } from 'react';
import PropTypes from 'prop-types';
import './Boards.css'

const NewBoardForm = ({ onAddBoard }) =>{
    const [ title, setTitle ] = useState('');
    const [name, setName] = useState('');
    const [showFields, setShowFields] = useState(true);
    const [error, setError] = useState('');

    const handlesubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !name.trim()) {
            setError("Title and owner name are required");
            return;
        }

        const newBoard = {
            title,
            name,
        };

        onAddBoard(newBoard);
        setTitle('');
        setName('');
        setError('');
    };

    const toggleFields = () => setShowFields(prev => !prev);

    return (
        <form onSubmit={handlesubmit} className='new-board-form'>

            <div className={`form-fields ${showFields ? '' : 'hidden'}`}>
                <div className="form-fields-inner">

                    <div className='error-message'>{error || '\u00A0'}</div>

                    <div className='form-group'>
                    <label htmlFor='board-title' className='form-label'>Title:</label>
                    <input 
                        id='board-title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='form-input'
                    />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='board-owner' className='form-label'>Owner Name:</label>
                    <input 
                        id='board-owner'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='form-input'
                    />
                    </div>

                    <button type='submit' className='submit-button'>
                    Create Board
                    </button>

                </div>
            </div>

            <button
                type="button"
                className="collapse-toggle"
                onClick={toggleFields}
                aria-label="Toggle form"
            >
                <i className={`fa-solid ${showFields ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
        </form>
    )
}

NewBoardForm.propTypes = {
    onAddBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;