import { MODAL_TASK_COVER, MODAL_ATTACH_OPEN } from "../modal/modal"
import { RiInboxFill } from "react-icons/ri"

export function TaskCover({ task, onToggleModal }) {

    function onCoverClick(ev) {
        if (task?.cover?.attachmentId) {
            const attachment = task.attachments.find(att => att.id === task.cover.attachmentId)
            if (attachment) onToggleModal(ev, MODAL_ATTACH_OPEN, { attachment })
        }
    }


    return task?.cover && <div className="task-details-cover" style={task.cover.style} onClick={onCoverClick}>
        <button className="button-link btn-cover-box" onClick={(ev) => onToggleModal(ev, MODAL_TASK_COVER)}><RiInboxFill data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Cover</span></button>
    </div>
}