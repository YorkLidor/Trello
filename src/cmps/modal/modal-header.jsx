
import { IoIosArrowBack } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { useSelector } from "react-redux"

import { closeModal } from "../../store/actions/app.actions"


export function ModalHeader({ id, header, allowBack, onModalClickBack }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    return <div className='modal-header-container flex row'>
        {
            allowBack && onModalClickBack ? <IoIosArrowBack className='back-modal' onClick={onModalClickBack} /> : <span />
        }
        <span className='modal-header'>{header}</span>
        <IoClose className='close-modal' onClick={(ev) => closeModal(modals, id)} />
    </div>
}