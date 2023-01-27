import { useSelector } from 'react-redux'

import { ModalHeader } from '../modal/modal-header'
import { closeModal } from '../../store/actions/app.actions'

import { getActivityText, saveTask } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { REMOVE_CHECKLIST } from '../../store/actions/board.actions'

export function DeleteChecklistModal({ cmpProps, id }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { user, boardId, groupId, task, checklist } = cmpProps

    // Delete label from board labels
    async function onDeleteChecklist() {
        closeModal(modals, id)
        const newTask = boardService.removeChecklist(task, checklist)
        
        const action = `${getActivityText(REMOVE_CHECKLIST)} ${checklist.title}`
        await saveTask(groupId, task, boardService.getActivity(user, task, action))
    }

    return <div className='delete-checklist-modal'>
        <ModalHeader id={id} header={'Delete Checklist'} allowBack={false}/>
        <p className='delete-msg'>
            This will remove this checklist from all cards.
            There is no undo.
        </p>
        <button className='delete-label delete-page-btn' onClick={onDeleteChecklist}>Delete</button>
    </div>
}