import { AttachmentPreview } from './attachment-preview';

export function AttachmentList({ task , attachmentProps }) {
    
    return task?.attachments?.length > 0 && <ul className="attachment-list grid">
        {task.attachments.map(attachment =>
            <li className="attachment-preview" key={attachment.id}>
                <AttachmentPreview attachment={attachment} attachmentProps={attachmentProps} />
            </li>)}
    </ul>
}
