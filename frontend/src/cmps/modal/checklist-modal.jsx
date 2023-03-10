import { useSelector } from "react-redux";

import { useRef } from "react";

import { boardService } from "../../services/board.service";

import { getActivityText } from "../../store/actions/board.actions";
import { closeModal } from "../../store/actions/app.actions";
import { saveTask } from "../../store/actions/board.actions";
import { ModalHeader } from "./modal-header";

import { ADD_CHECKLIST } from "../../store/actions/board.actions";

export function ChecklistModal({ id, cmpProps }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { groupId, task, user } = cmpProps

    const elTitleInputRef = useRef()
    const debounceRef = useRef()

    async function onSaveNewChecklist() {
        try {
            if (debounceRef.current || !elTitleInputRef.current.value.length) return
            if (!task.checklists) task.checklists = []
            task.checklists.unshift(boardService.getNewChecklist(elTitleInputRef.current.value))
            closeModal(modals, id)

            debounceRef.current = setTimeout(() => {
                debounceRef.current = null
            }, 1500)

            await saveTask(groupId, task, boardService.getActivity(user, task, `${getActivityText(ADD_CHECKLIST)} ${elTitleInputRef.current.value}`))
        }
        catch (err) {
            console.error('Failed save new checklist')
        }
    }

    return <div className='add-checklist-box'>
        <ModalHeader header={'Add checklist'} id={id} />
        <div className="add-checklist">
            <label>
                <span className="modal-label">Title</span>
                <input type='text' className='checklist-title' ref={elTitleInputRef} />
            </label>

            <button className="save-btn" onClick={onSaveNewChecklist}>Add</button>
        </div>
    </div>
}