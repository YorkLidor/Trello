import { MODAL_TASK_COVER } from "../modal/modal"
import { RiInboxFill } from "react-icons/ri"

export function TaskCover({ task, onToggleModal }) {
    return task?.cover && <div className="task-details-cover" style={task.cover.style}>
        <button className="button-link btn-cover-box" onClick={(ev) => onToggleModal(ev, MODAL_TASK_COVER)}><RiInboxFill data-type='icon' className="sidebar-icon" /><span className="nav-btn-txt" data-type='icon'>Cover</span></button>
    </div>
}