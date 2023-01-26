import { Todo } from './todo-preview'
import { TbCheckbox } from 'react-icons/tb'
import { useRef } from 'react'
import { useState } from 'react'
import { boardService } from '../../../services/board.service'

export function Checklist({ task, checklist, onSaveChecklist }) {
    const [list, setChecllist] = useState(checklist)
    const [editMode, setEditMode] = useState(false)

    const elInputRef = useRef()
    const elEditTodoRef = useRef()

    console.log(list)

    function handleEdit({ target }, state) {
        target.dataset.state = state
        if (!target.value.length) return
        elInputRef.current.classList.toggle('active')
        onSaveTitle()
    }

    function onSaveTitle() {
        console.log(elInputRef.current.value)
        const value = elInputRef.current.value

        elInputRef.current.classList.toggle('active')

        list.title = value
        onUpdateChecklist(list)
        setChecllist(list)
    }

    function onUpdateChecklist() {
        console.log(task, list);
        task.checklists = task.checklists.map(list => (list.id !== list.id) ? list : list)
        onSaveChecklist(list)
        setChecllist(list)
    }

    function onAddTodo() {
        setEditMode(true)
    }
    function onSaveTodo(todoToSave = null) {
        if (!todoToSave) {
            if (!elEditTodoRef.current.value.length) return
            const todo = boardService.getTodoEmpty()
            todo.title = elEditTodoRef.current.value

            if (!list.todos) list.todos = []
            list.todos.unshift(todo)
            onUpdateChecklist()
        }
        setEditMode(false)
    }

    function onUpdateTodo(todo) {
        list.todos = list.todos.map(listToDo => listToDo.id === todo.id ? todo : listToDo)
        setChecllist(list)
        onUpdateChecklist()
    }



    return list && <section className="checklist-box">
        <div className='checklist-title-box flex row'>
            <TbCheckbox className="checklist-logo" />
            <div className="checklist-title-container ">
                <input ref={elInputRef} data-state={false} className="checklist-title" defaultValue={list.title} onFocus={(ev) => handleEdit(ev, true)} onBlur={(ev) => !ev.target.dataset.state ? '' : handleEdit(ev, false)} />
            </div>
        </div>
        <div className="checklist-box flex col">
            <ul className="checklist-list">
                {
                    list.todos?.length > 0 && list.todos.map(todo => <li key={todo.id} >
                        <Todo todo={todo} onUpdateTodo={onUpdateTodo} />
                    </li>)
                }
            </ul>
        </div >

        <div className='add-todo-box'>
            {
                editMode ? <div className='add-todo-input-box'>
                    <input type='text' placeholder='Add an item' ref={elEditTodoRef} />
                    <button className='save-btn add-todo-input-btn' onClick={() => onSaveTodo()} >Add</button>
                </div> : <button className='add-todo-btn' onClick={onAddTodo}>Add an item</button>
            }
        </div>
    </section >
}