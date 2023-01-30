import { useSelector } from 'react-redux'

import { ModalHeader } from './modal-header'
import { closeModal } from '../../store/actions/app.actions'

import { saveBoard } from '../../store/actions/board.actions'
import { useNavigate } from 'react-router-dom'

export function DeleteTaskModal({ user, groupId, task, id }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const navigate = useNavigate()
    // Delete label from board labels
    async function onDeleteTask() {
        try {
            closeModal(modals, id)
            navigate(`/${board._id}`)
            const group = board.groups.find(group => group.id === groupId)
            group.tasks = group.tasks.filter(t => t.id !== task.id)
            board.groups = board.groups.map(g => g.id === groupId ? group : g)
            await saveBoard(board)
        }
        catch (err) {
            console.error('Failed delete checklist')
        }
    }

    return <div className='delete-checklist-modal'>
        <ModalHeader id={id} header={'Delete Task'} allowBack={false} />
        <p className='delete-msg'>
            All actions will be removed from the activity
            feed and you won’t be able to re-open the
            card. There is no undo.
        </p>
        <button className='delete-label delete-page-btn' onClick={onDeleteTask}>Delete</button>
    </div>
}