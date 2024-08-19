import React from 'react';
import Input from './input.tsx';
import Timer from './timer.tsx';

import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    id: number,
    task: string,
    endDate: string,
    editTask: (id: number, newTask: string) => void,
    editDate: (id: number, newTime: string) => void,
    deleteDeadline: (id: number) => void,
}

const Deadline = ({ id, task, endDate, editTask, editDate, deleteDeadline }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <Input
                id={id}
                task={task}
                editTask={editTask}

            />

            <Timer
                id={id}
                endDate={endDate}
                editDate={editDate}
            />

            <IconButton sx={{ m: 2 }} onClick={() => { deleteDeadline(id) }}>
                <DeleteIcon color='primary'/>
            </IconButton>

        </Box>
    );
}

export default Deadline;
