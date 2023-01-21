
export function TaskPreviewIcons({ board, task, groupId }) {

    const membersToRender = board.members.filter((member) => task.memberIds?.includes(member._id))

    return <section className="task-preview-icons-container">


        {membersToRender && membersToRender.length > 0 && (
            <section className="members-container">

                {membersToRender.map((member)=>(
                    <div className="member-container" key={member._id}>
                        <img src={`${member.imgUrl}`} alt={`${member.fullname}`} />
                    </div>
                ))}

            </section>
        )}

    </section>


}
