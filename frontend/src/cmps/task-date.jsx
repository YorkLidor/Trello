import { useState } from "react"

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im"
import { IoIosArrowDown } from "react-icons/io"
import { MODAL_TASK_DATE } from "./modal/modal"

export function TaskDate({ task, onToggleModal }) {
    const [checked, setChecked] = useState(task?.dueDate?.done)
    let dateDoneText = getDateDoneText()

    function getDateDoneText() {
        try {
            const now = new Date().getTime()

            if (checked) return 'complete'
            else if (task.dueDate.date < now) return 'overdue'
            else if ((task.dueDate.date - now) / (60 * 60 * 1000) < 24) return 'due-soon'
            return 'later'
        }
        catch(err) {
            console.error('failed get date done text')
        }
    }

    return task.dueDate && <div className="info-tab flex-col">
        <span className="due-date-label">Due Date</span>
        <div className="flex row">

            <label className="checkbox-date">
                <input type='checkbox' id={`date-done`} checked={checked} onChange={ev => setChecked(ev.target.checked)} />
                <span className='checkbox-container'>
                    {checked ? <ImCheckboxChecked className='checkbox checkbox-checked' /> : <ImCheckboxUnchecked className='checkbox checkbox-unchecked' />}
                </span>
            </label>

            <div className="task-due-date-preview" onClick={(ev) => onToggleModal(ev, MODAL_TASK_DATE)}>
                {new Date(task.dueDate.date).toDateString()}
                {
                    dateDoneText !== 'later' &&
                    <div className={`date-done-preview  ${dateDoneText}`}>{dateDoneText === 'due-soon' ? 'due soon' : dateDoneText}</div>
                }
                <IoIosArrowDown className="date-modal-button" />
            </div>
        </div>
    </div>
}