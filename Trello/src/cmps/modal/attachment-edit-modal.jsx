import { useRef } from 'react'

import { closeModal } from '../../store/actions/app.actions'
import { getActivityText } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { ModalHeader } from './modal-header'
import { EDIT_ATTACH } from '../../store/actions/board.actions'
import { useSelector } from 'react-redux'

export function AttachmentEditModal({ cmpProps, id }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const member = useSelector((storeState) => storeState.userModule.user)
    const { groupId, task, attachment } = cmpProps
    const editInputRef = useRef()

    async function editAttach() {
        const value = editInputRef.current.value
        if(!value) return
        
        try {
            attachment.url = value
            attachment.filename = value.substring(value.lastIndexOf('/')+1)
            
            const action = `${getActivityText(EDIT_ATTACH)} ${attachment.filename}`
            const activity = boardService.getActivity(member, { id: task.id, title: task.title }, action)
            
            task.attachments = task.attachments.map(attach => attach.id === attachment.id ? attachment : attach)
            await boardService.saveTask(groupId, task, activity)
            closeModal(modals, id)
        }
        catch {
            // TODO: Replace to user message
            console.log('Edit task attachment failed')
            closeModal(modals, id)
        }

    }

    return <div className='attach-modal-box'>
        <ModalHeader id={id} header={'Edit attachment'} allowBack={false} />

        <div className='attach-editor-box'>
            <label htmlFor='edit-attach' className='attach-editor-label'>Link</label>
            <input ref={editInputRef} type='text' id='edit-attach' className='attach-edit-input' defaultValue={attachment.url}/>
            <button className='save-attach' onClick={editAttach}>Update</button>
        </div>
    </div>
}