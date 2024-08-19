import { makeAutoObservable } from 'mobx'

class DiaryPages {

    deadlines = [
        {
            id: 1,
            task: 'Мероприятие 1',
            endDate: '2024-10-31'
        },
        {
            id: 2,
            task: 'Мероприятие 1',
            endDate: '2024-08-28'
        }
    ]

    pages = [
        {
            id: 1,
            date: '2024-08-13',
            note: 'Запись 2024-08-13',
            todo: [
                { id: 1, task: 'Задание 1', isCompleted: false },
                { id: 2, task: 'Задание 2', isCompleted: false },
                { id: 3, task: 'Задание 3', isCompleted: false },
            ],
        },
        {
            id: 2,
            date: '2024-08-14',
            note: 'Запись 2024-08-14',
            todo: [
                { id: 1, task: 'Задание 5', isCompleted: false },
                { id: 2, task: 'Задание 6', isCompleted: false },
                { id: 3, task: 'Задание 7', isCompleted: false },
            ],
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }
    //pages
    addPage = (page) => {
        this.pages.push(page)
    }

    deletePage = (idPage) => {
        this.pages = this.pages.filter(page => page.id !== idPage)
    }

    findPageIndex = (idPage) => {
        return this.pages.findIndex(page => page.id === +idPage)
    }

    //pages -> note
    editNote = (idPage, newNote) => {
        this.pages = this.pages.map(page => (page.id === idPage) ? { ...page, note: newNote } : page)
    }

    //rages -> todo
    addTodo = (idPage, newTodo) => {
        this.pages = this.pages.map((page) => {
            if (page.id === idPage) {
                page.todo.push(newTodo)
            }
            return page
        })
    }

    completeTodo = (idPage, idToDo) => {
        this.pages = this.pages.map((page) => {
            if (page.id === idPage) {
                let newTodo = page.todo.map(todo => (todo.id === idToDo) ? { ...todo, isCompleted: !todo.isCompleted } : todo)
                page = { ...page, todo: newTodo }
            }
            return page
        })
    }

    editTodo = (idPage, idToDo, newTask) => {
        this.pages = this.pages.map((page) => {
            if (page.id === idPage) {
                let newTodo = page.todo.map(todo => (todo.id === idToDo) ? { ...todo, task: newTask } : todo)
                page = { ...page, todo: newTodo }
            }
            return page
        })
    }

    removeTodo = (idPage, idToDo) => {
        this.pages = this.pages.map((page) => {
            if (page.id === idPage) {
                let newTodo = page.todo.filter(todo => todo.id !== idToDo)
                page = { ...page, todo: newTodo }
            }
            return page
        })
    }

    //deadline
    addDeadline = (newDeadline) => {
        this.deadlines.push(newDeadline)
    }

    editTask = (idDeadline, newTask) => {
        this.deadlines = this.deadlines.map(deadline => (deadline.id === idDeadline) ? { ...deadline, task: newTask } : deadline)
    }

    editDate = (idDeadline, newDate) => {
        this.deadlines = this.deadlines.map(deadline => (deadline.id === idDeadline) ? { ...deadline, endDate: newDate } : deadline)
    }

    deleteDeadline = (idDeadline) => {
        this.deadlines = this.deadlines.filter(deadline => deadline.id !== idDeadline)
    }
}

export default new DiaryPages()