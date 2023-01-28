import { closeModal } from '../../store/actions/app.actions'
import { saveTask } from '../../store/actions/board.actions'

import { uploadImg } from '../../services/upload-img.service'
import { getActivityText } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { ModalHeader } from './modal-header'
import { useSelector } from 'react-redux'

import { ADD_ATTACH } from '../../store/actions/board.actions'

export function AttachmentModal({ id, cmpProps }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const user = useSelector((storeState) => storeState.userModule.user)
    const { groupId, task } = cmpProps

    async function uploadAttach(ev) {
        try {
            closeModal(modals, id)
            const { url, filename } = await uploadImg(ev)

            const action = `${getActivityText(ADD_ATTACH)} ${filename}`
            const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)

            const attachment = boardService.getAttachment(url, filename)
            if (task.attachments?.length > 0) task.attachments.unshift(attachment)
            else task.attachments = [boardService.getAttachment(url, filename)]

            const taskToSave = task.cover ? task : boardService.setCoverImage(task, attachment)
            await saveTask(groupId, taskToSave, activity)
        }
        catch (err) {
            console.error('Failed upload attachment')
        }
    }

    return <div className='attach-modal-box'>
        <ModalHeader id={id} header={'Attach from...'} allowBack={false} />
        <ul className="attachment-list-modal">
            <li>
                <label htmlFor='uploadAttach' className='attachment-modal-option'>Computer</label>
                <input type='file' id='uploadAttach' name='uploadAttach' onChange={uploadAttach} />
            </li>
        </ul>
    </div>
}