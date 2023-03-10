import { useSelector } from 'react-redux'

import { ModalHeader } from '../modal/modal-header'
import { closeModal } from '../../store/actions/app.actions'

import { getActivityText, saveTask } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { REMOVE_COMMENT } from '../../store/actions/board.actions'

export function DeleteCommentModal({ user, groupId, task, comment, id }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)

    // Delete label from board labels
    async function onDeleteChecklist() {
        try {
            closeModal(modals, id)
            const newTask = boardService.removeComment(task, comment)

            const action = `${getActivityText(REMOVE_COMMENT)} ${comment.txt}`
            await saveTask(groupId, newTask, boardService.getActivity(user, newTask, action))
        }
        catch (err) {
            console.error('Failed delete checklist')
        }
    }

    return <div className='delete-checklist-modal'>
        <ModalHeader id={id} header={'Delete Comment'} allowBack={false} />
        <p className='delete-msg'>
            Deleting a comment is forever. There is no
            undo.
        </p>
        <button className='delete-label delete-page-btn' onClick={onDeleteChecklist}>Delete</button>
    </div>
}