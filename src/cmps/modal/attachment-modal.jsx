import { closeModal } from '../../store/actions/app.actions'
import { saveTask } from '../../store/actions/board.actions'

import { uploadImg } from '../../services/upload-img.service'
import { boardService } from '../../services/board.service'

import { ModalHeader } from './modal-header'
import { useSelector } from 'react-redux'

export function AttachmentModal({ id, cmpProps }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { boardId, groupId, task } = cmpProps

    const member = {
        id: 101,
        fullName: 'Gal Zohar',
        imgUrl: 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'
    }

    async function uploadAttach(ev) {
        closeModal(modals, id)
        const { url, filename } = await uploadImg(ev)
        const action = 'Added attachment ' + filename
        const activity = boardService.getActivity(member, { id: task.id, title: task.title }, action)

        if (task.attachments?.length > 0) task.attachments.unshift(boardService.getAttachment(url, filename))
        else task.attachments = [boardService.getAttachment(url, filename)]

        if(!task.cover) task.cover = { style: boardService.getCoverAttachStyle(url), fullSize: task.cover?.fullSize ? task.cover.fullSize : false }

        await saveTask(boardId, groupId, task, activity)
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