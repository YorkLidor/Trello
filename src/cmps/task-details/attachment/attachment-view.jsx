import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowUpRight } from 'react-icons/bs'

import { CLOSE_MODAL } from '../../../store/app.reducer'
import { store } from '../../../store/store'

import { useState } from 'react'

export function AttachmentView({ cmpProps }) {
    const { attachment, deletion: onRemoveAttachment } = cmpProps
    const [deleteState, setDeleteState] = useState(false)

    function toggleDelete(state) {
        setDeleteState(state)
    }

    function onRemoveAttach(ev) {
        onRemoveAttachment(ev, attachment.id)
        store.dispatch({ type: CLOSE_MODAL })
    }

    return <div className="attachment-viewer" onClick={() => store.dispatch({ type: CLOSE_MODAL })}>
        <div className='attach-viewer-closer-layout'>
            <AiOutlineClose className='close-attach-viewer' onClick={() => store.dispatch({ type: CLOSE_MODAL })} />
        </div>
        <div className='viewer-scroller'>
            <div className="attachment-viewer-preview">
                <div className='viewer-img-container'>
                    <img className="attachment-viewer-img" src={attachment.url} onClick={(ev) => ev.stopPropagation()} />
                </div>
            </div>
        </div>

        <div className='attachment-viewer-info' onClick={(ev) => ev.stopPropagation()}>
            <span className='attach-viewer-filename'>{attachment.filename}</span>
            <span className='attach-viewer-date'>{new Date(attachment.createdAt).toLocaleDateString()}</span>

            <div className="viewer-actions flex row">
                {
                    !deleteState &&
                    <>
                        <a href={attachment.url} target='_blank' className='viewer-info-action'>
                            <BsArrowUpRight className='viewer-action-icon' />
                            Open in new tab
                        </a>
                        <span style={{ textAlign: 'center' }}>


                            <AiOutlineClose className='viewer-action-icon' />
                            <a href='#' className='viewer-info-action' onClick={() => toggleDelete(true)} data-state={true}>Delete</a>

                        </span>
                    </>
                }
                {
                    deleteState &&
                    <span>
                        Are you sure you want to delete? There is no undo.
                        <span className='viewer-info-action' style={{ marginInline: '6px 0px' }} onClick={onRemoveAttach}>Delete forever</span>
                        <span className='viewer-info-action' onClick={() => toggleDelete(false)} data-state={false} style={{ marginInline: '12px 14px' }}>Nevermind</span>
                    </span>
                }
            </div>
        </div>
    </div>
}