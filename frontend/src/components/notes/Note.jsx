import { useContext } from 'react';

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
    const { notes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);

    // Filter pinned notes
    const pinnedNotes = notes.filter(note => note.isPinned);
    
    // Filter non-pinned notes
    const otherNotes = notes.filter(note => !note.isPinned);

    const archiveNote = (note) => {
        // console.log(note.note_id)
        const updatedNotes = notes.filter(data => data.note_id !== note.note_id);
        setNotes(updatedNotes);
        setAcrchiveNotes(prevArr => [note, ...prevArr]);
    }

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.note_id !== note.note_id);
        setNotes(updatedNotes);
        setDeleteNotes(prevArr => [note, ...prevArr]);
    }

    const togglePin = (note) => {
        const updatedNotes = notes.map(data => {
            if (data.note_id === note.note_id) {
                return { ...data, isPinned: !data.isPinned };
            }
            return data;
        });
        setNotes(updatedNotes);
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