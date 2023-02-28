import { useSelector } from "react-redux"
import { ModalHeader } from "./modal/modal-header"
import { closeModal } from "../../src/store/actions/app.actions"
import { useRef, useState } from "react"

export function GroupQuickEdit({ id, groupId, onRemoveGroup, onCopyGroup }) {
    const board = useSelector(state => state.boardModule.board)
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const modalHeader = useRef('List actions')
    const [modalType, setModalType] = useState('')
    const allowBack = useRef(false)

    function onModalClickBack() {
        modalHeader.current = 'List actions'
        allowBack.current = false
        setModalType('')
    }

    function onItemClick(action) {
        switch (action) {
            case 'COPY':
                // onCopyGroup(board, groupId)
                modalHeader.current = 'Copy list'
                allowBack.current = true
                setModalType(action)
                break
            case 'REMOVE':
                onRemoveGroup(groupId)
                closeModal(modals, id)
                break
            default:
                break
        }
    }

    return <div className="modal-members-box quick-edit-modal-container">

        <ModalHeader
            id={id}
            header={modalHeader.current}
            allowBack={allowBack.current}
            onModalClickBack={onModalClickBack}
        />

        {
            !modalType && <ul className="members-picker-list buttons-container">
                <li>
                    Add card...
                </li>
                <li onClick={() => onItemClick('COPY')}>
                    Copy list...
                </li>
                <li onClick={() => onItemClick('REMOVE')}>
                    Delete list...
                </li>
            </ul>
        }
    </div >
}