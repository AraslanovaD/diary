import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Deadline from './deadline.tsx';

import { Paper, Typography, IconButton, TextField } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
    deadlines: { id: number, task: string, endDate: string }[]
    editTask: (id: number, newTask: string) => void,
    editDate: (id: number, newTime: string) => void,
    addDeadline: (newDeadline: { id: number, task: string, endDate: string }) => void,
    deleteDeadline: (id: number) => void,
}

const DeadlineList = ({ deadlines, editTask, editDate, addDeadline, deleteDeadline }: Props) => {
    const [newEndDate, setNewEndDate] = useState('');
    const [newTask, setNewTask] = useState('')

    const handleAddDeadline = () => {
        if (newEndDate && newTask) {
            let length = deadlines.length
            let id = 1
            if (length !== 0) {
                id = deadlines[length - 1].id + 1;
            }

            let newDeadline = { id: id, task: newTask, endDate: newEndDate };

            addDeadline(newDeadline);
        }
    }

    const handleDateChange = (e) => {
        setNewEndDate(e.target.value)
    }

    const handleTaskChange = (e) => {
        setNewTask(e.target.value)
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6"><DateRangeIcon color='primary' />Мероприятия</Typography>

            <input type="datetime-local" onChange={handleDateChange} />


            <TextField sx={{ m: 1 }} size="small" variant="standard" onChange={handleTaskChange} label="Мероприятия"/>

            <IconButton onClick={handleAddDeadline}>
                <AddCircleIcon color='primary' />
            </IconButton>

            {deadlines.map((deadline) => {
                return (
                    <Deadline
                        key={deadline.id}
                        id={deadline.id}
                        task={deadline.task}
                        endDate={deadline.endDate}
                        editTask={editTask}
                        editDate={editDate}
                        deleteDeadline={deleteDeadline}
                    />
                )
            })}
        </Paper>
    );
}

export default DeadlineList;
