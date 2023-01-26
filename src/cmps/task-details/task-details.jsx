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
    MODAL_ATTACH, MODAL_LABELS, MODAL_ATTACH_EDIT, MODAL_CHECKLIST,
    MODAL_ATTACH_OPEN, MODAL_MEMBERS, MODAL_MEMBER_OPEN, MODAL_TASK_DATE, MODAL_TASK_COVER
} from '../modal/modal.jsx'

import { AttachmentList } from "./attachment/attachment-list"
import { MemberList } from "./member-list"
import { LabelList } from "./label/label-list"
import { Blocks } from "react-loader-spinner"
import { Modal } from "../modal/modal"
import { Activity } from "./activity"
import { TaskDetailsSideBar } from "./task-details-sidebar"
import { TaskDescription } from "./task-description"
import { TaskDate } from "../task-date"

import { IoClose } from "react-icons/io5"
import { FaPager as IconHeader } from 'react-icons/fa'
import { RiAttachment2 as IconAttachment } from 'react-icons/ri'
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { useEffectInit } from "../../customHooks/useEffectInit"
import { modalService } from "../../services/modal.service"
import { TaskCover } from "./task-cover"
import { Checklists } from "./checklist/checklists"
import { FastAverageColor } from "fast-average-color"
import { useEffect } from "react"

export function TaskDetails() {
    const fac = new FastAverageColor()
    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const [modal, setModal] = useState(null)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [style, setStyle] = useState({})

    const { boardId, groupId, taskId } = useParams()
    const navigate = useNavigate()

    const modalBoxRef = useRef()

    let group = groupId ? board?.groups?.find(g => g.id === groupId) : null

    useEffectInit(() => {
        if (!boardId || !groupId || !taskId) return errorRedirect()
        loadBoard()
        setModal(modalService.addNewModal(modals))

        return () => setStyle({ '--cover-color': '#ffff' })
    }, [])

    useEffectUpdate(() => {
        if (board && taskToEdit && group) {
            const taskIdx = group.tasks.findIndex(task => task.id === taskToEdit.id)
            group.tasks[taskIdx] = taskToEdit
            const newBoard = board
            saveBoard(newBoard)

        }
    }, [taskToEdit])

    useEffect(() => {
        if (board) setThemeColor()
    }, [board])

    useEffectUpdate(() => {
        if (modalBoxRef.current && modal) {
            const windowWidth = window.visualViewport.width
            const windowHeight = window.visualViewport.height
            const modalPos = utilService.getElementPosition(modalBoxRef.current)

            if (modalPos.right > windowWidth) modalBoxRef.current.style.left = (modalPos.left - (modalPos.right - windowWidth) - 20) + 'px'
            else if (modalPos.left < 0) modalBoxRef.current.style.left = '10px'

            if (modalPos.bottom > windowHeight) modalBoxRef.current.style.top = (modalPos.top - (modalPos.bottom - windowWidth) - 20) + 'px'
            else if (modalPos.top < 0) modalBoxRef.current.style.top = '10px'
        }
    }, [modals])

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
        modalService.removeModal(modals, modal.id)
        return navigate('/workspace')
    }

    function closePage() {
        if (modal?.isOpen) onCloseModal()
        else {
            modalService.removeModal(modals, modal.id)
            navigate(`/${boardId}`)
        }
    }

    function onCloseModal(ev = null) {
        if (ev) ev.stopPropagation()

        if (!modal?.id) return
        closeModal(modals, modal.id)
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
    function onToggleModal(ev, modalType, extras = null) {
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
        else if (modalType === MODAL_ATTACH_EDIT) props = { boardId, groupId, task: taskToEdit, attachment: extras.attachment }
        else if (modalType === MODAL_ATTACH_OPEN) props = { user, boardId, groupId, task: taskToEdit, attachment: extras.attachment }
        else if (modalType === MODAL_MEMBERS) props = { groupId, task: taskToEdit }
        else if (modalType === MODAL_MEMBER_OPEN) props = { member: extras.member, user, boardId, groupId, task: taskToEdit }
        else if (modalType === MODAL_TASK_DATE) props = { user, boardId, groupId, task: taskToEdit }
        else if (modalType === MODAL_TASK_COVER) props = { user, boardId, groupId, task: taskToEdit }
        else if (modalType === MODAL_CHECKLIST) props = { user, boardId, groupId, task: taskToEdit, modals }

        const pos = utilService.getElementPosition(element)
        modalBoxRef.current.style.top = pos.bottom + 'px'
        modalBoxRef.current.style.left = pos.left + 'px'

        if (window.visualViewport.width < 550) {
            modalBoxRef.current.style.left = '0px'
            modalBoxRef.current.style.top = '0px'
        }

        setModal(modalService.setModalData(modals, modal.id, modalType, props))
        toggleModal(modals, modal.id)

    }


    async function setThemeColor() {
        if (!taskToEdit.cover) return
        const { style } = taskToEdit.cover
        let sourceColor
        let color
        if (style.backgroundImage) {
            sourceColor = style.backgroundImage.slice(4, -1).replace(/"/g, "")
            console.log('sourceColor:', sourceColor)
            try {
                color = await fac.getColorAsync(sourceColor);
                setStyle({ '--cover-color': color.rgba })
            } catch (err) {
                console.log(err);
                setStyle({ '--cover-color': '#ffff' })
            }
        }
    }

    return (!taskToEdit || !group) ? <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" /> : <>
        <section className="task-window flex" onMouseDown={closePage} style={style}>

            <section className="task-details" onClick={onCloseModal} onMouseDown={(ev) => ev.stopPropagation()}>
                <TaskCover task={taskToEdit} onToggleModal={onToggleModal} />

                <div className="task-header">
                    <IconHeader className="header-icon task-icon" /><input type='text' className="task-title" defaultValue={taskToEdit.title} onFocus={handleEditHeader} onBlur={handleEditHeader} />
                    <p className="header-subtitle"><span className='board-name'>{board.title} </span>in list <span className='group-name'>{group.title}</span></p>
                </div>

                <section className="task-main-col">
                    <section className="task-info flex row">
                        {taskToEdit?.memberIds?.length > 0 && <MemberList members={board.members?.filter(member => taskToEdit.memberIds?.includes(member._id))} toggleModal={onToggleModal} />}
                        {taskToEdit?.labelIds?.length > 0 && <LabelList board={board} task={taskToEdit} toggleModal={onToggleModal} />}
                        {taskToEdit?.dueDate && <TaskDate task={taskToEdit} onToggleModal={onToggleModal} />}
                    </section>

                    <TaskDescription user={user} groupId={groupId} task={taskToEdit} />

                    {taskToEdit?.attachments?.length > 0 &&
                        <div className="task-attachment-box flex column">
                            <IconAttachment className="attach-icon" />
                            <div className="attachment-header"> <span className="title-main-col">Attachments</span> </div>

                            <div className="attach-list-box">
                                <AttachmentList task={taskToEdit} toggleModal={onToggleModal} groupId={groupId} user={user} boardId={boardId} />
                            </div>
                            <a className='button-link add-attachment' href='#' onClick={(ev) => onToggleModal(ev, MODAL_ATTACH)}>Add an attachment</a>
                        </div>
                    }
                    <Checklists task={taskToEdit} user={user} groupId={groupId} />
                    <Activity user={user} boardId={boardId} groupId={groupId} taskToEdit={taskToEdit} />
                </section>

                <TaskDetailsSideBar task={taskToEdit} onToggleModal={onToggleModal} />
                <button onClick={closePage} className='close-task-details'>
                    <IoClose />
                </button>
            </section>

        </section >
        <div ref={modalBoxRef} className='modal-container'>
            {
                modal.isOpen && <Modal
                    modal={modal}
                    cmpProps={modal.modalData.props}
                    cmpType={modal.modalData.cmpType}
                    className={modal.modalData.className}
                />
            }
        </div>
    </>
}