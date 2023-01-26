
import { MODAL_MEMBERS } from '../modal/modal'
import { MODAL_MEMBER_OPEN } from '../modal/modal'

import { HiOutlineUser } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'

export function MemberList({ members, toggleModal, isBoardCall = false }) {

    function onMemberClick(ev, member) {
        ev.stopPropagation()
        if (!member) return
        toggleModal(ev, MODAL_MEMBER_OPEN, { member })
    }


    return <div className="info-tab flex-col">
        <HiOutlineUser className='member-native-icon' />
        <span className="members-label">Members</span>

        <div className="task-members-box flex row">
            {members.length > 0 && members.map(member =>
                <img
                    key={member._id}
                    alt={member.fullname}
                    src={member.imgUrl}
                    onClick={(ev) => onMemberClick(ev, member)}
                    className='list-member'
                />)}

            {(members.length > 0 && !isBoardCall)&& <button
                key='task-member-add'
                className='task-member task-member-add'
                onClick={(ev) => toggleModal(ev, MODAL_MEMBERS)}
            >
                <AiOutlinePlus className='task-member-add-icon' />
            </button>}
        </div>
    </div>
}