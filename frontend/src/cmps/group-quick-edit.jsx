import { useSelector } from "react-redux"
import { ModalHeader } from "./modal/modal-header"
import { closeModal } from "../../src/store/actions/app.actions"

export function GroupQuickEdit({ id, groupId, onRemoveGroup, onCopyGroup }) {
    const board = useSelector(state => state.boardModule.board)
    const modals = useSelector((storeState) => storeState.appModule.app.modals)

    return <div className="modal-members-box quick-edit-modal-container">

        <ModalHeader id={id} header={'List actions'} allowBack={false} />

        <ul className="members-picker-list buttons-container">
            <li>
                Add card...
            </li>
            <li onClick={() => { onCopyGroup(board, groupId); closeModal(modals, id) }}>
                Copy list...
            </li>
            <li onClick={() => { onRemoveGroup(groupId); closeModal(modals, id) }}>
                Delete list...
            </li>
        </ul>
    </div >
}