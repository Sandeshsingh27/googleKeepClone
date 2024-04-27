// Form.jsx
import { useState, useRef, useContext } from 'react';
import { Box, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { v4 as uuid } from 'uuid';
import { DataContext } from '../../context/DataProvider';
import { addNote } from '../../services/ApiService';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`;

const Form = () => {
    const [showTextField, setShowTextField] = useState(false);
    const [noteData, setNoteData] = useState({ title: '', body: '' });
    const { setNotes } = useContext(DataContext);
    const containerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
        containerRef.current.style.minHeight = '30px';

        console.log("noteData:", noteData);

        // Add the new note
        if (noteData.title.trim() || noteData.body.trim()) {
            addNote(noteData)
                .then(newNote => {
                    setNotes(prevNotes => [newNote, ...prevNotes]);
                    setNoteData({ title: '', body: '' });
                })
                .catch(error => {
                    console.error('Error adding note:', error);
                });
        }
    };

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minHeight = '70px';
    };

    const onTextChange = e => {
        const { name, value } = e.target;
        // console.log("name and value:-", name, value)
        setNoteData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {showTextField && (
                    <TextField
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={onTextChange}
                        name="title"
                        value={noteData.title}
                    />
                )}
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={onTextChange}
                    name="body"
                    value={noteData.body}
                />
            </Container>
        </ClickAwayListener>
    );
};

export default Form;
