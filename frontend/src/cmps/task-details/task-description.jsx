import { useRef, useState } from "react"
import { saveDescription } from "../../store/actions/board.actions"
import { GrTextAlignFull } from "react-icons/gr"
import { useSelector } from "react-redux"

export function TaskDescription({ groupId, task }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [taskDescription, setDescription] = useState(task.description)

    const descToolsRef = useRef()
    const elDescInputRef = useRef()

    function handleEdit(ev) {
        try {
            ev.target.classList.toggle('is-editing')
            descToolsRef.current.classList.toggle('show')

            if (ev.type === 'blur') {
                onSaveDescription()
                setDescription(ev.target.value)
            }
        }
        catch(err) {
            console.error('Failed handle changes in description')
        }
    }

    async function onSaveDescription() {
        saveDescription(task, board._id, groupId, elDescInputRef.current.value)
    }

    return task && <div className="task-description-box flex column">
        <GrTextAlignFull className="desc-icon task-icon" />

        <div className="description-header"> <span className="title-main-col">Description</span> </div>

        <textarea ref={elDescInputRef} className={taskDescription?.length > 0 ? "task-description filled" : "task-description"}
            placeholder={'Add a more detailed description...'} defaultValue={taskDescription ? taskDescription : ''} onFocus={handleEdit} onBlur={handleEdit} />

        <div ref={descToolsRef} className="description-editor-tools">
            <button className="save-btn" onClick={onSaveDescription}>Save</button>
            <button className="cancel-btn">Cancel</button>
        </div>
    </div>
}