import { useContext } from 'react';

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
`

const DeleteNote = ({ deleteNote }) => {

    const { deleteNotes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);

    const restoreNote = (deleteNote) => {
        const updatedNotes = deleteNotes.filter(data => data.note_id !== deleteNote.note_id);
        setDeleteNotes(updatedNotes);
        setNotes(prevArr => [deleteNote, ...prevArr]);
    }

    const removeNote = (deleteNote) => {
        permanentDeleteNote(deleteNote.note_id)
        .then(res => {
            const updatedNotes = deleteNotes.filter(data => data.note_id !== deleteNote.note_id);
            setDeleteNotes(updatedNotes);
        })
    }

    return (
        <StyledCard>
                <CardContent>
                    <Typography>{deleteNote.title}</Typography>
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