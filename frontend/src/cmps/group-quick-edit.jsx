import { ModalHeader } from "./modal/modal-header"

export function GroupQuickEdit({ id, groupId, onRemoveGroup, onCopyGroup, board }) {

    return <div className="modal-members-box quick-edit-modal-container">

        <ModalHeader id={id} header={'List actions'} allowBack={false} />

        <ul className="members-picker-list buttons-container">
            <li>
                Add card...
            </li>
            <li onClick={() => onCopyGroup(board, groupId)}>
                Copy list...
            </li>
            <li onClick={() => onRemoveGroup(groupId)}>
                Delete list...
            </li>
        </ul>
    </div >
}