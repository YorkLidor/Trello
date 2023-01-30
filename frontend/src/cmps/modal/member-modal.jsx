import { useSelector } from "react-redux"

import { closeModal } from "../../store/actions/app.actions"
import { onRemoveFromCard } from "../../store/actions/board.actions"

import { AiOutlineClose } from "react-icons/ai"

export function MemberModal({ id, cmpProps }) {
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const { member, task, boardId, groupId } = cmpProps

    function onRemoveMember() {
        try {
            onRemoveFromCard(member, task, groupId)
            closeModal(modals, id)
        }
        catch (err) {
            console.error('Failed remove member from task')
        }
    }

    return <div className="modal-member">
        <AiOutlineClose className='close-modal-member' onClick={() => closeModal(modals, id)} />

        <div className="modal-member-header">
            <img className="member-logo" src={member.imgUrl} />
            <div className="member-title">
                <span className="member-name">{member.fullname}</span>
            </div>
        </div>

        <span className="action-member-card">
            Member on this board
        </span>

        <hr />
        <span className="action-member-card active" onClick={onRemoveMember}>Remove from card</span>
    </div>
}