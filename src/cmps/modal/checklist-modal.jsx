import { useRef } from "react";
import { boardService } from "../../services/board.service";
import { closeModal } from "../../store/actions/app.actions";
import { saveTask } from "../../store/actions/board.actions";
import { ModalHeader } from "./modal-header";


export function ChecklistModal({ id, cmpProps }) {
    const { boardId, groupId, task, user, modals } = cmpProps
    const elTitleInputRef = useRef()

    async function onSave() {
        if(!task.checklists) task.checklists = []
        task.checklists.unshift(boardService.getNewChecklist(elTitleInputRef.current.value))
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user} added new checklist ${elTitleInputRef.current.value}`))
        closeModal(modals, id)
    }

    return <div className='add-checklist-box'>
        <ModalHeader header={'Add checklist'} />
        <div className="add-checklist">
            <label>
                <span className="modal-label">Title</span>
                <input type='text' className='checklist-title' ref={elTitleInputRef} />
            </label>

            <button className="save-btn" onClick={onSave}>Add</button>
        </div>
    </div>
}