import { ModalHeader } from "./modal/modal-header"

export function GroupQuickEdit(groupId,onRemoveGroup) {

    return <div className="modal-members-box">

        <ModalHeader id={groupId} header={'List actions'} allowBack={false} />

        <ul className="members-picker-list">
            <li >
                Add card...
            </li>
            <li>
                Copy list...
            </li>
            <li onClick={()=>onRemoveGroup(groupId)}>
                Delete list...
            </li>
        </ul>
    </div >
}