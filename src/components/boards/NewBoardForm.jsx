import { useState } from 'react';

const NewBoardForm = ({ onAddBoard }) =>{
    const [ title, setTitle ] = useState('');
    const [name, setName] = useState('');
    const [showFields, setShowFields] = useState(true);

    const handlesubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !name.trim()) return;

        const newBoard = {
            id: Date.now(),
            title,
            name,
            cards: [],
        };

        onAddBoard(newBoard);
        setTitle('');
        setName('');
    };

    const toggleFields = () => setShowFields(prev => !prev);

    return (
        <form onSubmit={handlesubmit}>
            <h2>Create a new board</h2>
            <div className={`form-fields ${showFields ? '' : 'hidden'}`}>
                <div>
                    <label htmlFor='board-title'>Title:</label>
                    <input 
                        id='board-title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='board-owner'>Owner Name:</label>
                    <input 
                        id='board-owner'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <button type='submit'>Submit</button>

            </div>
            <button type='button' onClick={toggleFields}> {showFields ? 'Hide Form' : 'Show Form'} </button>
        </form>
    )
}

export default NewBoardForm;