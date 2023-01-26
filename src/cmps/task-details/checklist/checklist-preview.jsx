import { boardService } from "../../../services/board.service"

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

export function ChecklistPreview({ checklist, onUpdateChecklist }) {

    const todos = boardService.sortChecklistTodos(checklist)

    function handleChange(ev) {
        const id = ev.target.dataset.id
        const todo = checklist.todos.find(todo => todo.id === id)
        if (!todo) return

        todo.isDone = ev.target.checked
        checklist.todos = checklist.todos.map(listToDo => listToDo.id === todo.id ? todo : listToDo)
        onUpdateChecklist()
    }

    return todos.length > 0 && <div className="checklist-box flex col">
        <ul className="checklist-list">
            {
                todos.map(todo => {
                    const spanClass = ('todo-item-text' + todo.isDone ? ' done' : '')
                    console.log(spanClass, todo)
                    return <li key={todo.id} >
                        <label>
                            <input type='checkbox' name='todo-done' className='todo-done' checked={todo.isDone} onChange={handleChange} data-id={todo.id} />
                            <span className='checkbox-container'>
                                {
                                    todo.isDone ? <ImCheckboxChecked className='checkbox checkbox-checked' /> : <ImCheckboxUnchecked className='checkbox checkbox-unchecked' />

                                }
                            </span>
                        </label>
                        <span className={spanClass}>{todo.title}</span>
                    </li>
                })
            }
        </ul>
    </div >
}