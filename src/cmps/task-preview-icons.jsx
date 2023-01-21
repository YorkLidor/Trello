
import { FiPaperclip } from 'react-icons/fi'

export function TaskPreviewIcons({ board, task, groupId }) {

    const membersToRender = board.members.filter((member) => task.memberIds?.includes(member._id))
    console.log('task.atta:', task.attachments)

    return <section className="task-preview-icons-container">

        <section className="icons-container">

            {task.attachments?.length > 0 && (
                <section className="attachments-container">
                    <FiPaperclip /> 
                    {task.attachments.length}
                </section>
            )}

        </section>




        {membersToRender && membersToRender.length > 0 && (
            <section className="members-container">

                {membersToRender.map((member) => (
                    <div className="member-container" key={member._id}>
                        <img src={`${member.imgUrl}`} alt={`${member.fullname}`} />
                    </div>
                ))}

            </section>
        )}

    </section>


}
