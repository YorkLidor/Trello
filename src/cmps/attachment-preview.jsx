import { BsArrowUpRight } from 'react-icons/bs'

export function AttachmentPreview({ attachment, onRemoveAttachment, onEditAttachment }) {

    return attachment && <div className="attachment-preview">
        <img className="attachment-preview-img" src={attachment.url} alt={attachment.filename} />
        <p className="attachment-details">
            <span className="attachment-filename">{attachment.filename}</span>
            <BsArrowUpRight className='attachment-open' />

            <span className='attachment-info'>
                <span className="attachment-date">{new Date(attachment.createdAt).toLocaleDateString()}</span>
                <span className='attachment-info-break' />
                <span className="action-attachment" onClick={() => onRemoveAttachment(attachment.id)}>Delete</span>
                <span className='attachment-info-break' />
                <span className="action-attachment" onClick={(ev) => onEditAttachment(ev, attachment)}>Edit</span>
            </span>
        </p>

    </div>
}