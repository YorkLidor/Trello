import { LabelPreview } from "./label-preview"
import { MODAL_LABELS } from "../../modal/modal"
import { AiOutlinePlus } from "react-icons/ai"
import { IoPricetagOutline } from "react-icons/io5"

export function LabelList({ board, task, toggleModal }) {
    const labels = (task && board) ? board.labels.filter(label => task?.labelIds?.includes(label.id)) : []
    return <div className="info-tab flex-col">
        <IoPricetagOutline className='label-native-icon' />
        <span className="labels-label">Labels</span>

        <div className="task-labels-box flex row">
            {
                labels.map(label => <LabelPreview key={label.id} label={label} toggleModal={toggleModal} />)
            }
            {
                labels.length > 0 && <button key='task-label-add' className='task-label task-label-add' onClick={(ev) => toggleModal(ev, MODAL_LABELS)}>
                    <AiOutlinePlus className='task-label-add-icon' /></button>
            }
        </div>
    </div>
}