import { useState } from 'react'
import { TextareaEditor } from '../../textarea-editor'

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

export function Todo({ todo, onUpdateTodo, onRemoveTodo , setTodoToEdit, toolInEdit }) {

    function handleChange(ev) {
        if (!todo) return
        todo.isDone = ev.target.checked
        onUpdateTodo(todo)
    }

    function onTitleEdit(title) {
        if(!title) {
            onRemoveTodo(todo)
        } else {
            todo.title = title
            onUpdateTodo(todo)
        }
        setTodoToEdit(null)
    }

    return <div className='todo-box'>
        <label>
            <input type='checkbox' className='todo-done-input' checked={todo.isDone} onChange={handleChange} />
            <span className='todo-checkbox-container'>
                {todo.isDone ? <ImCheckboxChecked className='checkbox checkbox-checked' /> : <ImCheckboxUnchecked className='checkbox checkbox-unchecked' />}
            </span>
        </label>
        {
            toolInEdit === todo.id ?
                <TextareaEditor defaultText={todo.title} onTextSubmit={onTitleEdit} />
                :
                <span className='todo-title' onClick={() => setTodoToEdit(todo.id)}>{todo.title}</span>
        }
    </div>
}
