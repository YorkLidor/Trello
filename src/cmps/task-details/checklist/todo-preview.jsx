import { useState } from 'react'
import { TextareaEditor } from '../../textarea-editor'

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

export function Todo({ todo, onUpdateTodo, onRemoveTodo }) {

    const [editState, setEditState] = useState(false)

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
        setEditState(false)
    }

    return <div className='todo-box'>
        <label>
            <input type='checkbox' className='todo-done-input' checked={todo.isDone} onChange={handleChange} />
            <span className='todo-checkbox-container'>
                {todo.isDone ? <ImCheckboxChecked className='checkbox checkbox-checked' /> : <ImCheckboxUnchecked className='checkbox checkbox-unchecked' />}
            </span>
        </label>
        {
            editState ?
                <TextareaEditor defaultText={todo.title} onTextSubmit={onTitleEdit} />
                :
                <span className='todo-title' onClick={() => setEditState(!editState)}>{todo.title}</span>
        }
    </div>
}
