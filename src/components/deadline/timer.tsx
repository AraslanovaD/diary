import React, { useEffect, useState, useRef } from 'react';

import { Box, IconButton, TextField, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    id: number,
    endDate: string,
    editDate: (id: number, newDate: string) => void,
}

const Timer = ({ id, endDate, editDate }: Props) => {
    const [time, setTime] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [newDate, setNewDate] = useState('');

    const timeRef = useRef<number | null>(null)

    const handleChange = (e) => {
        setNewDate(e.target.value)
    }

    async function handleStart(date) {
        let day = new Date(date)
        let today = new Date();

        await setTime(Math.round((day.getTime() - today.getTime()) / 1000))

        timeRef.current = setInterval(() => {
            setTime((time) => time - 1)
        }, 1000);
    }

    const formatTime = () => {
        const secondsStr = `0${time % 60}`.slice(-2)

        const minutes = Math.floor(time / 60)
        const minutesStr = `0${minutes % 60}`.slice(-2)

        const hours = Math.floor(time / (60 * 60))
        const hoursStr = `0${hours % 24}`.slice(-2)

        const days = Math.floor(time / (24 * 60 * 60))
        const daysStr = `0${days}`.slice(-2)

        return `${daysStr} : ${hoursStr} : ${minutesStr} : ${secondsStr}`
    }

    const handleSave = () => {
        clearInterval(timeRef.current);
        editDate(id, newDate)
        setIsEditing(false)
        handleStart(newDate)
        setNewDate('')
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    useEffect(() => {
        handleStart(endDate)
    }, [])

    useEffect(() => {
        if (time <= 0) {
            clearInterval(timeRef.current);
        }
    }, [time])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', m:1}}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
                <Typography>{formatTime()}</Typography> :
                <input type="datetime-local" onChange={handleChange} />
            }
        </Box>
    );
}

export default Timer;
