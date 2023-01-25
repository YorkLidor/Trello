import { boardService } from '../../../services/board.service'

import { saveTask } from '../../../store/actions/board.actions'

import { AttachmentPreview } from "./attachment-preview"
import { onRemoveAttachment } from '../../../store/actions/board.actions'

export function AttachmentList({ task, toggleModal, user, boardId, groupId }) {

    function removeAttachment(ev, attachment) {
        ev.stopPropagation()
        onRemoveAttachment(user, boardId, groupId, task, attachment)
    }

    async function onTaskUpdateCover(attachment) {
        task.cover = { style: boardService.getCoverAttachStyle(attachment.url), fullSize: task.cover?.fullSize ? task.cover.fullSize : false }
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user.fullname} changed task ${task.title} cover to attachment ${attachment.filename}`))
    }

    return task?.attachments?.length > 0 && <ul className="attachment-list">
        {task.attachments.map(attachment =>
            <li className="attachment-preview" key={attachment.id}>
                <AttachmentPreview attachment={attachment} toggleModal={toggleModal} removeAttachment={removeAttachment} onTaskUpdateCover={onTaskUpdateCover}/>
            </li>)}
    </ul>
}
