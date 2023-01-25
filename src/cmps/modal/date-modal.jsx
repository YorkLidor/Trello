import { useSelector } from "react-redux"
import { useState } from "react"
import { saveTask } from "../../store/actions/board.actions"
import { boardService } from "../../services/board.service"


import { DateSelector } from "./date-selector"
import { ModalHeader } from "./modal-header"
import { closeModal } from "../../store/actions/app.actions"



export function DateModal({ cmpProps, id }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { user, boardId, groupId, task } = cmpProps
    const [endDate, setEndDate] = useState(task?.dueDate?.date ? task.dueDate.date : new Date().now)

    function onChangeDate(date) {
        console.log(date)
        setEndDate(date)
    }

    async function onSaveDate() {
        if(!endDate) return
        task.dueDate = {date: endDate.getTime(), done: false}
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user.fullname} Changed task ${task.title} due date to ${endDate}`))
        closeModal(modals, id)
    }

    async function onRemoveDate() {
        task.dueDate = null
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `${user.fullname} Changed task ${task.title} due date to ${endDate}`))
        closeModal(modals, id)
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