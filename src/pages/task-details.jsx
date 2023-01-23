import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { store } from "../store/store";
import { setModalData } from "../store/actions/app.actions"
import { SET_ACTIVE_BOARD } from "../store/reducers/board.reducer";
import { TOGGLE_MODAL, CLOSE_MODAL } from "../store/reducers/app.reducer";

import { MODAL_ATTACH, MODAL_LABELS, MODAL_ATTACH_EDIT, MODAL_ATTACH_OPEN, MODAL_MEMBERS, MODAL_MEMBER_OPEN } from '../cmps/modal/modal.jsx'

import { AttachmentList } from "../cmps/task-details/attachment/attachment-list";
import { CommentList } from "../cmps/task-details/comment/comment-list";
import { MemberList } from "../cmps/task-details/member-list";
import { LabelList } from "../cmps/task-details/label/label-list";
import { Blocks } from "react-loader-spinner";
import { Modal } from "../cmps/modal/modal";

import { saveTask } from '../store/actions/board.actions'

import { utilService } from '../services/util.service'
import { boardService } from "../services/board.service";
import { useSelector } from "react-redux";

import { FaPager as IconHeader } from 'react-icons/fa'
import { GrTextAlignFull } from 'react-icons/gr'
import { FiList } from "react-icons/fi";
import { RiAttachment2 } from 'react-icons/ri'
import { TaskDetailsSideBar } from "../cmps/task-details/task-details-sidebar";

export function TaskDetails() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const isModalOpen = useSelector((storeState) => storeState.appModule.app.isModalOpen)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const modalData = useSelector((storeState) => storeState.appModule.app.modalData)

    const { boardId, groupId, taskId } = useParams()
    const [taskToEdit, setTaskToEdit] = useState(null)


    const navigate = useNavigate()

    const modalBoxRef = useRef()
    const descToolsRef = useRef()
    const elDescInputRef = useRef()

    const elCommentRef = useRef()
    const elCommentInputRef = useRef()
    const commentBtnRef = useRef()

    var group = useRef()
    group.current = groupId ? board?.groups?.find(g => g.id === groupId) : null

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
        } catch {
            errorRedirect()
        }
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

    function onSaveComment() {
        const value = elCommentInputRef.current.value
        if (!value.length) return

        // TODO:  move to service
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

    async function onRemoveAttachment(ev, attachment) {
        ev.stopPropagation()
        const attachments = [...taskToEdit.attachments?.filter(attach => attach.id !== attachment.Id)]
        taskToEdit.attachments = attachments

        let action = `Removed attachment ${attachment.filename} from card ${taskToEdit.title}.`

        const activity = boardService.getActivity(user, { id: taskToEdit.id, title: taskToEdit.title }, action)
        await saveTask(board._id, groupId, taskToEdit, activity)
        store.dispatch({ type: SET_ACTIVE_BOARD, board })
    }

    async function onRemoveFromCard(member) {

        let action = 'Removed member ' + member.fullname + ' from board members.'
        taskToEdit.memberIds = taskToEdit.memberIds?.filter(memberId => memberId !== member._id)

        const activity = boardService.getActivity(user, { id: taskToEdit.id, title: taskToEdit.title }, action)
        await saveTask(board._id, groupId, taskToEdit, activity)
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

    return (!taskToEdit || !group.current) ? <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" /> : <>
        <section className="task-window flex" onClick={closePage}>
            <section className="task-details" onClick={closeModal}>

                <div className="task-header">
                    <IconHeader className="header-icon task-icon" /><input type='text' className="task-title" defaultValue={taskToEdit.title} onFocus={handleEdit} onBlur={handleEdit} data-type='header' />
                    <p className="header-subtitle">in list <span style={{ textDecoration: 'underline' }}>{group.current.title}</span></p>
                </div>

                <section className="task-main-col">
                    <section className="task-info flex row">
                        {taskToEdit?.memberIds?.length > 0 && <MemberList members={board.members?.filter(member => taskToEdit.memberIds?.includes(member._id))} toggleModal={toggleModal} />}
                        {taskToEdit?.labelIds?.length > 0 && <LabelList board={board} task={taskToEdit} toggleModal={toggleModal} />}
                    </section>


                    <div className="task-description-box flex column">
                        <GrTextAlignFull className="desc-icon task-icon" />

                        <div className="description-header"> <span className="title-main-col">Description</span> </div>

                        <textarea ref={elDescInputRef} className={taskToEdit.description?.length > 0 ? "task-description filled" : "task-description"}
                            placeholder={'Add a more detailed description...'} defaultValue={taskToEdit.description} onFocus={handleEdit} onBlur={handleEdit} data-type='desc' />

                        <div ref={descToolsRef} className="description-editor-tools">
                            <button className="save-btn" onClick={onSaveDescription}>Save</button>
                            <button className="cancel-btn">Cancel</button>
                        </div>
                    </div>

                    {taskToEdit?.attachments?.length > 0 &&

                        <div className="task-attachment-box flex column">
                            <RiAttachment2 className="attach-icon task-icon" />
                            <div className="activity-header"> <span className="title-main-col">Attachments</span> </div>

                            <AttachmentList task={taskToEdit} toggleModal={toggleModal} groupId={groupId} onRemoveAttachment={onRemoveAttachment} />
                            <a className='button-link add-attachment' href='#' onClick={(ev) => toggleModal(ev, MODAL_ATTACH)}>Add an attachment</a>
                        </div>
                    }

                    <div className="task-activity-box flex column">
                        <FiList className="activity-icon task-icon" />
                        <div className="activity-header"><span className="title-main-col">Activity</span></div>

                        <img className="user-logo" src={user.imgUrl ? user.imgUrl : 'https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png'} />
                        <div className="task-activity" ref={elCommentRef}>
                            <textarea ref={elCommentInputRef} className="task-activity-input" placeholder={'Write a comment...'} data-type='comment' onFocus={handleEdit} onBlur={handleEdit} />
                            <button onClick={onSaveComment} className="save-btn comment-btn" ref={commentBtnRef}>Save</button>
                        </div>

                        {<CommentList task={taskToEdit} />}
                    </div>
                </section>

                <TaskDetailsSideBar modal={toggleModal} />

            </section>

        </section >
        <div ref={modalBoxRef} className='modal-container'>
            {
                modalData && <Modal cmpProps={modalData.props} cmpType={modalData.cmpType} className={modalData.className} />
            }
        </div>
    </>
}