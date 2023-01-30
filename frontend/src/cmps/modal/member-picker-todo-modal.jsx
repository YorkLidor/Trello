import { useSelector } from "react-redux"
import { useState } from "react"
import { ModalHeader } from "./modal-header"

import { ADD_MEMBER_A, ADD_MEMBER_C, getActivityText, saveTask, REMOVE_MEMBER_A, REMOVE_MEMBER_C } from "../../store/actions/board.actions"
import { boardService } from "../../services/board.service"

import { AiOutlineCheck } from "react-icons/ai"
import { closeModal } from "../../store/actions/app.actions"


export function MemberPickerTodos({ id, cmpProps }) {
    const { groupId, task, checklist, todo } = cmpProps

    const [memberId, setMemberId] = useState(todo.memberId ? todo.memberId : null)

    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const modals = useSelector((storeState) => storeState.appModule.app.modals)

    const taskMembers = task.memberIds?.map(memberId => board.members?.find(member => member._id === memberId))
    const boardMembers = board.members.filter(member => !task.memberIds.includes(member._id))

    async function onMemberToggle(member) {
        try {
            let action

            if (memberId) {
                // TODO ADD Remove activity
                action = `${getActivityText(REMOVE_MEMBER_A)} ${member.fullname} ${getActivityText(REMOVE_MEMBER_C)}`
            }
            else {
                // TODO ADD add activity
                action = `${getActivityText(ADD_MEMBER_A)} ${member.fullname} ${getActivityText(ADD_MEMBER_C)}`
            }

            if (memberId === member._id) {
                setMemberId(null)
                todo.memberId = null
            }
            else {
                setMemberId(member._id)
                todo.memberId = member._id
            }
            const todos = checklist.todos.map(todoItem => todoItem.id === todo.id ? todo : todoItem)
            task.checklists = task.checklists.map(list => list.id === checklist ? { ...checklist, todos } : list)

            closeModal(modals, id)

            const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)
            await saveTask(groupId, task, activity)
        }
        catch (err) {
            console.error('Failed toggle member as task member')
        }
    }



    return board && <div className="modal-members-box">
        <ModalHeader id={id} header={'Members'} allowBack={false} />
        <span className="modal-label">Card members</span>

        <ul className="members-picker-list">
            {
                taskMembers?.length > 0 && taskMembers.map(member => {
                    const checked = (memberId === member._id)
                    const className = checked ? 'member-picker checked' : 'member-picker'
                    return <li key={member._id} className="member-picker-line" onClick={(() => onMemberToggle(member))}>
                        <a href='#' className={className}>
                            <span className="member-img-container">
                                <img src={member.imgUrl} className='list-member' />
                            </span>

                            <span className="member-name">{member.fullname}</span>
                            <span className="is-checked">
                                {checked ? <AiOutlineCheck className="is-checked-icon" /> : ''}
                            </span>
                        </a>
                    </li>
                })
            }
        </ul>

        <span className="modal-label">Board members</span>

        <ul className="members-picker-list">
            {
                boardMembers?.length > 0 && boardMembers.map(member => {
                    const checked = (memberId === member._id)
                    const className = checked ? 'member-picker checked' : 'member-picker'
                    return <li key={member._id} className="member-picker-line" onClick={(() => onMemberToggle(member))}>
                        <a href='#' className={className}>
                            <span className="member-img-container">
                                <img src={member.imgUrl} className='list-member' />
                            </span>

                            <span className="member-name">{member.fullname}</span>
                            <span className="is-checked">
                                {checked ? <AiOutlineCheck className="is-checked-icon" /> : ''}
                            </span>
                        </a>
                    </li>
                })
            }
        </ul>
    </div >

}