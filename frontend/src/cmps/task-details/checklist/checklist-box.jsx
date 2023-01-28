import { useRef } from 'react'
import { useState } from 'react'

import { Todo } from './todo-preview'
import { boardService } from '../../../services/board.service'

import { TextareaEditor } from '../../textarea-editor'

import { TbCheckbox } from 'react-icons/tb'
import { MODAL_CHECKLIST_DELETE } from '../../modal/modal'

export function Checklist({ task, checklist, onSaveChecklist, onToggleModal }) {
    const [list, setChecklist] = useState(checklist)
    const [showChecked, setShowChecked] = useState(true)
    const [toolInEdit, setToolInEdit] = useState(null)
    const elEditTodoRef = useRef()

    const doneTodosCount = list ? list.todos.filter(todo => todo.isDone).length : 0

    const donePrecentage = (list?.todos?.length) > 0 ? Math.round((doneTodosCount / list?.todos?.length) * 100) : 0
    const checklistDoneBarStyle = (donePrecentage === 100) ? { width: `${donePrecentage}%`, backgroundColor: '#61bd4f' } : { width: `${donePrecentage}%` }


    function onTitleEdit(ev, title) {
        try {
            ev.stopPropagation()
            if (!title.length) return
            list.title = title
            onUpdateChecklist(list)
            setChecklist(list)
            clearEditMode()
        }
        catch (err) {
            console.error('Failed edit title')
        }
    }

    function onUpdateChecklist() {
        try {
            task.checklists = task.checklists.map(checklist => (checklist.id === list.id) ? list : checklist)
            onSaveChecklist(list)
            setChecklist(list)
        }
        catch (err) {
            console.error('Failed update checklist')
        }
    }

    function onAddTodo(ev) {
        try {
            ev.stopPropagation()
            if (!elEditTodoRef.current.value.length) return
            const todo = boardService.getTodoEmpty()
            todo.title = elEditTodoRef.current.value

            if (!list.todos) list.todos = []
            list.todos.push(todo)
            elEditTodoRef.current.value = ''
            onUpdateChecklist()
        }
        catch (err) {
            console.error('Failed add checklist item')
        }
    }

    function onUpdateTodo(todo) {
        try {
            clearEditMode()
            list.todos = list.todos.map(listToDo => listToDo.id === todo.id ? todo : listToDo)
            onUpdateChecklist()
        }
        catch (err) {
            console.error('Failed update checklist item')
        }
    }

    function onRemoveTodo(todo) {
        try {
            list = boardService.removeTodo(list, todo)
            onUpdateChecklist()
            setChecklist(list)
            clearEditMode()
        }
        catch (err) {
            console.error('Failed remove checklist item')
        }
    }

    function setTitleToEdit(ev) {
        try {
            ev.stopPropagation()
            setToolInEdit(checklist.id)
        }
        catch (err) {
            console.error('Failed to set title to edit mode')
        }
    }

    function setTodoToEdit(ev, todoId) {
        try {
            ev.stopPropagation()
            setToolInEdit(todoId)
        }
        catch (err) {
            console.error('Failed to set checklist item to edit mode')
        }
    }

    function clearEditMode() {
        try {
            setToolInEdit(null)
        }
        catch (error) {
            console.error('Failed to clear edit mode in checklist')
        }
    }

    function setAddTodoToEdit(ev) {
        try {
            ev.stopPropagation()
            setToolInEdit(-1)
        }
        catch(err) {
            console.error('Failed to set editor mode on add checklist item')
        }
    }

    function setHideChecked(ev) {
        try {
        ev.stopPropagation()
        setShowChecked(!showChecked)
        }
        catch(err) {
            console.error('Failed to toggle hide or show checked items')
        }
    }

    return list && <section className="checklist-container" key={list.id} onMouseDown={clearEditMode}>
        <div className='checklist-title-box flex row'>
            <TbCheckbox className="checklist-logo" />
            <div className="checklist-title-container flex row" >
                {
                    toolInEdit === checklist.id ? <TextareaEditor defaultText={checklist.title} onTextSubmit={onTitleEdit} className={"checklist-title-editor"} />
                        : <span className='checklist-title-span' onMouseDown={(ev) => setTitleToEdit(ev)}>{checklist.title}</span>
                }
            </div>
            {list?.todos.filter(todo => todo.isDone)?.length > 0 && <button className='remove-checklist' onMouseDown={setHideChecked}>{showChecked ? 'Show' : 'Hide'} checked items</button>}
            {toolInEdit !== list.id && <button className='remove-checklist' onClick={(ev) => onToggleModal(ev, MODAL_CHECKLIST_DELETE, { checklist })}>Delete</button>}
        </div>

        <div className='checklist-bar-container flex row'>
            <span className="done-precentage">{donePrecentage}%</span>
            <div className='checklist-bar'>
                <div className="checklist-bar-done" style={checklistDoneBarStyle}></div>
            </div>
        </div>

        <div className="checklist-box flex col">
            <ul className="checklist-list">
                {
                    list.todos?.length > 0 && list.todos.map(todo => (showChecked || !todo.isDone) && <li key={todo.id} className='todo-list-box' >
                        <Todo checklist={list} todoItem={todo} onUpdateTodo={onUpdateTodo} onRemoveTodo={onRemoveTodo} setTodoToEdit={setTodoToEdit} toolInEdit={toolInEdit} onToggleModal={onToggleModal} />
                    </li>)
                }
                <li className='todo-list-box add' >
                    <div className='add-todo-box'>
                        {
                            toolInEdit === -1 ? <div className='add-todo-input-box'>
                                <textarea placeholder='Add an item' ref={elEditTodoRef} className='add-todo-input' onMouseDown={(ev) => ev.stopPropagation()} />
                                <>
                                    <button className='save-btn' onMouseDown={(ev) => onAddTodo(ev)} >Add</button>
                                    <button className='cancel-add-todo-btn' onMouseDown={clearEditMode}>Cancel</button>
                                </>
                            </div> : <button className='add-todo-btn' onMouseDown={(ev) => setAddTodoToEdit(ev)}>Add an item</button>
                        }
                    </div>
                </li>
            </ul>
        </div>
    </section>
}