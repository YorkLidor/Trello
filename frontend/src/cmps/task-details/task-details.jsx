import { useSelector } from "react-redux"
import { store } from "../../store/store"

import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { utilService } from '../../services/util.service'
import { boardService } from "../../services/board.service"
import { modalService } from "../../services/modal.service"

import { closeModal, toggleModal } from "../../store/actions/app.actions"
import { saveBoard } from '../../store/actions/board.actions'

import { SET_ACTIVE_BOARD } from "../../store/reducers/board.reducer"

import {
    MODAL_ATTACH, MODAL_LABELS, MODAL_ATTACH_EDIT, MODAL_CHECKLIST, MODAL_TODO, MODAL_REMOVE_COMMENT, MODAL_TASK_MOVE,
    MODAL_ATTACH_OPEN, MODAL_MEMBERS, MODAL_MEMBER_OPEN, MODAL_TASK_DATE, MODAL_TASK_COVER, MODAL_CHECKLIST_DELETE, MODAL_TASK_COPY
} from '../modal/modal.jsx'

import { AttachmentList } from "./attachment/attachment-list"
import { MemberList } from "./member-list"
import { LabelList } from "./label/label-list"
import { Spinner } from '../spinner'
import { Modal } from "../modal/modal"
import { Activity } from "./activity"
import { TaskDetailsSideBar } from "./task-details-sidebar"
import { TaskDescription } from "./task-description"
import { TaskDate } from "../task-date"
import { TaskCover } from "./task-cover"
import { Checklists } from "./checklist/checklists"
import { FastAverageColor } from "fast-average-color"

import { IoClose } from "react-icons/io5"
import { FaPager as IconHeader } from 'react-icons/fa'
import { RiAttachment2 as IconAttachment } from 'react-icons/ri'
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { useEffectInit } from "../../customHooks/useEffectInit"



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
        try {

            if (!boardId || !groupId || !taskId) return errorRedirect()
            loadBoard()
            setModal(modalService.addNewModal(modals))

            return () => setStyle({ '--cover-color': '#ffff' })
        }
        catch (err) {
            console.error('Failed load task details')
            errorRedirect()
        }
    }, [])

    useEffectUpdate(() => {
        try {

            if (board && taskToEdit && group) {
                const taskIdx = group.tasks.findIndex(task => task.id === taskToEdit.id)
                group.tasks[taskIdx] = taskToEdit
                const newBoard = board
                saveBoard(newBoard)
            }
        }
        catch (err) {
            console.error('failed save task details')
        }
    }, [taskToEdit])

    useEffectUpdate(() => {
        try {
            if (modalBoxRef.current && modal) {
                const windowWidth = window.visualViewport.width
                const windowHeight = window.visualViewport.height
                const modalPos = utilService.getElementPosition(modalBoxRef.current)

                if (modalPos.right > windowWidth) modalBoxRef.current.style.left = (modalPos.left - (modalPos.right - windowWidth) - 20) + 'px'
                else if (modalPos.left < 0) modalBoxRef.current.style.left = '10px'

                if (modalPos.bottom > windowHeight) modalBoxRef.current.style.top = (modalPos.top - (modalPos.bottom - windowHeight) - 20) + 'px'
                else if (modalPos.top < 0) modalBoxRef.current.style.top = '10px'
            }
        }
        catch (err) {
            console.error('Failed update modal position')
        }
    }, [modals])

    useEffectUpdate(() => {
        try {
            setThemeColor()
        }
        catch (err) {
            console.error('Failed change theme color')
        }
    }, [board])

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
        try {
            modalService.removeModal(modals, modal.id)
        }
        catch (err) {
            console.error('Failed remove modal')
        }
        console.log('ERROR: errors occured. Redirected back to workspace.')
        navigate('/workspace')
    }

    function closePage() {
        try {
            if (modal?.isOpen) onCloseModal()
            else {
                modalService.removeModal(modals, modal.id)
            }
        }
        catch (err) {
            console.log('Failure while closing modal')
        }
        navigate(`/${boardId}`)
    }

    function onCloseModal(ev = null) {
        try {
            if (ev) ev.stopPropagation()

            if (!modal?.id) return
            closeModal(modals, modal.id)
        }
        catch (err) {
            console.error('Failed to close modal')
        }
    }

    function handleEditHeader(ev) {
        try {

            const { target } = ev
            target.classList.toggle('is-editing')

            if (ev.type === 'blur') {
                const val = target.value
                setTaskToEdit({ ...taskToEdit, title: val })
            }
        }
        catch (err) {
            console.error('Failed handle changes in header')
        }
    }

    // Toggle modal visibility and set it's pos under element
    function onToggleModal(ev, modalType, extras = null) {
        try {
            if (!modal) return
            let element
            if (ev) {
                ev.stopPropagation()
                element = ev.target
            }
            if (ev?.target.dataset?.type === 'icon') element = ev.target.parentNode

            let cmpProps
            switch (modalType) {
                case MODAL_TASK_COVER:
                case MODAL_CHECKLIST:
                case MODAL_TASK_DATE:
                case MODAL_TASK_MOVE:
                    cmpProps = { user, groupId, task: taskToEdit, modals }
                    break
                case MODAL_TASK_COPY:
                    cmpProps = { user, groupId, task: taskToEdit, modals, isCopy: true}
                    break
                case MODAL_CHECKLIST_DELETE:
                    cmpProps = { user, groupId, task: taskToEdit, checklist: extras.checklist }
                    break
                case MODAL_MEMBERS:
                case MODAL_LABELS:
                case MODAL_ATTACH:
                    cmpProps = { groupId, task: taskToEdit }
                    break
                case MODAL_ATTACH_EDIT:
                    cmpProps = { groupId, task: taskToEdit, attachment: extras.attachment }
                    break
                case MODAL_ATTACH_OPEN:
                    cmpProps = { user, boardId, groupId, task: taskToEdit, attachment: extras.attachment }
                    break
                case MODAL_MEMBER_OPEN:
                    cmpProps = { member: extras.member, user, groupId, task: taskToEdit }
                    break
                case MODAL_TODO:
                    cmpProps = { user, groupId, task: taskToEdit, todo: extras.todo, checklist: extras.checklist }
                    break
                case MODAL_REMOVE_COMMENT:
                    cmpProps = { user, groupId, task: taskToEdit, comment: extras.comment }
                    break
                default:
                    break
            }

            const pos = utilService.getElementPosition(element)
            modalBoxRef.current.style.top = pos.bottom + 'px'
            modalBoxRef.current.style.left = pos.left + 'px'

            if (window.visualViewport.width < 550) {
                modalBoxRef.current.style.left = '0px'
                modalBoxRef.current.style.top = '0px'
            }

            setModal(modalService.setModalData(modals, modal.id, modalType, cmpProps))
            toggleModal(modals, modal.id)
        }
        catch (err) {
            console.error('Failed set modal data and load it.')
        }
    }

    async function setThemeColor() {
        try {

            if (!taskToEdit.cover) return
            const { style } = taskToEdit.cover
            let sourceColor
            let color
            if (style.backgroundImage) {
                sourceColor = style.backgroundImage.slice(4, -1).replace(/"/g, "")
                try {
                    color = await fac.getColorAsync(sourceColor);
                    setStyle({ '--cover-color': color.rgba })
                } catch (err) {
                    console.error(err);
                    setStyle({ '--cover-color': '#ffff' })
                }
            }
        }
        catch (err) {
            console.error('Failed to set theme color')
        }
    }

    return (!taskToEdit || !group) ? <Spinner /> : <>
        <section className="task-window flex" onMouseDown={closePage} style={style}>

            <section className="task-details" onClick={onCloseModal} onMouseDown={(ev) => ev.stopPropagation()}>
                <TaskCover task={taskToEdit} onToggleModal={onToggleModal} />

                <div className="task-header">
                    <IconHeader
                        className="header-icon task-icon"
                    />
                    <input type='text'
                        className="task-title"
                        defaultValue={taskToEdit.title}
                        onFocus={handleEditHeader}
                        onBlur={handleEditHeader}
                    />
                    <p
                        className="header-subtitle"
                    >
                        <span className='board-name' >{board.title} </span>in list <span className='group-name' onClick={(ev) => onToggleModal(ev, MODAL_TASK_MOVE)}>{group.title}</span>
                    </p>
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
                    <Checklists task={taskToEdit} user={user} groupId={groupId} onToggleModal={onToggleModal} />
                    <Activity user={user} boardId={boardId} groupId={groupId} taskToEdit={taskToEdit} onToggleModal={onToggleModal} />
                </section>

                <TaskDetailsSideBar task={taskToEdit} onToggleModal={onToggleModal} />
                <button onClick={closePage} className={taskToEdit.cover ? 'close-task-details on-cover' : 'close-task-details'}>
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