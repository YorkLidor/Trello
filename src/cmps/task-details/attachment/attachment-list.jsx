import { AttachmentPreview } from "./attachment-preview"

import { onRemoveAttachment } from '../../../store/actions/board.actions'

export function AttachmentList({ task, toggleModal, user, boardId, groupId }) {

    function removeAttachment(ev, attachment) {
        ev.stopPropagation()
        onRemoveAttachment(user, boardId, groupId, task, attachment)
    }

    return task?.attachments?.length > 0 && <ul className="attachment-list">
        {task.attachments.map(attachment =>
            <li className="attachment-preview" key={attachment.id}>
                <AttachmentPreview attachment={attachment} toggleModal={toggleModal} removeAttachment={removeAttachment} />
            </li>)}
    </ul>
}
