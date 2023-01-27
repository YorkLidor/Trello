import { useSelector } from 'react-redux'

import { ModalHeader } from '../modal/modal-header'
import { closeModal } from '../../store/actions/app.actions'

import { saveTask } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

export function DeleteChecklistModal({ cmpProps, id }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { user, boardId, groupId, task, checklist } = cmpProps
    // Delete label from board labels
    async function onDeleteChecklist() {

        closeModal(modals, id)
        const newTask = boardService.removeChecklist(task, checklist)
        console.log(newTask)
        await saveTask(groupId, task, boardService.getActivity(user, task, `${user} removed checklist ${checklist.title}`))
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