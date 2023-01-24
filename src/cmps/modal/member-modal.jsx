import { onRemoveFromCard } from "../../store/actions/board.actions"
import { closeModal } from "../../store/actions/app.actions"

import { AiOutlineClose } from "react-icons/ai"

export function MemberModal({ cmpProps }) {
    const { member, task, boardId, groupId } = cmpProps

    function onRemoveMember() {
        onRemoveFromCard(member, task, boardId, groupId)
        closeModal()
    }

    return <div className="modal-member">
        <AiOutlineClose className='close-modal-member' onClick={closeModal} />

        <div className="modal-member-header">
            <img className="member-logo" src={member.imgUrl} />
            <div className="member-title">
                <span className="member-name">{member.fullname}</span>
            </div>
        </div>

        <span className="action-member-card">
            Member on this board
        </span>

        <hr  />
        <span className="action-member-card active" onClick={onRemoveMember}>Remove from card</span>
    </div>
}