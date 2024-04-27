import { useContext } from 'react';
import axios from 'axios';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import { permanentDeleteNote } from '../../services/ApiService';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`;

const TitleTypography = styled(Typography)`
    font-weight: bold;
    font-size: 16px; /* Adjust the font size as needed */
`;

const DeleteNote = ({ deleteNote }) => {

    const { trashNotes, setNotes, setTrashNotes } = useContext(DataContext);

    const restoreNote = (deleteNote) => {
        const data = {
            ...deleteNote,
            isTrash: false  // Set isArchive to false to indicate unarchiving
        };
    
        axios.put(`http://127.0.0.1:8000/Note/${deleteNote.note_id}/`, data)
            .then(response => {
                // If the request is successful, update the local state
                const updatedNotes = trashNotes.filter(data => data.note_id !== deleteNote.note_id);
                setTrashNotes(updatedNotes);
                setNotes(prevNotes => [deleteNote, ...prevNotes]); // Add the restored note to the notes list
            })
            .catch(error => {
                console.error('Error unarchiving note:', error);
            });
    }

    const removeNote = (deleteNote) => {
        permanentDeleteNote(deleteNote.note_id)
        .then(res => {
            const updatedNotes = trashNotes.filter(data => data.note_id !== deleteNote.note_id);
            setTrashNotes(updatedNotes);
        })
    }

    return (
        <StyledCard>
                <CardContent>
                    <TitleTypography>{deleteNote.title}</TitleTypography>
                    <Typography>{deleteNote.body}</Typography>
                </CardContent>
                <CardActions>
                    <Delete 
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => removeNote(deleteNote)}
                    />
                    <Restore 
                        fontSize="small"
                        onClick={() => restoreNote(deleteNote)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default DeleteNote;