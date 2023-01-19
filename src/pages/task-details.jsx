import { useEffect, useRef, useState } from "react"

import { FaPager } from 'react-icons/fa'
import { GrTextAlignFull } from 'react-icons/gr'
import { FiList } from "react-icons/fi";

import { HiOutlineUser } from 'react-icons/hi'
import { IoPricetagOutline } from 'react-icons/io5'
import { TbCheckbox } from 'react-icons/tb'
import { GoClock } from 'react-icons/go'
import { GrAttachment } from 'react-icons/gr'
import { MdWallpaper } from 'react-icons/md'
import { Blocks } from "react-loader-spinner";

import { utilService } from '../services/util.service'
import { useNavigate, useParams } from "react-router-dom";
import { boardService } from "../services/board.service";
import userEvent from "@testing-library/user-event";


export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const group = board?.groups.find(group => group.id === groupId)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const userIconDefault = 'assets/styles/img/profileDefault.png'
    const navigate = useNavigate()

    const descToolsRef = useRef()
    const elCommentRef = useRef()
    const commentBtnRef = useRef()

    const elCommentInputRef = useRef()
    const elDescInputRef = useRef()

    const [labels, setLabels] = useState(null)


    useEffect(() => {
        if (!boardId || !groupId || !taskId) return
        loadBoard()
    }, [])

    useEffect(() => {
        if (board && taskToEdit) {
            group.tasks = [...group.tasks.filter(task => task.id !== taskToEdit.id), taskToEdit]
            setBoard({ ...board, groups: [...board.groups.filter(grp => grp.id !== group.id), group] })
            boardService.saveBoard(board)
        }
    }, [taskToEdit])


    async function loadBoard() {
        try {
            const result = await boardService.getById(boardId)

            console.log(result);

            const group = result.groups.find(group => group.id === groupId)
            console.log(group);
            if (!group) return errorRedirect()


            const task = group.tasks.find(task => task.id === taskId)
            console.log(task);
            if (!task) return errorRedirect()

            if (task.labelIds) {
                const taskLabels = await boardService.getLabelsById(boardId, task.labelIds)
                if (taskLabels) setLabels(taskLabels)
            }
            setTaskToEdit(task)
            setBoard(result)
        }
        catch {
            errorRedirect()
        }
    }

    function getLoader() {
        return <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
        />
    }

    function errorRedirect() {
        console.log('ERROR: Failed to load board')
        return navigate('/workspace')
    }

    const user = {
        "_id": "u101",
        "fullname": "Gal Zohar",
        "username": "galzo@ggmail.com",
        "password": "aBambi123",
        "imgUrl": "https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg",
        // "mentions": [{ //optional
        //     "id": "m101",
        //     "boardId": "m101",
        //     "taskId": "t101"
        // }]
    }





    function handleEdit(ev) {
        const { target } = ev
        target.classList.toggle('is-editing')

        if (target.dataset.type === 'desc') {
            descToolsRef.current.classList.toggle('show')
            if (ev.type === 'blur') onSaveDescription()
        }

        else if (target.dataset.type === 'comment') {
            if (target.value.length) return
            elCommentRef.current.classList.toggle('comment-typing')
            commentBtnRef.current.classList.toggle('show')
        }

        else if (target.dataset.type === 'header') {
            if (ev.type === 'blur') {
                const val = target.value
                console.log(val)
                setTaskToEdit({ ...taskToEdit, title: val })
            }
        }
    }

    function onSaveDescription() {
        if (!taskToEdit.description && !elDescInputRef.current.value.length) return
        setTaskToEdit({ ...taskToEdit, description: elDescInputRef.current.value })
    }

    function onSaveComment({ target }) {
        const value = elCommentInputRef.current.value
        if (!value.length) return
        const comment = {
            id: utilService.makeId(),
            createdAt: Date.now(),
            txt: value,
            byMember: {
                id: user._id,
                fullName: user.fullname,
                imgUrl: user.imgUrl
            }

        }
        const comments = taskToEdit.comments ? [...taskToEdit.comments, comment] : [comment]
        setTaskToEdit({ ...taskToEdit, comments })
    }

    return (!taskToEdit) ? getLoader() : <section className="task-window flex" onClick={() => navigate(`/board/${boardId}`)}>
        <section className="task-details" onClick={(ev) => ev.stopPropagation()}>
            <div className="task-header">
                <FaPager className="header-icon task-icon" /><input type='text' className="task-title" defaultValue={taskToEdit.title} onFocus={handleEdit} onBlur={handleEdit} data-type='header' />
                <p className="header-subtitle">in list <span style={{ textDecoration: 'underline' }}>{group.title}</span></p>
            </div>


            <section className="task-main-col">
                <section className="task-info flex row">

                    <div className="task-labels-box flex row">
                        {

                            labels && labels.map(label => <button key={label.id} style={{ backgroundColor: label.color, color: '172B4D' }} className='task-labels'>{label.title}</button>)
                        }
                        {
                            labels && <button key='add-label' style={{ backgroundColor: '#EAECF0', color: '#172B4D', fontSize: '14px' }} className='task-labels'>+</button>
                        }
                    </div>
                    <div className="task-members-box">

                    </div>
                </section>


                <div className="task-description-box flex column">
                    <GrTextAlignFull className="desc-icon task-icon" />

                    <div className="description-header">
                        <span className="title-main-col">Description</span>
                    </div>


                    <textarea ref={elDescInputRef} className="task-description" placeholder={'Add a more detailed description...'} defaultValue={taskToEdit.description} onFocus={handleEdit} onBlur={handleEdit} data-type='desc' />

                    <div ref={descToolsRef} className="description-editor-tools">
                        <button className="save-btn" onClick={onSaveDescription}>Save</button>
                        <button className="cancel-btn">Cancel</button>
                    </div>
                </div>


                <div className="task-activity-box flex column">
                    <FiList className="activity-icon task-icon" />

                    <div className="activity-header">
                        <span className="title-main-col">Activity</span>
                        <a className='button-link-header' href='#'>Show Details</a>
                    </div>


                    <img className="user-logo" src={user.imgUrl ? user.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
                    <div className="task-activity" ref={elCommentRef}>
                        <textarea ref={elCommentInputRef} className="task-activity-input" placeholder={'Write a comment...'} data-type='comment' onFocus={handleEdit} onBlur={handleEdit} />
                        <button onClick={onSaveComment} className="save-btn comment-btn" ref={commentBtnRef}>Save</button>
                    </div>


                </div>
                {
                    taskToEdit.comments?.length && taskToEdit.comments.map(comment => {
                        return <div className="comments-list" key={comment.id}>
                            <img className="commentor-logo" src={comment.byMember.imgUrl ? comment.byMember.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
                            <span className="comment-by-member">{comment.byMember.fullName}</span>
                            <span className="comment-time">{new Date(+comment.createdAt).toLocaleTimeString()}</span>
                            <div className="task-activity" ref={elCommentRef}>
                                <div className="comment-text">{comment.txt}</div>
                            </div>
                        </div>
                    })
                }
            </section>
            <div className="window-sidebar-box">
                <nav className="window-sidebar flex column">
                    <span className="sidebar-title">Add to card</span>
                    <a className='button-link' href='#'><IoPricetagOutline /> Labels</a>
                </nav>
            </div>

        </section>
    </section >
}