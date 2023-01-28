import { useSelector } from "react-redux"

export function CommentPreview({ comment }) {
    const user = useSelector((storeState) => storeState.userModule.user)

    console.log(user, comment.byMember)

    return <div className="comment-container flex row">
        <img className="commentor-logo" src={comment.byMember.imgUrl ? comment.byMember.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
        <div className="comment-box" key={comment.id}>
            <span className="comment-by-member">{comment.byMember.fullName}</span>
            <a href="#" className="comment-time">{new Date(+comment.createdAt).toLocaleTimeString()}</a>
            <div className="task-activity">
                <div className="comment-text">{comment.txt}</div>
            </div>
            {
                (user._id === comment.byMember.id) &&
                <div className="comment-tools">
                    <span className="edit-comment">Edit</span>
                    <span className="break-tools"> • </span>
                    <span className="delete-comment">Delete</span>
                </div>
            }
        </div>
    </div>
}