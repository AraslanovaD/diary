import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
    pages: { id: number, date: string, note: string, todo: {}[] }[],
    addPage: (newPage: { id: number, date: string, note: string, todo: {}[] }) => void
    deletePage: (id: number) => void
}

const DiaryNav = observer(({ pages, addPage, deletePage }: Props) => {
    const drawerWidth = 240;

    const navigate = useNavigate();

    const [newDate, setNewDate] = useState('');

    const handleAddTodo = () => {
        if (newDate) {
            let length = pages.length
            let id = 1
            if (length !== 0) {
                id = pages[length - 1].id + 1;
            }

            let newPage = { id: id, date: newDate, note: "Новая запись", todo: [] };
            console.log(newPage)
            addPage(newPage);
        }
    }

    const calcDate = (e) => {
        let day = new Date(e.target.value)
        let monthStr = `0${(day.getMonth() + 1) % 60}`.slice(-2)
        let dayStr = `0${day.getDate() % 60}`.slice(-2)

        setNewDate(`${day.getFullYear()}-${monthStr}-${dayStr}`)
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <input type="date" onChange={calcDate} />

                <IconButton onClick={handleAddTodo}>
                    <AddCircleIcon color='primary' />
                </IconButton>
            </Toolbar>

            <Divider />
            <List>
                {pages.map((page) => (
                    <>
                        <ListItem key={page.id} disablePadding>

                            <ListItemButton>
                                <ListItemText primary={page.date} onClick={() => { navigate(`/${page.id}`) }} />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon onClick={() => { deletePage(page.id) }}>
                                    <DeleteIcon color='primary' />
                                </ListItemIcon>
                            </ListItemButton>


                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </Drawer>
    );
})

export default DiaryNav;
