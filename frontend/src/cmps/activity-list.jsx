import { useSelector } from "react-redux"
import { CommentPreview } from "./task-details/comment/comment-preview"

export function ActivityList({ task, onToggleModal }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const activities = task ? board.activities.filter(activity => activity.task?.id === task.id) : board.activities

    return activities && activities.map(activity => {
        let txt = activity.txt + (!activity.isComment ? (!task ? ` at ${activity.task?.title}` : '') : '')
        const activityDate = new Date(+activity.createdAt)
        const strActivityTime = `${activityDate.getUTCDate()}/${activityDate.getUTCMonth() + 1}/${activityDate.getFullYear()} at ${activityDate.getHours()}:${activityDate.getMinutes()}`

        return activity.isComment ? <CommentPreview comment={activity} key={activity.id} onToggleModal={onToggleModal} task={task} /> : <div key={activity.id} className="activity-item">
            <img className='activity-member-logo' src={activity.byMember.imgUrl} />
            <div className="activity-box">
                <span className="activity-member-name">{activity.byMember.fullname}</span>
                <span className='activity-txt'>{txt}</span>
            </div>
            <span className="activity-time-txt">{strActivityTime}</span>
        </div>
    })
}


