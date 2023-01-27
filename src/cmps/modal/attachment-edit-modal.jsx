import { useRef } from 'react'

import { closeModal } from '../../store/actions/app.actions'
import { boardService } from '../../services/board.service'

import { ModalHeader } from './modal-header'

export function AttachmentEditModal({ cmpProps, id }) {
    const { boardId, groupId, task, attachment } = cmpProps
    const editInputRef = useRef()
    const member = {
        id: 101,
        fullName: 'Gal Zohar',
        imgUrl: 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'
    }

    async function editAttach(ev) {
        const value = editInputRef.current.value
        if(!value) return
        
        try {
            attachment.url = value
            attachment.filename = value.substring(value.lastIndexOf('/')+1)
            
            const action = 'Edited attachment ' + value
            const activity = boardService.getActivity(member, { id: task.id, title: task.title }, action)
            
            task.attachments = task.attachments.map(attach => attach.id === attachment.id ? attachment : attach)
            await boardService.saveTask(groupId, task, activity)
            closeModal(id)
        }
        catch {
            // TODO: Replace to user message
            console.log('Edit task attachment failed')
            closeModal(id)
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