
import { IoIosArrowBack } from "react-icons/io"
import { AiOutlineClose } from "react-icons/ai"

import { closeModal } from "../../store/actions/app.actions"


export function ModalHeader({ header, allowBack, onModalClickBack }) {
    return <div className='modal-header-container flex row'>
        {
            allowBack && onModalClickBack ? <IoIosArrowBack className='back-modal' onClick={onModalClickBack} /> : <span />
        }
        <span className='modal-header'>{header}</span>
        <AiOutlineClose className='close-modal' onClick={closeModal} />
    </div>
}