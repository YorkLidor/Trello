import { useRef } from 'react'
import { useState } from 'react'

import { Todo } from './todo-preview'
import { boardService } from '../../../services/board.service'

import { TextareaEditor } from '../../textarea-editor'

import { TbCheckbox } from 'react-icons/tb'
import { MODAL_CHECKLIST_DELETE } from '../../modal/modal'

export function Checklist({ task, checklist, onSaveChecklist, onToggleModal }) {
    const [list, setChecklist] = useState(checklist)
    const [toolInEdit, setToolInEdit] = useState(null)
    const elEditTodoRef = useRef()


    function onTitleEdit(title) {
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
        list.todos.unshift(todo)
        elEditTodoRef.current.value = ''
        onUpdateChecklist()
    }

    function onUpdateTodo(todo) {
        list.todos = list.todos.map(listToDo => listToDo.id === todo.id ? todo : listToDo)
        onUpdateChecklist()
        clearEditMode()
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

    return list && <section className="checklist-container" key={list.id} onClick={clearEditMode}>
        <div className='checklist-title-box flex row'>
            <TbCheckbox className="checklist-logo" />
            <div className="checklist-title-container flex row" >
                {
                    toolInEdit === checklist.id ? <TextareaEditor defaultText={checklist.title} onTextSubmit={onTitleEdit} className={"checklist-title"} />
                        : <span className='checklist-title-span' onClick={(ev) => setTitleToEdit(ev)}>{checklist.title}</span>
                }
            </div>
            {toolInEdit !== checklist.id && <button className='remove-checklist' onClick={(ev) => onToggleModal(ev, MODAL_CHECKLIST_DELETE, { checklist })}>Delete</button>}
        </div>

        <div className="checklist-box flex col">
            <ul className="checklist-list">
                {
                    list.todos?.length > 0 && list.todos.map(todo => <li key={todo.id} className='todo-list-box' >
                        <Todo checklist={list} todo={todo} onUpdateTodo={onUpdateTodo} onRemoveTodo={onRemoveTodo} setTodoToEdit={setTodoToEdit} toolInEdit={toolInEdit} onToggleModal={onToggleModal} />
                    </li>)
                }
                <li className='todo-list-box add' >
                    <div className='add-todo-box'>
                        {
                            toolInEdit === -1 ? <div className='add-todo-input-box'>
                                <textarea placeholder='Add an item' ref={elEditTodoRef} className='add-todo-input' onClick={(ev) => ev.stopPropagation()} />
                                <button className='save-btn add-todo-input-btn' onClick={(ev) => onAddTodo(ev)} >Add</button>
                            </div> : <button className='add-todo-btn' onClick={(ev) => setAddTodoToEdit(ev)}>Add an item</button>
                        }
                    </div>
                </li>
            </ul>
        </div>
    </section>
}