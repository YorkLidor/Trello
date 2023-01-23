import { LabelPreview } from "./label-preview"
import { MODAL_LABELS } from "../../modal/modal"
import { AiOutlinePlus } from "react-icons/ai"

export function LabelList({ board, task, toggleModal }) {
    const labels = (task && board) ? board.labels.filter(label => task?.labelIds?.includes(label.id)) : []
    return <div className="info-tab flex-col">
        <span className="labels-label">Labels</span>
        <div className="task-labels-box flex row">
            {
                labels.map(label => <LabelPreview label={label} toggleModal={toggleModal} />)
            }
            {
                labels.length > 0 && <button key='task-label-add' className='task-label task-label-add' onClick={(ev) => toggleModal(ev, MODAL_LABELS)}>
                    <span className='task-label task-label-add-icon'><AiOutlinePlus /></span></button>
            }
        </div>
    </div>
}