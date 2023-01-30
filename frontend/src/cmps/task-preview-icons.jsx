import { FiPaperclip } from 'react-icons/fi'
import { TbCheckbox, TbMessageCircle2 } from 'react-icons/tb'
import { GrTextAlignFull } from "react-icons/gr"
import { useRef, useState } from 'react'
import { utilService } from '../services/util.service'

export function TaskPreviewIcons({ board, task }) {
    const dateDoneText = useRef(getDateDoneText())
    const [membersToRender, setMembersToRender] = useState(getTaskMembers())

    function getTaskMembers() {
        const members = board.members.filter((member) => task.memberIds?.includes(member._id))
        return members
    }

    function calculateTodos(task) {
        const { doneTodos, todos } = task.checklists.reduce(({ doneTodos, todos }, checklists) => {
            checklists.todos.forEach(todo => {
                if (todo.isDone) doneTodos++
                todos++
            })
            return { doneTodos, todos }
        }
            , { doneTodos: 0, todos: 0 }
        )

        return doneTodos + '/' + todos
    }

    function getDateDoneText() {
        const now = new Date().getTime()
        const { dueDate } = task

        if (dueDate?.done) return 'complete'
        else if (dueDate?.date && dueDate.date <= now) return 'overdue'
        else if (dueDate?.date && (dueDate.date - now) / (60 * 60 * 1000) < 24) return 'due-soon'
        return 'later'

    }

    return <section className="task-preview-icons-container">

        {task &&
            < section className="icons-container flex">

                {task?.comments?.length > 0 && (
                    <section className="attachments-container">
                        <TbMessageCircle2 className='attachment-icon' />
                        <span className='attachment-number'>{task.comments.length}</span>
                    </section>
                )}

                {(task?.attachments && task?.attachments?.length > 0) && (
                    <section className="attachments-container">
                        <FiPaperclip className='attachment-icon' />
                        <span className='attachment-number'>{task.attachments.length}</span>
                    </section>
                )}

                {(task?.checklists && task?.checklists?.length > 0) &&
                    <section className="attachments-container">
                        <TbCheckbox className="" />
                        <span className='attachment-number'>{`${calculateTodos(task)}`}</span>
                    </section>
                }
                {task?.description && (
                    <section className="attachments-container">
                        <GrTextAlignFull className="" />
                    </section>
                )}

                {task?.dueDate && <section className="attachments-container">
                    <div
                        className={`date-done-preview  ${dateDoneText.current}`}
                    >
                        {utilService.timestampToDate(task.dueDate.date)}
                    </div>
                </section>
                }
            </section>
        }

        {
            membersToRender?.length > 0 && (
             
                <section className="members-container">
                       {console.log('enter??????????:')}
                    {membersToRender.map((member) => (
                        <div className="member-container" key={member._id}>
                            <img src={`${member.imgUrl}`} alt={`${member.fullname}`} />
                        </div>
                    ))}

                </section>
            )
        }

    </section >


}
