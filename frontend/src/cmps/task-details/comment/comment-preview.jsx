import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { useParams } from "react-router-dom"

import { boardService } from "../../../services/board.service"

import { IoMdClose } from "react-icons/io"
import { MODAL_REMOVE_COMMENT } from '../../modal/modal'

export function CommentPreview({ comment, onToggleModal, task }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const { groupId } = useParams()
    const [editComment, setEditComment] = useState(false)
    const elCommentRef = useRef()

    function handleEdit({ target }) {
        if (target.value.length) return
    }

    async function onSaveComment(ev) {
        ev.preventDefault()
        const value = ev.target[0].value
        if (!value.length) return
        
        elCommentRef.current.classList.toggle('comment-typing')
        setEditComment(false)
        await boardService.addComment(user, groupId, task, value)
    }


    return <div className="comment-container flex row">
        <img className="commentor-logo" src={comment.byMember.imgUrl ? comment.byMember.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
        <div className="comment-box" key={comment.id}>
            <span className="comment-by-member">{comment.byMember.fullName}</span>
            <a href="#" className="comment-time">{new Date(+comment.createdAt).toLocaleTimeString()}</a>

            {
                !editComment ? <>
                    <div className="task-activity">
                        <div className="comment-text">{comment.txt}</div>
                    </div>
                    {
                        (user._id === comment.byMember.id) &&
                        <div className="comment-tools">
                            <span className="edit-comment" onClick={() => setEditComment(true)}>Edit</span>
                            <span className="break-tools"> • </span>
                            {onToggleModal && <span className="delete-comment" onClick={(ev) => onToggleModal(ev, MODAL_REMOVE_COMMENT, { comment })}>Delete</span>}
                        </div>
                    }
                </> :
                    <>
                        <div className="new-comment-box">
                            <img className="user-logo" src={user.imgUrl ? user.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
                            <form ref={elCommentRef} className="task-activity comment-typing" onSubmit={onSaveComment}>
                                <div className="comment-input-container" ref={elCommentRef}>
                                    <textarea className="task-activity-input" placeholder={'Write a comment...'} onChange={handleEdit} defaultValue={comment.txt} />
                                </div>
                                <button className="comment-btn">Save</button>
                            </form>
                        </div>
                    </>
            }
        </div>
    </div>
}