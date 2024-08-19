import React, { useState } from 'react';

import { Box, IconButton, TextField, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    idPage: number,
    idTodo: number,
    task: string,
    editInput: (idPage: number, idTodo: number, newTask: string) => void,
}

const TodoInput = ({ idPage, idTodo, task, editInput }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState('');

    const handleChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleSave = () => {
        editInput(idPage, idTodo, newTask)
        setNewTask('')
        handleCancel()
    }

    const handleEdit = () => {
        setNewTask(task)
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {!isEditing ?
                <Typography sx={{ m: 2 }}>{task}</Typography> :
                <TextField sx={{ m: 1 }} variant="standard" value={newTask} onInput={handleChange} />
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

export default TodoInput;
