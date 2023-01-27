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

    const doneTodosCount = list? list.todos.filter(todo => todo.isDone).length : 0

    const donePrecentage = (list?.todos?.length) > 0 ? Math.round((doneTodosCount /list?.todos?.length)*100) : 0
    const checklistDoneBarStyle = (donePrecentage === 100) ? {width: `${donePrecentage}%`, backgroundColor: '#61bd4f' } : {width: `${donePrecentage}%` }


    function onTitleEdit(ev, title) {
        ev.stopPropagation()
        if (!title.length) return
        list.title = title
        onUpdateChecklist(list)
        setChecklist(list)
        clearEditMode()
    }

    function onUpdateChecklist() {
        task.checklists = task.checklists.map(checklist => (checklist.id === list.id) ? list : checklist)
        onSaveChecklist(list)
        setChecklist(list)
    }

    function onAddTodo(ev) {
        ev.stopPropagation()
        if (!elEditTodoRef.current.value.length) return
        const todo = boardService.getTodoEmpty()
        todo.title = elEditTodoRef.current.value

        if (!list.todos) list.todos = []
        list.todos.push(todo)
        elEditTodoRef.current.value = ''
        onUpdateChecklist()
    }

    function onUpdateTodo(todo) {
        clearEditMode()
        list.todos = list.todos.map(listToDo => listToDo.id === todo.id ? todo : listToDo)
        onUpdateChecklist()
    }

    function onRemoveTodo(todo) {
        list = boardService.removeTodo(list, todo)
        onUpdateChecklist()
        setChecklist(list)
        clearEditMode()
    }

    function setTitleToEdit(ev) {
        ev.stopPropagation()
        setToolInEdit(checklist.id)
    }

    function setTodoToEdit(ev, todoId) {
        ev.stopPropagation()
        setToolInEdit(todoId)
    }

    function clearEditMode() {
        setToolInEdit(null)
    }

    function setAddTodoToEdit(ev) {
        ev.stopPropagation()
        setToolInEdit(-1)
    }

    function setHideChecked(ev) {
        ev.stopPropagation()
        setShowChecked(!showChecked)
    }
    
    return list && <section className="checklist-container" key={list.id} onMouseDown={clearEditMode}>
        <div className='checklist-title-box flex row'>
            <TbCheckbox className="checklist-logo" />
            <div className="checklist-title-container flex row" >
                {
                    toolInEdit === checklist.id ? <TextareaEditor defaultText={checklist.title} onTextSubmit={onTitleEdit} className={"checklist-title"} />
                        : <span className='checklist-title-span' onMouseDown={(ev) => setTitleToEdit(ev)}>{checklist.title}</span>
                }
            </div>
            {list?.todos.filter(todo => todo.isDone)?.length > 0 && <button className='remove-checklist' onMouseDown={setHideChecked}>{showChecked ? 'Show' : 'Hide'} checked items</button>}
            {toolInEdit !== list.id && <button className='remove-checklist' onClick={(ev) => onToggleModal(ev, MODAL_CHECKLIST_DELETE, { checklist })}>Delete</button>}
        </div>

        <div className='checklist-bar-container flex row'>
            <span className="done-precentage">{donePrecentage}%</span>
            <div className='checklist-bar'>
                <div className="checklist-bar-done"  style={checklistDoneBarStyle}></div>
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
                                <button className='save-btn add-todo-input-btn' onMouseDown={(ev) => onAddTodo(ev)} >Add</button>
                            </div> : <button className='add-todo-btn' onMouseDown={(ev) => setAddTodoToEdit(ev)}>Add an item</button>
                        }
                    </div>
                </li>
            </ul>
        </div>
    </section>
}