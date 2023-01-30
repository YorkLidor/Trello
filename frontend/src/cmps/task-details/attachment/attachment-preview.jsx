import { utilService } from '../../../services/util.service'

import { BsArrowUpRight } from 'react-icons/bs'
import { MODAL_ATTACH_EDIT, MODAL_ATTACH_OPEN } from '../../modal/modal'

export function AttachmentPreview({ task, attachment, toggleModal, removeAttachment, onTaskUpdateCover }) {
    const dateString = utilService.getTimeString(attachment.createdAt)

    function onEditAttachment(ev, attachment) {
        try {
            ev.stopPropagation()
            toggleModal(ev, MODAL_ATTACH_EDIT, { attachment })
        }
        catch (err) {
            console.error('Failed edit attachment')
        }
    }

    function onOpenAttachment(ev, attachment) {
        try {
            if (ev) ev.stopPropagation()
            toggleModal(ev, MODAL_ATTACH_OPEN, { attachment })
        }
        catch (err) {
            console.error('Failed open attachment')
        }
    }

    function setAttachAsCover(ev, attachment) {
        try {
            if (ev) ev.stopPropagation()
            onTaskUpdateCover(attachment)
        }
        catch (err) {
            console.error('Failed set attach as cover')
        }
    }

    function unsetAttachAsCover(ev) {
        try {
            if (ev) ev.stopPropagation()
            onTaskUpdateCover(null)
        }
        catch(err) {
            console.error('Failed to remove attachment from cover')
        }
    }

    return attachment && <div className="attachment-preview">
        <div className='attach-img-container'>
            <img className="attachment-preview-img" src={attachment.url} alt={attachment.filename} onClick={(ev) => onOpenAttachment(ev, attachment)} />
        </div>
        <p className="attachment-details" onClick={(ev) => onOpenAttachment(ev, attachment)}>
            <span className="attachment-filename">{attachment.filename}</span>
            <BsArrowUpRight className='attachment-open' />

            <span className='attachment-info'>
                <span className="attachment-date">Added at {dateString}</span>
                <span className='attachment-info-break' />
                <span className="action-attachment" onClick={(ev) => removeAttachment(ev, attachment)}>Delete</span>
                <span className='attachment-info-break' />
                <span className="action-attachment" onClick={(ev) => onEditAttachment(ev, attachment)}>Edit</span>
            </span>
            {
                (task.cover?.attachmentId === attachment.id) ?
                    <span className='make-attach-cover' onClick={unsetAttachAsCover}>Remove Cover</span> :
                    <span className='make-attach-cover' onClick={(ev) => setAttachAsCover(ev, attachment)}>Make Cover</span>
            }
        </p>

    </div>
}