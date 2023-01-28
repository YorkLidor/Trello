import { closeModal } from '../../store/actions/app.actions'
import { addNewTask, saveTask } from '../../store/actions/board.actions'

import { getActivityText, REMOVE_TODO_A, REMOVE_TODO_B } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { ModalHeader } from './modal-header'
import { useSelector } from 'react-redux'

export function TodoModal({ id, cmpProps }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { user, boardId, groupId, task, todo, checklist } = cmpProps

    async function onRemoveTodo() {
        const newList = boardService.removeTodo(checklist, todo)
        task.checklists = task.checklists.map(list => (list.id === newList.id) ? newList : list)
        closeModal(modals, id)

        const action = `${getActivityText(REMOVE_TODO_A)} ${todo.title} ${getActivityText(REMOVE_TODO_B)} ${checklist.title}`
        await saveTask(groupId, task, boardService.getActivity(user, task, action))
    }

    async function onConvertToCard() {
        const newTask = boardService.getEmptyTask()
        newTask.title = todo.title
        console.log(newTask, boardId, groupId)

        closeModal(modals, id)
        await addNewTask(groupId, newTask)
        await onRemoveTodo()
    }


    return <div className='todo-modal-box'>
        <div className='todo-modal-header'>
            <ModalHeader id={id} header={'Item Actions'} allowBack={false} />
        </div>
        <ul className="todo-modal-items">
            <li className='modal-item' onClick={onConvertToCard}>
                <span>Covnert to card</span>
            </li>
            <li className='modal-item' onClick={onRemoveTodo}>
                <span >Delete</span>
            </li>
        </ul>
    </div>
}