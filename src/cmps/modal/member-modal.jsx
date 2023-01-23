import { AiOutlineClose } from "react-icons/ai"
import { store } from "../../store/store"
import { CLOSE_MODAL } from "../../store/reducers/app.reducer"

export function MemberModal({ cmpProps }) {
    const { member, onRemoveFromCard } = cmpProps

    function onRemoveMember() {
        onRemoveFromCard(member)
        store.dispatch({ type: CLOSE_MODAL })
    }

    return <div className="modal-member">
        <AiOutlineClose className='close-modal-member' onClick={() => store.dispatch({ type: CLOSE_MODAL })} />
        <div className="modal-member-header">
            <img className="member-logo" src={member.imgUrl} />
            <div className="member-title">
                <span className="member-name">
                    {member.fullname}
                </span>
            </div>

        </div>
        <span className="action-member-card">
            Member on this board
        </span>
        <hr style={{ color: '#091e4221' }} />
        <span className="action-member-card active" onClick={onRemoveMember}>Remove from card</span>
    </div>
}