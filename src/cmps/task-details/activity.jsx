import { useRef } from "react"

import { CommentList } from "./comment/comment-list"

import { boardService } from "../../services/board.service"

import { BiAlignLeft as ActivityIcon } from "react-icons/bi"


export function Activity({ user, boardId, groupId, taskToEdit }) {
    const elCommentRef = useRef()
    const elCommentInputRef = useRef()
    const commentBtnRef = useRef()

    async function onSaveComment() {
        const value = elCommentInputRef.current.value
        if (!value.length) return

        elCommentInputRef.current.value = ''
        await boardService.addComment(user, boardId, groupId, taskToEdit, value)
    }

    function handleEdit({ target }) {
        if (target.value.length) return
        elCommentRef.current.classList.toggle('comment-typing')
        commentBtnRef.current.classList.toggle('show')
    }

    return <div className="task-activity-box flex column">
        <ActivityIcon className="activity-icon task-icon" />
        <div className="activity-header"><span className="title-main-col">Activity</span></div>
        <div className="new-comment-box">
            <img className="user-logo" src={user.imgUrl ? user.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
            <div className="task-activity">
                <div className="comment-input-container" ref={elCommentRef}>
                    <textarea ref={elCommentInputRef} className="task-activity-input" placeholder={'Write a comment...'} onFocus={handleEdit} onBlur={handleEdit} />
                </div>
                <button onClick={onSaveComment} className="comment-btn" ref={commentBtnRef}>Save</button>
            </div>
        </div>

        {<CommentList task={taskToEdit} />}
    </div>
}