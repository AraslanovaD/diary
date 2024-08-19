import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DiaryPages from '../store/diary.tsx'

import Notebook from './notebook.tsx';
import ToDoList from './todo/todoList.tsx';
import DiaryNav from './diaryNav.tsx';
import DeadlineList from './deadline/deadlineList.tsx';

import { Box, Paper, Typography } from '@mui/material';

const Diary = observer(() => {
    const { id } = useParams();
    const [idPage, setIdPage] = useState(-1);

    useEffect(() => {
        setIdPage(DiaryPages.findPageIndex(id));
    }, [id])

    return (
        <Paper>
            <DeadlineList
                deadlines={DiaryPages.deadlines}
                editTask={DiaryPages.editTask}
                editDate={DiaryPages.editDate}
                addDeadline={DiaryPages.addDeadline}
                deleteDeadline={DiaryPages.deleteDeadline}
            />

            <DiaryNav
                pages={DiaryPages.pages}
                addPage={DiaryPages.addPage}
                deletePage={DiaryPages.deletePage}
            />

            <Box sx={{ p: 2 }}>
                {(idPage !== -1 && DiaryPages.pages.length !== 0) &&
                    <>
                        <Typography variant='h5'>{DiaryPages.pages[idPage].date}</Typography>

                        <ToDoList
                            idPage={DiaryPages.pages[idPage].id}
                            todolist={DiaryPages.pages[idPage].todo}
                            addTodo={DiaryPages.addTodo}
                            completeTodo={DiaryPages.completeTodo}
                            editTodo={DiaryPages.editTodo}
                            removeTodo={DiaryPages.removeTodo}
                        />

                        <Notebook
                            idPage={DiaryPages.pages[idPage].id}
                            note={DiaryPages.pages[idPage].note}
                            editNote={DiaryPages.editNote}
                        />
                    </>
                }
            </Box>
        </Paper>
    );
})

export default Diary;
