import { boardService } from '../services/board.service'
import { uploadImg } from '../services/upload-img.service'
import { CLOSE_MODAL } from '../store/app.reducer'
import { store } from '../store/store'
import { AiOutlineClose } from 'react-icons/ai'

export function AttachmentModal({ cmpProps }) {
    const { boardId, groupId, task } = cmpProps

    const member = {
        id: 101,
        fullName: 'Gal Zohar',
        imgUrl: 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'
    }

    async function uploadAttach(ev) {
        const url = await uploadImg(ev)
        const action = 'Added attachment ' + url
        const activity = boardService.getActivity(member, { id: task.id, title: task.title }, action)

        task.attachments = task.attachments ? task.attachments.unshift(boardService.getAttachment(url)) : [boardService.getAttachment(url)]
        boardService.saveTask(boardId, groupId, task, activity)

        store.dispatch({ type: CLOSE_MODAL })
    }

    return <div className='attach-modal-box'>
        <div className='picker-header-container flex row'>
            <span style={{ margin: 0, padding: 0}}/>
            <span className='picker-header'>Attach from...</span>
            <AiOutlineClose className='close-modal' onClick={() => store.dispatch({ type: CLOSE_MODAL })} />
        </div>
        <ul className="attachment-list">
            <li>
                <label htmlFor='uploadAttach'>Computer</label>
                <input type='file' id='uploadAttach' name='uploadAttach' onChange={uploadAttach} style={{ display: 'none' }} />
            </li>
        </ul>
    </div>
}