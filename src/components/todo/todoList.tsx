import React, { useState } from 'react';
import TodoInput from './todoInput.tsx';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TodayIcon from '@mui/icons-material/Today';

import { Box, IconButton, Checkbox, TextField, Typography} from '@mui/material';

type Props = {
    idPage: number
    todolist: { id: number, task: string, isCompleted: boolean }[];
    addTodo: (id: number, newTodo: { id: number, task: string, isCompleted: boolean }) => void,
    completeTodo: (idPage: number, idTodo: number) => void,
    editTodo: (idPage: number, idTodo: number, newTask: string) => void,
    removeTodo: (idPage: number, idTodo: number) => void,
}

const ToDoList = ({ idPage, todolist, addTodo, completeTodo, editTodo, removeTodo }: Props) => {

    const [newTask, setNewTask] = useState('');

    const handleInput = (e) => {
        setNewTask(e.target.value)
    }

    const handleAdd = () => {
        if (newTask) {
            let length = todolist.length
            let id = 1
            if (length !== 0) {
                id = todolist[length - 1].id + 1;
            }
            let newTodo = { id: id, task: newTask, isCompleted: false };

            addTodo(idPage, newTodo);

            setNewTask('');
        }
    }

    return (
        <Box sx={{p:1}}>
            <Box >
                <Typography variant="h6"><TodayIcon  color='primary' />Список задач</Typography>
                <TextField
                    size="small"
                    label="Новое задание"
                    variant="outlined"
                    value={newTask}
                    onInput={handleInput}
                />

                <IconButton onClick={handleAdd}>
                    <AddCircleIcon color='primary' />
                </IconButton>
            </Box>

            {todolist.map((todo) => {
                return (
                    <Box
                        key={todo.id}
                        sx={{ display: 'flex', flexDirection: 'row' }}
                    >
                        <Checkbox
                            sx={{ m: 1 }}
                            checked={todo.isCompleted}
                            onChange={() => completeTodo(idPage, todo.id)}
                        />

                        <TodoInput
                            idPage={idPage}
                            idTodo={todo.id}
                            task={todo.task}
                            editInput={editTodo}
                        />
                        <IconButton sx={{ m: 2 }} onClick={() => removeTodo(idPage, todo.id)} size='small'>
                            <DeleteIcon color='primary' fontSize="inherit" />
                        </IconButton>


                    </Box>
                )
            })}
        </Box>
    );
}

export default ToDoList;
