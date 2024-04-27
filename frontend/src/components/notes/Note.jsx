import { useContext } from 'react';
import axios from "axios";

import { Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete, PushPinOutlined as PushPin } from '@mui/icons-material'; // Changed the Pin icon to PushPin

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
    position: relative; /* Added to position the pin icon */
`;

const PinIcon = styled(PushPin)`
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
`;

const Note = ({ note }) => {
    const { notes, setNotes, setArchiveNotes, setTrashNotes } = useContext(DataContext);

    const archiveNote = (note) => {
        const data = {
            ...note,
            isArchive: true
        };
    
        axios.put(`http://127.0.0.1:8000/Note/${note.note_id}/`, data)
            .then(response => {
                const updatedNotes = notes.filter(data => data.note_id !== note.note_id);
                setNotes(updatedNotes);
                setArchiveNotes(prevArr => [note, ...prevArr]);
            })
            .catch(error => {
                console.error('Error archiving note:', error);
            });
    };
    

    const trashNote = (note) => {
        const data = {
            ...note,
            isTrash: true
        };

        axios.put(`http://127.0.0.1:8000/Note/${note.note_id}/`, data)
            .then(response => {
                const updatedNotes = notes.filter(data => data.note_id !== note.note_id);
                setNotes(updatedNotes);
                setTrashNotes(prevArr => [note, ...prevArr]);
            })
            .catch(error => {
                console.error('Error trashing note:', error);
            });
    };
    

    const togglePin = (note) => {
        const updatedNote = { ...note, isPinned: !note.isPinned };
        const updatedNotes = notes.map(data => {
            if (data.note_id === note.note_id) {
                return updatedNote;
            }
            return data;
        });

        axios.put(`http://127.0.0.1:8000/Note/${note.note_id}/`, updatedNote)
            .then(response => {
                setNotes(updatedNotes);
            })
            .catch(error => {
                console.error('Error updating note:', error);
            });
    };


    return (
        <Grid item xs={12} sm={12} md={6} lg={3}>
            <StyledCard>
                <CardContent>
                    <Typography>{note.title}</Typography>
                    <Typography>{note.body}</Typography>
                </CardContent>
                <CardActions>
                    <PinIcon
                        fontSize="small"
                        onClick={() => togglePin(note)}
                        color={note.isPinned ? "primary" : "action"}
                        title={note.isPinned ? "Unpin" : "Pin"} // Hover text based on pinning state
                    />
                    <div title="Archive" onClick={() => archiveNote(note)}>
                        <Archive fontSize="small" style={{ cursor: 'pointer' }} />
                    </div>
                    <div title="Delete" onClick={() => trashNote(note)}>
                        <Delete fontSize="small" style={{ cursor: 'pointer' }} />
                    </div>
                </CardActions>
            </StyledCard>
        </Grid>
    );
};

export default Note;
