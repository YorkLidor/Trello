import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { FaPager } from 'react-icons/fa'
import { GrTextAlignFull } from 'react-icons/gr'
import { FiList } from "react-icons/fi";
import { IoPricetagOutline } from 'react-icons/io5'
import { BsFillCircleFill } from 'react-icons/bs'
import { GrAttachment } from 'react-icons/gr'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineUser } from 'react-icons/hi'


import { Blocks } from "react-loader-spinner";
import { Modal } from "../cmps/modal/modal";

import { utilService } from '../services/util.service'
import { boardService } from "../services/board.service";
import { useSelector } from "react-redux";

import { SET_ACTIVE_BOARD } from "../store/board.reducer";
import { TOGGLE_MODAL, CLOSE_MODAL } from "../store/app.reducer";

import { store } from "../store/store";
import { setModalData } from "../store/app.actions"

import {
    MODAL_ATTACH,
    MODAL_LABELS,
    MODAL_ATTACH_EDIT,
    MODAL_ATTACH_OPEN,
    MODAL_MEMBERS,
    MODAL_MEMBER_OPEN
} from '../cmps/modal/modal.jsx'

import { AttachmentList } from "../cmps/task-details/attachment/attachment-list";
import { CommentList } from "../cmps/task-details/comment-list";
import { MemberList } from "../cmps/task-details/member-list";


export function TaskDetails() {

    const { boardId, groupId, taskId } = useParams()
    const [taskToEdit, setTaskToEdit] = useState(null)

    const isModalOpen = useSelector((storeState) => storeState.appModule.app.isModalOpen)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const modalData = useSelector((storeState) => storeState.appModule.modalData)

    var group = useRef()
    group.current = groupId ? board?.groups?.find(g => g.id === groupId) : null

    const labels = (taskToEdit && board) ? board.labels.filter(label => taskToEdit?.labelIds?.includes(label.id)) : []

    const navigate = useNavigate()
    const descToolsRef = useRef()
    const elDescInputRef = useRef()

    const elCommentRef = useRef()
    const elCommentInputRef = useRef()
    const commentBtnRef = useRef()

    const modalBoxRef = useRef()

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

    function closePage() {
        if (isModalOpen) closeModal()
        else navigate(`/board/${boardId}`)
    }

    function closeModal(ev = null) {
        if (ev) ev.stopPropagation()
        store.dispatch({ type: CLOSE_MODAL })
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

    function onRemoveAttachment(ev, attachmentId) {
        ev.stopPropagation()
        const attachments = [...taskToEdit.attachments?.filter(attachment => attachment.id !== attachmentId)]
        taskToEdit.attachments = attachments
        setTaskToEdit({ ...taskToEdit })
    }

    function onEditAttachment(ev, attachment) {
        ev.stopPropagation()
        toggleModal(ev, MODAL_ATTACH_EDIT, { attachment })
    }

    function onOpenAttachment(ev, attachment) {
        if(ev) ev.stopPropagation()
        toggleModal(ev, MODAL_ATTACH_OPEN, { attachment })
    }

    function getAttachmentProps() {
        return {
            onEditAttachment,
            onRemoveAttachment,
            onOpenAttachment
        }
    }


    function onMemberClick(ev, member) {
        ev.stopPropagation()
        toggleModal(ev, MODAL_MEMBER_OPEN, { member })
    }

    async function onRemoveFromCard(member) {

        let action = 'Removed member ' + member.fullname + ' from board members.'
        taskToEdit.memberIds = taskToEdit.memberIds?.filter(memberId => memberId !== member._id)

        const activity = boardService.getActivity(user, { id: taskToEdit.id, title: taskToEdit.title }, action)
        await boardService.saveTask(board._id, groupId, taskToEdit, activity)
        store.dispatch({ type: SET_ACTIVE_BOARD, board })
    }

    // Toggle modal visibility and set it's pos under element
    function toggleModal(ev, modalType, ex = null) {
        let element
        if (ev) {
            ev.stopPropagation()
            element = ev.target
        }
        if (ev?.target.dataset?.type === 'icon') element = ev.target.parentNode

        let props
        if (modalType === MODAL_LABELS) props = { groupId, task: taskToEdit }
        else if (modalType === MODAL_ATTACH) props = { boardId, groupId, task: taskToEdit }
        else if (modalType === MODAL_ATTACH_EDIT) props = { boardId, groupId, task: taskToEdit, attachment: ex.attachment }
        else if (modalType === MODAL_ATTACH_OPEN) props = { deletion: onRemoveAttachment, attachment: ex.attachment }
        else if (modalType === MODAL_MEMBERS) props = { groupId, task: taskToEdit }
        else if (modalType === MODAL_MEMBER_OPEN) props = { member: ex.member, onRemoveFromCard }

        setModalData(modalType, props)

        const pos = utilService.getElementPosition(element)
        modalBoxRef.current.style.top = pos.bottom + 'px'
        modalBoxRef.current.style.left = pos.left + 'px'

        store.dispatch({ type: TOGGLE_MODAL })
    }

    return (!taskToEdit || !group.current) ? getLoader() : <>
        <section className="task-window flex" onClick={closePage}>
            <section className="task-details" onClick={closeModal}>

                <div className="task-header">
                    <FaPager className="header-icon task-icon" /><input type='text' className="task-title" defaultValue={taskToEdit.title} onFocus={handleEdit} onBlur={handleEdit} data-type='header' />
                    <p className="header-subtitle">in list <span style={{ textDecoration: 'underline' }}>{group.current.title}</span></p>
                </div>

                <section className="task-main-col">
                    <section className="task-info flex row">
                        {
                            taskToEdit?.memberIds?.length > 0 &&
                            <div className="info-tab flex-col">
                                <span className="members-label">Members</span>
                                <MemberList members={board.members?.filter(member => taskToEdit.memberIds?.includes(member._id))} onMemberClick={onMemberClick} toggleModal={toggleModal} />
                            </div>
                        }

                        {labels.length > 0 &&
                            <div className="flex-col">
                                <span className="labels-label">Labels</span>
                                <div className="task-labels-box flex row">

                                    {
                                        labels.map(label => <button key={label.id} style={{ backgroundColor: label.color + '55' }}
                                            className='task-label' onClick={(ev) => toggleModal(ev, MODAL_LABELS)}
                                            onMouseEnter={(ev) => ev.target.style.backgroundColor = label.color + '80'}
                                            onMouseLeave={(ev) => ev.target.style.backgroundColor = label.color + '55'} >

                                            <BsFillCircleFill style={{ color: label.color }} />
                                            {label.title}

                                        </button>)
                                    }
                                    {
                                        labels.length > 0 && <button key='task-label-add' className='task-label task-label-add' onClick={(ev) => toggleModal(ev, MODAL_LABELS)}>
                                            <span className='task-label task-label-add-icon'><AiOutlinePlus /></span>
                                        </button>
                                    }
                                </div>
                            </div>
                        }

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

                    {
                        taskToEdit?.attachments?.length > 0 &&
                        <div className="task-attachment-box flex column">
                            <GrAttachment className="attach-icon task-icon" />
                            <div className="activity-header">
                                <span className="title-main-col">Attachments</span>
                            </div>
                            <AttachmentList task={taskToEdit} attachmentProps={getAttachmentProps()} />
                            <a className='button-link add-attachment' href='#' onClick={(ev) => toggleModal(ev, MODAL_ATTACH)}>Add an attachment</a>
                        </div>
                    }

                    <div className="task-activity-box flex column">
                        <FiList className="activity-icon task-icon" />

                        <div className="activity-header">
                            <span className="title-main-col">Activity</span>
                        </div>


                        <img className="user-logo" src={user.imgUrl ? user.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
                        <div className="task-activity" ref={elCommentRef}>
                            <textarea ref={elCommentInputRef} className="task-activity-input" placeholder={'Write a comment...'} data-type='comment' onFocus={handleEdit} onBlur={handleEdit} />
                            <button onClick={onSaveComment} className="save-btn comment-btn" ref={commentBtnRef}>Save</button>
                        </div>
                        {
                            /* Task Comments */
                            <CommentList task={taskToEdit} />
                        }
                    </div>


                </section>

                <div className="window-sidebar-box">
                    <nav className="window-sidebar flex column">
                        <span className="sidebar-title">Add to card</span>
                        <a className='button-link' href='#' onClick={(ev) => toggleModal(ev, MODAL_MEMBERS)}><HiOutlineUser data-type='icon' /><span className="nav-btn-txt" data-type='icon'>Members</span></a>
                        <a className='button-link' href='#' onClick={(ev) => toggleModal(ev, MODAL_LABELS)}><IoPricetagOutline data-type='icon' /><span className="nav-btn-txt" data-type='icon'>Labels</span></a>
                        <a className='button-link' href='#' onClick={(ev) => toggleModal(ev, MODAL_ATTACH)}><GrAttachment data-type='icon' /><span className="nav-btn-txt" data-type='icon'>Attachment</span></a>
                    </nav>
                </div>

            </section>


        </section >
        <div ref={modalBoxRef} className='modal-container'>
            {
                modalData && <Modal cmpProps={modalData.props} cmpType={modalData.cmpType} className={modalData.className} />
            }
        </div>
    </>
}