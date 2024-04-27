import { useContext } from 'react';
import axios from "axios"

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete, PinOutlined as Pin } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

// const [note]

const Note = ({ note }) => {
    // console.log("note:-", note)
    const { notes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(DataContext);

    // // Filter pinned notes
    // const pinnedNotes = notes.filter(note => note.isPinned);
    
    // // Filter non-pinned notes
    // const otherNotes = notes.filter(note => !note.isPinned);

    const archiveNote = (note) => {
        // console.log(note.note_id)
        const updatedNotes = notes.filter(data => data.note_id !== note.note_id);
        setNotes(updatedNotes);
        setArchiveNotes(prevArr => [note, ...prevArr]);
    }

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.note_id !== note.note_id);
        setNotes(updatedNotes);
        setDeleteNotes(prevArr => [note, ...prevArr]);
    }

    const togglePin = (note) => {
        // Toggle the isPinned field
        const updatedNote = { ...note, isPinned: !note.isPinned };
        const updatedNotes = notes.map(data => {
            if (data.note_id === note.note_id) {
                return updatedNote;
            }
            return data;
        });

        // Update the note in the database
        axios.put(`http://127.0.0.1:8000/Note/${note.note_id}/`, updatedNote)
            .then(response => {
                // Update the state with the updated note
                setNotes(updatedNotes);
            })
            .catch(error => {
                console.error('Error updating note:', error);
            });
    }


    return (
        <StyledCard>
                <CardContent>
                    <Typography>{note.title}</Typography>
                    <Typography>{note.body}</Typography>
                </CardContent>
                <CardActions>
                    <Archive 
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => archiveNote(note)}
                    />
                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(note)}
                    />
                    <Pin
                        fontSize="small"
                        onClick={() => togglePin(note)}
                        color={note.isPinned ? "primary" : "action"}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Note;