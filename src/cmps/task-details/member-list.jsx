import { AiOutlinePlus } from 'react-icons/ai'
import { MODAL_MEMBERS } from '../modal/modal'

import { MODAL_MEMBER_OPEN } from '../modal/modal'

export function MemberList({ members, toggleModal }) {

    function onMemberClick(ev, member) {
        ev.stopPropagation()
        toggleModal(ev, MODAL_MEMBER_OPEN, { member })
    }


    return <div className="info-tab flex-col">
        <span className="members-label">Members</span>

        <div className="task-members-box flex row">
            {members.length > 0 && members.map(member => <img key={member._id} alt={member.fullname} src={member.imgUrl} onClick={(ev) => onMemberClick(ev, member)} className='list-member' />)}

            {members.length > 0 && <button key='task-member-add' className='task-member task-member-add' onClick={(ev) => toggleModal(ev, MODAL_MEMBERS)}>
                <span className='task-member task-member-add-icon' ><AiOutlinePlus /></span>
            </button>}
        </div>
    </div>
}