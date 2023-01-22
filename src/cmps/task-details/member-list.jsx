import { AiOutlinePlus } from 'react-icons/ai'
import { MODAL_MEMBERS } from '../modal/modal'

export function MemberList({ members, onMemberClick , toggleModal }) {

    return <div className="task-members-box flex row">
        {members.length > 0 && members.map(member =>  <img key={member._id} alt={member.fullname} src={member.imgUrl} onClick={(ev) => onMemberClick(ev, member)} className='list-member' />)}

        {members.length > 0 && <button key='task-member-add' className='task-member task-member-add' onClick={(ev) => toggleModal(ev, MODAL_MEMBERS)}>
            <span className='task-member task-member-add-icon' ><AiOutlinePlus /></span>
        </button>}
    </div>
}