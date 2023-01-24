
import { IoIosArrowBack } from "react-icons/io"
import { IoClose } from "react-icons/io5"

import { closeModal } from "../../store/actions/app.actions"


export function ModalHeader({ header, allowBack, onModalClickBack }) {
    return <div className='modal-header-container flex row'>
        {
            allowBack && onModalClickBack ? <IoIosArrowBack className='back-modal' onClick={onModalClickBack} /> : <span />
        }
        <span className='modal-header'>{header}</span>
        <IoClose className='close-modal' onClick={closeModal} />
    </div>
}