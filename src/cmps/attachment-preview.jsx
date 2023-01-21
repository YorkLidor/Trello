import { BsArrowUpRight } from 'react-icons/bs'

export function AttachmentPreview({ attachment }) {

    return attachment && <div className="attachment-preview">
        <img className="attachment-preview-img" src={attachment.url} alt={attachment.filename} />
        <p className="attachment-details">
            <span className="attachment-filename">{attachment.filename}</span>
            <BsArrowUpRight className='attachment-open' />
            
            <span className='attachment-info'>
                <span className="attachment-date">{new Date(attachment.createdAt).toLocaleDateString()}</span>
                <span className='attachment-info-break'/>
                <span className="action-attachment">Delete</span>
                <span className='attachment-info-break'/>
                <span className="action-attachment">Edit</span>
            </span>
        </p>

    </div>
}