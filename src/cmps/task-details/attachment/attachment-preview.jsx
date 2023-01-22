import { BsArrowUpRight } from 'react-icons/bs'

export function AttachmentPreview({ attachment, attachmentProps }) {
    const { onRemoveAttachment, onEditAttachment, onOpenAttachment } = attachmentProps

    return attachment && <div className="attachment-preview">
        <img className="attachment-preview-img" src={attachment.url} alt={attachment.filename} onClick={() => onOpenAttachment(attachment)} />
        <p className="attachment-details" onClick={(ev) => onOpenAttachment(ev, attachment)}>
            <span className="attachment-filename">{attachment.filename}</span>
            <BsArrowUpRight className='attachment-open' />

            <span className='attachment-info'>
                <span className="attachment-date">Added {new Date(attachment.createdAt).toLocaleDateString()}</span>
                <span className='attachment-info-break' />
                <span className="action-attachment" onClick={(ev) => onRemoveAttachment(ev, attachment.id)}>Delete</span>
                <span className='attachment-info-break' />
                <span className="action-attachment" onClick={(ev) => onEditAttachment(ev, attachment)}>Edit</span>
            </span>
        </p>

    </div>
}