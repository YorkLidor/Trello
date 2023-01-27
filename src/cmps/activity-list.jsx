import { useSelector } from "react-redux"

export function ActivityList({ taskId }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const activities = taskId ? board.activities.filter(activity => activity.task.id === taskId) : board.activities

    return activities.map(activity => {
        return <div className="activity-item">
            <img className='activity-member-logo' src={activity.byMember.imgUrl} />
            <div className="activity-box">
                <span className="activity-member-name">{activity.byMember.fullname}</span>
                <span className='activity-txt'>{activity.txt}</span>
            </div>
            <span className="activity-time-txt">{activity.createdAt}</span>
        </div>
    })
}


