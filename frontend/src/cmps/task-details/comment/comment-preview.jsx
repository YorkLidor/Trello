import { useSelector } from "react-redux"
import { MODAL_REMOVE_COMMENT } from '../../modal/modal'

export function CommentPreview({ comment, onToggleModal }) {
    const user = useSelector((storeState) => storeState.userModule.user)

    function onRemoveComment(commentId) {

    }

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
                    {onToggleModal && <span className="delete-comment" onClick={(ev) => onToggleModal(ev, MODAL_REMOVE_COMMENT, { comment })}>Delete</span>}
                </div>
            }
        </div>
    </div>
}