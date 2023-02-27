import { useSelector } from "react-redux"
import { ModalHeader } from "./modal/modal-header"
import { closeModal } from "../../src/store/actions/app.actions"

export function GroupQuickEdit({ id, groupId, onRemoveGroup, onCopyGroup }) {
    const board = useSelector(state => state.boardModule.board)
    const modals = useSelector((storeState) => storeState.appModule.app.modals)

    function onItemClick(action) {
        switch (action) {
            case 'COPY':
                onCopyGroup(board, groupId)
                break;
            case 'REMOVE':
                onRemoveGroup(groupId)
                break;
            default:
                break;
        }
        closeModal(modals, id)
    }

    return <div className="modal-members-box quick-edit-modal-container">

        <ModalHeader id={id} header={'List actions'} allowBack={false} />

        <ul className="members-picker-list buttons-container">
            <li>
                Add card...
            </li>
            <li onClick={() => { onItemClick('COPY') }}>
                Copy list...
            </li>
            <li onClick={() => { onItemClick('REMOVE') }}>
                Delete list...
            </li>
        </ul>
    </div >
}