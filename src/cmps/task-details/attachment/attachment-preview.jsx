import { BsArrowUpRight } from 'react-icons/bs'
import { MODAL_ATTACH_EDIT, MODAL_ATTACH_OPEN } from '../../modal/modal'


export function AttachmentPreview({ attachment, toggleModal, onRemoveAttachment }) {

    function onEditAttachment(ev, attachment) {
        ev.stopPropagation()
        toggleModal(ev, MODAL_ATTACH_EDIT, { attachment })
    }

    function onOpenAttachment(ev, attachment) {
        if (ev) ev.stopPropagation()
        toggleModal(ev, MODAL_ATTACH_OPEN, { attachment })
    }

    return attachment && <div className="attachment-preview">
        <img className="attachment-preview-img" src={attachment.url} alt={attachment.filename} onClick={(ev) => onOpenAttachment(ev, attachment)} />
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