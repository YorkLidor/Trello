import { useSelector } from "react-redux";
import { store } from "../../store/store";
import { CLOSE_MODAL } from "../../store/app.reducer";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

import { SET_ACTIVE_BOARD } from "../../store/board.reducer";

import { boardService } from "../../services/board.service";

export function MemberPicker({ cmpProps }) {
    const { groupId, task } = cmpProps

    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)

    function onMemberToggle(member) {
        let action
        let checkedIdx = task.memberIds?.findIndex(memberId => memberId === member._id)

        // !checkIdx prevent remove Idx = 0
        if (checkedIdx == null || checkedIdx === -1) {
            if(checkedIdx) task.memberIds.unshift(member._id)
            else task.memberIds = [member._id]
            action = 'Added member ' + member.fullname + ' to board members.'
        } else {
            task.memberIds.splice(checkedIdx, 1)
            action = 'Removed member ' + member.fullname + ' from board members.'
        }
        saveTask(action)
    }

    async function saveTask(action) {
        const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)
        await boardService.saveTask(board._id, groupId, task, activity)
        store.dispatch({ type: SET_ACTIVE_BOARD, board })
    }

    return board && <div className="modal-members-box">
        <div className='modal-header-container flex row'>
            <span style={{ margin: 0, padding: 0 }} />
            <span className='modal-header'>Members</span>
            <AiOutlineClose className='close-modal' onClick={() => store.dispatch({ type: CLOSE_MODAL })} />
        </div>
        <span className="modal-label">Board members</span>
        <ul className="members-picker-list">
            {
                board?.members?.length > 0 && board.members.map(member => {
                    const checked = task.memberIds?.find(memberId => memberId === member._id)
                    const className = checked ? 'member-picker checked' : 'member-picker'
                    return <li className="member-picker-line" onClick={(() => onMemberToggle(member))}>
                        <a href='#' className={className}>
                            <span className="member-img-container">
                                <img src={member.imgUrl} className='list-member' />
                            </span>
                            <span className="member-name">{member.fullname}</span>
                            <span className="is-checked">{
                                checked ?
                                    <AiOutlineCheck className="is-checked-icon" /> : ''
                            }</span>
                        </a>
                    </li>
                })
            }
        </ul>
    </div >

}