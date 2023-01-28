import { useSelector } from "react-redux"
import { useState } from "react"
import { getActivityText, saveTask, CHANGE_DUE_DATE, REMOVE_DUE_DATE } from "../../store/actions/board.actions"
import { boardService } from "../../services/board.service"


import { DateSelector } from "./date-selector"
import { ModalHeader } from "./modal-header"
import { closeModal } from "../../store/actions/app.actions"



export function DateModal({ cmpProps, id }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { user, groupId, task } = cmpProps
    const [endDate, setEndDate] = useState(task?.dueDate?.date ? task.dueDate.date : new Date().now)

    function onChangeDate(date) {
        try {
            setEndDate(date)
        }
        catch (err) {
            console.error('Failed change date')
        }
    }

    async function onSaveDate() {
        try {
            if (!endDate) return
            task.dueDate = { date: endDate.getTime(), done: false }
            await saveTask(groupId, task, boardService.getActivity(user, task, `${getActivityText(CHANGE_DUE_DATE)} ${endDate}`))
            closeModal(modals, id)
        }
        catch (err) {
            console.error('Failed save date')
        }
    }

    async function onRemoveDate() {
        try {
            task.dueDate = null
            await saveTask(groupId, task, boardService.getActivity(user, task, `${getActivityText(REMOVE_DUE_DATE)}`))
            closeModal(modals, id)
        }
        catch (err) {
            console.error('Failed remove date from task')
        }
    }



    return <div className="modal-members-box">
        <ModalHeader id={id} header={'Dates'} allowBack={false} />
        <DateSelector onChangeDate={onChangeDate} endDate={endDate} />

        <section className="date-actions">
            <button className="save-btn save-date" onClick={onSaveDate}>Save</button>
            <button className="cancel-btn remove-date" onClick={onRemoveDate}>Remove</button>
        </section>
    </div>
}