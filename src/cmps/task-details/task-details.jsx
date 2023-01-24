import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { utilService } from '../../services/util.service'
import { boardService } from "../../services/board.service"
import { useSelector } from "react-redux"

import { store } from "../../store/store"
import { closeModal, toggleModal } from "../../store/actions/app.actions"
import { saveBoard } from '../../store/actions/board.actions'

import { SET_ACTIVE_BOARD } from "../../store/reducers/board.reducer"

import {
    MODAL_ATTACH, MODAL_LABELS, MODAL_ATTACH_EDIT,
    MODAL_ATTACH_OPEN, MODAL_MEMBERS, MODAL_MEMBER_OPEN
} from '../modal/modal.jsx'

import { AttachmentList } from "./attachment/attachment-list"
import { MemberList } from "./member-list"
import { LabelList } from "./label/label-list"
import { Blocks } from "react-loader-spinner"
import { Modal } from "../modal/modal"
import { Activity } from "./activity"
import { TaskDetailsSideBar } from "./task-details-sidebar"
import { TaskDescription } from "./task-description"

import { IoClose } from "react-icons/io5"
import { FaPager as IconHeader } from 'react-icons/fa'
import { RiAttachment2 } from 'react-icons/ri'
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { useEffectInit } from "../../customHooks/useEffectInit"
import { modalService } from "../../services/modal.service"

export function TaskDetails() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [modal, setModal] = useState(null)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const { boardId, groupId, taskId } = useParams()
    const navigate = useNavigate()

    const modalBoxRef = useRef()

    var group = groupId ? board?.groups?.find(g => g.id === groupId) : null

    useEffectInit(() => {
        if (!boardId || !groupId || !taskId) return errorRedirect()
        loadBoard()
        setModal(modalService.addNewModal())
    }, [])


    useEffectUpdate(() => {
        if (board && taskToEdit && group) {
            group.tasks = [...group.tasks.filter(task => task.id !== taskToEdit.id), taskToEdit]
            const newBoard = { ...board, groups: board.groups.map(grp => grp.id === group.id ? group : grp) }
            saveBoard(newBoard)
        }
    }, [taskToEdit])


    async function loadBoard() {
        try {
            const boardModel = board ? { ...board } : await boardService.getById(boardId)

            group = boardModel.groups.find(group => group.id === groupId)
            if (!group) return errorRedirect()


            const task = group.tasks.find(task => task.id === taskId)
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
        if (modal?.isOpen) onCloseModal()
        else {
            modalService.removeModal(modal.id)
            navigate(`/${boardId}`)
        }
    }

    function onCloseModal(ev = null) {
        if (ev) ev.stopPropagation()

        if (!modal?.id) return
        closeModal(modal.id)
    }

    function handleEditHeader(ev) {
        const { target } = ev
        target.classList.toggle('is-editing')

        if (ev.type === 'blur') {
            const val = target.value
            setTaskToEdit({ ...taskToEdit, title: val })
        }
    }

    // Toggle modal visibility and set it's pos under element
    function toggleModal(ev, modalType, ex = null) {
        if (!modal) return
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
        else if (modalType === MODAL_ATTACH_OPEN) props = { user, boardId, groupId, task: taskToEdit, attachment: ex.attachment }
        else if (modalType === MODAL_MEMBERS) props = { groupId, task: taskToEdit }
        else if (modalType === MODAL_MEMBER_OPEN) props = { member: ex.member, user, boardId, groupId, task: taskToEdit }

        const pos = utilService.getElementPosition(element)
        modalBoxRef.current.style.top = pos.bottom + 'px'
        modalBoxRef.current.style.left = pos.left + 'px'

        // setModal(setModalData(modal.id, modalType, props))
    }

    return (!taskToEdit || !group) ? <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" /> : <>
        <section className="task-window flex" onMouseDown={onCloseModal}>

            <section className="task-details" onClick={onCloseModal} onMouseDown={(ev) => ev.stopPropagation()}>


                <div className="task-header">
                    <IconHeader className="header-icon task-icon" /><input type='text' className="task-title" defaultValue={taskToEdit.title} onFocus={handleEditHeader} onBlur={handleEditHeader} />
                    <p className="header-subtitle">in list <span style={{ textDecoration: 'underline' }}>{group.title}</span></p>
                </div>

                <section className="task-main-col">
                    <section className="task-info flex row">
                        {taskToEdit?.memberIds?.length > 0 && <MemberList members={board.members?.filter(member => taskToEdit.memberIds?.includes(member._id))} toggleModal={toggleModal} />}
                        {taskToEdit?.labelIds?.length > 0 && <LabelList board={board} task={taskToEdit} toggleModal={toggleModal} />}
                    </section>

                    <TaskDescription user={user} groupId={groupId} task={taskToEdit} />

                    {taskToEdit?.attachments?.length > 0 &&
                        <div className="task-attachment-box flex column">
                            <RiAttachment2 className="attach-icon task-icon" />
                            <div className="activity-header"> <span className="title-main-col">Attachments</span> </div>

                            <AttachmentList task={taskToEdit} toggleModal={toggleModal} groupId={groupId} user={user} boardId={boardId} />
                            <a className='button-link add-attachment' href='#' onClick={(ev) => toggleModal(ev, MODAL_ATTACH)}>Add an attachment</a>
                        </div>
                    }

                    <Activity user={user} boardId={boardId} groupId={groupId} taskToEdit={taskToEdit} />
                </section>

                <TaskDetailsSideBar modal={toggleModal} />
                <button className='close-task-details'>
                    <IoClose onClick={closePage} />
                </button>
            </section>

        </section >
        <div ref={modalBoxRef} className='modal-container'>
            {
                modal.isOpen && <Modal id={modal.id} cmpProps={modal.modalData.props} cmpType={modal.modalData.cmpType} className={modal.modalData.className} />
            }
        </div>
    </>
}