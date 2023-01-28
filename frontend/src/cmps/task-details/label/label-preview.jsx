import { BsFillCircleFill } from "react-icons/bs"
import { MODAL_LABELS } from "../../modal/modal"

export function LabelPreview({ label , toggleModal}) {
    return <button key={label.id} style={{ backgroundColor: label.color + '55' }}
        className='task-label' onClick={(ev) => toggleModal(ev, MODAL_LABELS)}
        onMouseEnter={(ev) => ev.target.style.backgroundColor = label.color + '80'}
        onMouseLeave={(ev) => ev.target.style.backgroundColor = label.color + '55'} >

        <BsFillCircleFill style={{ color: label.color }} />
        {label.title}

    </button>
}