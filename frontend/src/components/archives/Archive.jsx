import { useContext } from 'react';
import axios from 'axios';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

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

const Archive = ({ archive }) => {

    const { archiveNotes, setNotes, setArchiveNotes, setTrashNotes } = useContext(DataContext);

    const unArchiveNote = (archive) => {
        const data = {
            ...archive,
            isArchive: false  // Set isArchive to false to indicate unarchiving
        };
    
        axios.put(`http://127.0.0.1:8000/Note/${archive.note_id}/`, data)
            .then(response => {
                // If the request is successful, update the local state
                const updatedNotes = archiveNotes.filter(data => data.note_id !== archive.note_id);
                setArchiveNotes(updatedNotes);
                setNotes(prevNotes => [archive, ...prevNotes]); // Add the unarchived note to the notes list
            })
            .catch(error => {
                console.error('Error unarchiving note:', error);
            });
    };

    const trashNote = () => {
        const data = {
            ...archive,
            isArchive: false,
            isTrash: true
        };
        axios.put(`http://127.0.0.1:8000/Note/${archive.note_id}/`, data)
            .then(response => {
                const updatedNotes = archiveNotes.filter(data => data.note_id !== archive.note_id);
                setArchiveNotes(updatedNotes);
                setTrashNotes(prevArr => [archive, ...prevArr]);
            })
            .catch(error => {
                console.error('Error trashing note:', error);
            });
    };

    return (
        <StyledCard>
                <CardContent>
                    <TitleTypography>{archive.title}</TitleTypography>
                    <Typography>{archive.body}</Typography>
                </CardContent>
                <CardActions>
                    <Unarchive 
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => unArchiveNote(archive)}
                    />
                    <Delete 
                        fontSize="small"
                        onClick={() => trashNote(archive)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Archive;
