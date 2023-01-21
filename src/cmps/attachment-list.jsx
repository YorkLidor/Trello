import { AttachmentPreview } from './attachment-preview';

export function AttachmentList({ task , onRemoveAttachment, onEditAttachment }) {

    return task?.attachments?.length > 0 && <ul className="attachment-list grid">
        {task.attachments.map(attachment =>
            <li className="attachment-preview" key={attachment.id}>
                <AttachmentPreview attachment={attachment} onRemoveAttachment={onRemoveAttachment} onEditAttachment={onEditAttachment} />
            </li>)}
    </ul>
}
