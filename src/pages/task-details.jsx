import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { FaPager } from 'react-icons/fa'
import { GrTextAlignFull } from 'react-icons/gr'
import { FiList } from "react-icons/fi";
import { IoPricetagOutline } from 'react-icons/io5'
import { BsFillCircleFill } from 'react-icons/bs'

import { Blocks } from "react-loader-spinner";

import { utilService } from '../services/util.service'
import { boardService } from "../services/board.service";
import { useSelector } from "react-redux";

import { store } from "../store/store";
import { SET_ACTIVE_BOARD } from "../store/board.reducer";
import { LabelsPicker } from "../cmps/labels-picker";
import { Modal } from "../cmps/modal";
import { TOGGLE_MODAL, CLOSE_MODAL } from "../store/app.reducer";


export function TaskDetails() {

    const { boardId, groupId, taskId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [taskToEdit, setTaskToEdit] = useState(null)

    var group = useRef()
    group.current = groupId ? board?.groups?.find(g => g.id === groupId) : null

    const labels = (taskToEdit && board) ? board.labels.filter(label => taskToEdit?.labelIds?.includes(label.id)) : []

    const navigate = useNavigate()
    const descToolsRef = useRef()
    const elDescInputRef = useRef()

    const elCommentRef = useRef()
    const elCommentInputRef = useRef()
    const commentBtnRef = useRef()

    const LabelsPickerRef = useRef()

    const userIconDefault = 'assets/styles/img/profileDefault.png'


    useEffect(() => {
        if (!boardId || !groupId || !taskId) return errorRedirect()
        loadBoard()
    }, [])


    useEffect(() => {
        if (board && taskToEdit && group.current) {
            group.current.tasks = [...group.current.tasks.filter(task => task.id !== taskToEdit.id), taskToEdit]
            const newBoard = { ...board, groups: board.groups.map(grp => grp.id === group.current.id ? group.current : grp) }
            boardService.saveBoard(newBoard)
        }
        else {
            // console.log(board)
            // console.log(group.current)
            // console.log(taskToEdit)
        }
    }, [taskToEdit])


    async function loadBoard() {
        try {
            const boardModel = board ? { ...board } : await boardService.getById(boardId)

            group.current = boardModel.groups.find(group => group.id === groupId)
            if (!group.current) return errorRedirect()


            const task = group.current.tasks.find(task => task.id === taskId)
            if (!task) return errorRedirect()
            setTaskToEdit(task)

            if (!board) store.dispatch({ type: SET_ACTIVE_BOARD, board: boardModel })
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
    
    function backToBoard() {
        store.dispatch({ type: CLOSE_MODAL })
        navigate(`/board/${boardId}`)
    }

    const user = {
        "_id": "u101",
        "fullname": "Gal Zohar",
        "username": "galzo@ggmail.com",
        "password": "aBambi123",
        "imgUrl": "https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg",
        "mentions": [{ //optional
            "id": "m101",
            "boardId": "m101",
            "taskId": "t101"
        }]
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

    // Toggle modal visibility and set it's pos under element
    function toggleLabelPicker(ev) {
        const pos = utilService.getElementPosition(ev.target)

        LabelsPickerRef.current.style.top = pos.bottom + 'px'
        LabelsPickerRef.current.style.left = pos.left + 'px'

        store.dispatch({ type: TOGGLE_MODAL })
    }

    return (!taskToEdit || !group.current) ? getLoader() : <section className="task-window flex" onClick={backToBoard}>
        <section className="task-details" onClick={(ev) => ev.stopPropagation()}>

            <div className="task-header">
                <FaPager className="header-icon task-icon" /><input type='text' className="task-title" defaultValue={taskToEdit.title} onFocus={handleEdit} onBlur={handleEdit} data-type='header' />
                <p className="header-subtitle">in list <span style={{ textDecoration: 'underline' }}>{group.current.title}</span></p>
            </div>

            <section className="task-main-col">

                <section className="task-info flex row">
                    <div className="task-labels-box flex row">
                        {labels.length > 0 && labels.map(label => <button key={label.id} style={{ backgroundColor: label.color + '55' }}
                            className='task-label' onClick={toggleLabelPicker}><BsFillCircleFill style={{ color: label.color }} />{label.title}</button>)}

                        {
                            labels.length > 0 && <button key='add-label' style={{ backgroundColor: '#EAECF0', color: '#172B4D', fontSize: '14px' }} 
                            className='task-label task-add-label' onClick={toggleLabelPicker}>+</button>
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
                    /* Task Comments */
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
                    <a className='button-link' href='#' onClick={toggleLabelPicker}><IoPricetagOutline onClick={(ev) => ev.stopPropagation()} />  Labels</a>

                </nav>
            </div>

        </section>
        <div ref={LabelsPickerRef} className="labels-picker" onClick={(ev) => ev.stopPropagation()}>
            {
                <Modal cmpProps={{ groupId, task: taskToEdit }} cmpType='labels-picker' />
            }
        </div>
    </section >
}