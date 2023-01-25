import { MODAL_TASK_COVER } from "../modal/modal"

export function TaskCover({ task, onToggleModal }) {
    return task?.cover && <div className="task-details-cover" style={task.cover.style}>
        <button className="button-link btn-cover" onClick={(ev) => onToggleModal(ev, MODAL_TASK_COVER)}>Cover</button>
    </div>
}