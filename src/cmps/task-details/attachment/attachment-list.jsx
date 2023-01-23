import { AttachmentPreview } from "./attachment-preview" 

export function AttachmentList({ task , toggleModal, onRemoveAttachment }) {
    
    return task?.attachments?.length > 0 && <ul className="attachment-list">
        {task.attachments.map(attachment =>
            <li className="attachment-preview" key={attachment.id}>
                <AttachmentPreview attachment={attachment} toggleModal={toggleModal} onRemoveAttachment={onRemoveAttachment}/>
            </li>)}
    </ul>
}
