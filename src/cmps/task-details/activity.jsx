import { useRef } from "react"

import { CommentList } from "./comment/comment-list"

import { boardService } from "../../services/board.service"

import { AiOutlineUnorderedList as ActivityIcon } from "react-icons/ai"
import { ActivityList } from "../activity-list"


export function Activity({ user, boardId, groupId, taskToEdit }) {
    const elCommentRef = useRef()

    async function onSaveComment(ev) {
        ev.preventDefault()
        const value = ev.target[0].value
        if (!value.length) return

        ev.target[0].value = ''
        elCommentRef.current.classList.toggle('comment-typing')
        await boardService.addComment(user, boardId, groupId, taskToEdit, value)
    }

    function handleEdit({ target }, state) {
        target.dataset.state = state
        if (target.value.length) return
        elCommentRef.current.classList.toggle('comment-typing')
    }

    return <div className="task-activity-box flex column">
        <ActivityIcon className="activity-icon task-icon" />
        <div className="activity-header"><span className="title-main-col">Activity</span></div>
        
        <div className="new-comment-box">
            <img className="user-logo" src={user.imgUrl ? user.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
            <form ref={elCommentRef} className="task-activity" onSubmit={onSaveComment}>
                <div className="comment-input-container" ref={elCommentRef}>
                    <textarea data-state={false} className="task-activity-input" placeholder={'Write a comment...'} onFocus={(ev) => handleEdit(ev, true)} onBlur={(ev) => !ev.target.dataset.state? '' : handleEdit(ev, false)} />
                </div>
                <button className="comment-btn">Save</button>
            </form>
        </div>
        {<CommentList task={taskToEdit} />}

        <ActivityList taskId={taskToEdit.id} />
    </div>
}