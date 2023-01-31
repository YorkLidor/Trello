
import { TextareaEditor } from '../../textarea-editor'

import { TbDots } from 'react-icons/tb'
import { RiUserAddLine } from 'react-icons/ri'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { MODAL_MEMBERS_TODOS, MODAL_TODO } from '../../modal/modal'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function Todo({ checklist, todoItem, onUpdateTodo, onRemoveTodo, setTodoToEdit, toolInEdit, onToggleModal }) {

    const board = useSelector(store => store.boardModule.board)
    const [todo, setTodo] = useState(todoItem)
    const todoMember = todo.memberId ? board.members?.find(member => member._id === todo.memberId) : null

    const todoTitleClassname = todo.isDone ? 'todo-title done' : 'todo-title'

    function handleChange(ev) {
        try {
            if (!todo) return
            todo.isDone = ev.target.checked
            onUpdateTodo(todo)
        }
        catch (err) {
            console.error('Failed hande changes in checklist item checked state')
        }
    }

    function onTitleEdit(ev, title) {
        try {
            ev.stopPropagation()
            if (!title) {
                onRemoveTodo(todo)
            } else {
                todo.title = title
                onUpdateTodo(todo)
            }
            setTodoToEdit(ev, null)
        }
        catch (error) {
            console.error('Failed change checklist item text')
        }
    }
    return <div className='todo-box' >
        <label>
            <input type='checkbox' className='todo-done-input' checked={todo.isDone} onChange={handleChange} />
            <span className='todo-checkbox-container'>
                {todo.isDone ? <ImCheckboxChecked className='checkbox checkbox-checked' /> : <ImCheckboxUnchecked className='checkbox checkbox-unchecked' />}
            </span>
        </label>
        {
            toolInEdit === todo.id ?
                <TextareaEditor defaultText={todo.title} onTextSubmit={onTitleEdit} onEditorCancel={ev => setTodoToEdit(ev, null)} />
                :
                <div className='todo-row flex row'>
                    <span className={todoTitleClassname} onClick={(ev) => setTodoToEdit(ev, todo.id)}>{todo.title}</span>
                    {
                        todo.memberId ? <img className='todo-member-logo' src={todoMember.imgUrl} onClick={ev => onToggleModal(ev, MODAL_MEMBERS_TODOS, { checklist, todo })} />
                            : <RiUserAddLine className='todo-tools' onClick={ev => onToggleModal(ev, MODAL_MEMBERS_TODOS, { checklist, todo })} />
                    }
                    <TbDots className='todo-tools' onClick={(ev) => onToggleModal(ev, MODAL_TODO, { todo, checklist })} />
                </div>
        }
    </div>
}
