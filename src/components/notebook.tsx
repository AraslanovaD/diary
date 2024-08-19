import React, { useState } from 'react';

import { Box, IconButton, Typography } from '@mui/material';

import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    idPage: number
    note: string;
    editNote: (id: number, newNote: string) => void,
}


const Notebook = ({ idPage, note, editNote }: Props) => {
    const [editingNote, setEditingNote] = useState(note);
    const [isEditing, setIsEditing] = useState(false);

    const handleInput = (e) => {
        setEditingNote(e.target.value)
    }

    const handleEdit = () => {
        setIsEditing(true)
        setEditingNote(note)
    }

    const handleSave = () => {
        setIsEditing(false)
        editNote(idPage, editingNote)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return (
        <Box>
            <Typography variant='h6'><ArticleIcon color='primary' />Заметки</Typography>

            {!isEditing ?
                <Typography sx={{display:'inline'}}>{note}</Typography>:
                <textarea cols={60} rows={25} readOnly={!isEditing} onInput={handleInput} value={editingNote} />
            }

            {!isEditing ?
                <IconButton sx={{ m: 1 }} onClick={handleEdit}>
                    <EditIcon color='primary' />
                </IconButton>
                :
                <>
                    <IconButton sx={{ m: 1 }} onClick={handleSave}>
                        <CheckCircleIcon color='primary' />
                    </IconButton>

                    <IconButton sx={{ m: 1 }} onClick={handleCancel}>
                        <CancelIcon color='primary' />
                    </IconButton>
                </>
            }
        </Box>
    );
}

export default Notebook;
