import { FiPaperclip } from 'react-icons/fi'
import { TbCheckbox, TbMessageCircle2 } from 'react-icons/tb'


export function TaskPreviewIcons({ board, task }) {
    const membersToRender = board.members.filter((member) => task.memberIds?.includes(member._id))

    return <section className="task-preview-icons-container">


        {task &&
            < section className="icons-container flex">

                {task?.comments?.length > 0 && (
                    <section className="attachments-container">
                        <TbMessageCircle2 className='attachment-icon' />
                        <span className='attachment-number'>{task.comments.length}</span>
                    </section>
                )}

                {task?.attachments && task?.attachments?.length > 0 && (
                    <section className="attachments-container">
                        <FiPaperclip className='attachment-icon' />
                        <span className='attachment-number'>{task.attachments.length}</span>
                    </section>
                )}

                {task?.checklists && task?.checklists?.length > 0 && (
                    <section className="attachments-container">
                        {console.log('task:', task?.checklists)}
                        <TbCheckbox className="" />
                        <span className='attachment-number'>{`${task.checklists.reduce((acc, todo) => {
                            if (todo.isDone) return acc++
                            else return acc
                        }, 0)}/${task.checklists.length}`}</span>
                    </section>
                )}
            </section>
        }

        {
            membersToRender && membersToRender.length > 0 && (
                <section className="members-container">

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
