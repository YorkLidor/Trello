import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

export function Todo({ todo, onUpdateTodo }) {

    function handleChange(ev) {
        if (!todo) return
        todo.isDone = ev.target.checked
        onUpdateTodo(todo)
    }

    return <>
        <label>
            <input type='checkbox' name='todo-done' className='todo-done' checked={todo.isDone} onChange={handleChange} />
            <span className='checkbox-container'>
                {todo.isDone ? <ImCheckboxChecked className='checkbox checkbox-checked' /> : <ImCheckboxUnchecked className='checkbox checkbox-unchecked' />}
            </span>
        </label>
        <span>{todo.title}</span>
    </>
}
