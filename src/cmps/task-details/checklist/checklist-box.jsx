import { useRef } from 'react'
import { useState } from 'react'

import { Todo } from './todo-preview'
import { boardService } from '../../../services/board.service'

import { TextareaEditor } from '../../textarea-editor'

import { TbCheckbox } from 'react-icons/tb'
import { MODAL_CHECKLIST_DELETE } from '../../modal/modal'

export function Checklist({ task, checklist, onSaveChecklist, onToggleModal }) {
    const [list, setChecklist] = useState(checklist)
    const [addTodoMode, setAddTodoMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const elEditTodoRef = useRef()

    console.log(list)

    function onTitleEdit(title) {
        if (!title.length) return
        list.title = title
        onUpdateChecklist(list)
        setChecklist(list)
        setEditMode(false)
    }

    function onUpdateChecklist() {
        console.log(task, list);
        task.checklists = task.checklists.map(list => (list.id !== list.id) ? list : list)
        onSaveChecklist(list)
        setChecklist(list)
    }

    function onAddTodo() {
        if (!elEditTodoRef.current.value.length) return
        const todo = boardService.getTodoEmpty()
        todo.title = elEditTodoRef.current.value

        if (!list.todos) list.todos = []
        list.todos.unshift(todo)
        onUpdateChecklist()
        setAddTodoMode(false)
    }

    function onUpdateTodo(todo) {
        list.todos = list.todos.map(listToDo => listToDo.id === todo.id ? todo : listToDo)
        onUpdateChecklist()
    }

    function onRemoveTodo(todo) {
        list = boardService.removeTodo(list, todo)
        onUpdateChecklist()
        setChecklist(list)

    }

    return list && <section className="checklist-container" key={list.id}>
        <div className='checklist-title-box flex row'>
            <TbCheckbox className="checklist-logo" />
            <div className="checklist-title-container flex row">
                {
                    editMode ?
                        <TextareaEditor defaultText={checklist.title} onTextSubmit={onTitleEdit} className={"checklist-title"} />
                        :
                        <span className='checklist-title-span' onClick={() => setEditMode(true)}>{checklist.title}</span>
                }
            </div>
            {!editMode && <button className='remove-checklist' onClick={(ev) => onToggleModal(ev, MODAL_CHECKLIST_DELETE, { checklist })}>Delete</button>}
        </div>

        <div className="checklist-box flex col">
            <ul className="checklist-list">
                {
                    list.todos?.length > 0 && list.todos.map(todo => <li key={todo.id} className='todo-list-box' >
                        <Todo todo={todo} onUpdateTodo={onUpdateTodo} onRemoveTodo={onRemoveTodo} />
                    </li>)
                }
                <li className='todo-list-box'>
                    <div className='add-todo-box'>
                        {
                            addTodoMode ? <div className='add-todo-input-box'>
                                <input type='text' placeholder='Add an item' ref={elEditTodoRef} />
                                <button className='save-btn add-todo-input-btn' onClick={() => onAddTodo()} >Add</button>
                            </div> : <button className='add-todo-btn' onClick={() => setAddTodoMode(true)}>Add an item</button>
                        }
                    </div>
                </li>
            </ul>
        </div>
    </section>
}