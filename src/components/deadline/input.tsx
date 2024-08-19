import React, { useState } from 'react';

import { Box, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    id: number,
    task: string,
    editTask: (id: number, newTask: string) => void,
}

const Input = ({ id, task, editTask }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState('');

    const handleChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleSave = () => {
        editTask(id, newTask)
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
        <Box sx={{ display: 'flex', flexDirection: 'column' , m:1}}>

            <Box sx={{ display: 'flex', flexDirection: 'row',p:0,m:0 }}>
                {!isEditing ?
                    <IconButton onClick={handleEdit} size='small'>
                        <EditIcon color='primary' fontSize="inherit" />
                    </IconButton>
                    :
                    <>
                        <IconButton onClick={handleSave} size='small'>
                            <CheckCircleIcon color='primary' fontSize="inherit" />
                        </IconButton>

                        <IconButton onClick={handleCancel} size='small'>
                            <CancelIcon color='primary' fontSize="inherit" />
                        </IconButton>
                    </>
                }
            </Box>
            {!isEditing ?
                <Typography >{task}</Typography> :
                <TextField  variant="standard" value={newTask} onInput={handleChange} />
            }

        </Box>
    );
}

export default Input;
