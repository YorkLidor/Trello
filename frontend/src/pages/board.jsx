import { useEffect, useRef, useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { boardService } from "../services/board.service";

import { setBoard } from "../store/actions/board.actions";

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { useSelector } from "react-redux";
import { TaskQuickEdit } from "../cmps/task-quick-edit";
import { modalService } from "../services/modal.service";
import { Modal, MODAL_GROUP_QUICK_EDIT, MODAL_LABELS, MODAL_MEMBERS, MODAL_MEMBER_OPEN, MODAL_TASK_COVER, MODAL_TASK_DATE } from "../cmps/modal/modal";
import { utilService } from "../services/util.service";
import { closeModal, toggleModal } from "../store/actions/app.actions";
import { Spinner } from "../cmps/spinner";
import { socketService, SOCKET_EMIT_SET_BOARD, SOCKET_EVENT_ADD_GROUP, SOCKET_EVENT_ADD_TASK, SOCKET_EVENT_UPDATE_BOARD } from "../services/socket.service";
import { setThemeColor } from "../services/color.service";

export function Board() {
    const user = useSelector(state => state.userModule.user)
    const board = useSelector(state => state.boardModule.board)
    const taskQuickEdit = useSelector((storeState) => storeState.appModule.taskQuickEdit)

    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const [modal, setModal] = useState(null)
    const elModal = useRef()

    const elBoard = useRef()

    const { boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/')
        loadBoard()
        setModal(modalService.addNewModal(modals))

        return async () => {
            turnOffSockets()
            setBoard(null)
            document.body.style.backgroundColor = "unset"
            document.body.style.backgroundImage = "unset"
        }
    }, [])


    useEffectUpdate(() => {
        document.body.style.backgroundColor = board?.style?.backgroundColor
        document.body.style.backgroundImage = board?.style?.backgroundImage
        setThemeColor(board?.style)
    }, [board])

    function setSocketListeners() {
        socketService.on(SOCKET_EVENT_ADD_TASK, onIncomingNewTask)
        socketService.on(SOCKET_EVENT_ADD_GROUP, onIncomingNewGroup)
        socketService.on(SOCKET_EVENT_UPDATE_BOARD, console.log)
    }

    function turnOffSockets() {
        socketService.off(SOCKET_EVENT_ADD_TASK, onIncomingNewTask)
        socketService.off(SOCKET_EVENT_ADD_GROUP, onIncomingNewGroup)
        socketService.off(SOCKET_EVENT_UPDATE_BOARD, console.log)
    }

    function onIncomingNewTask({ task, groupId }) {
        const groupToEdit = board.groups.find(group => groupId === group.id)
        console.log('groupToEdit', groupToEdit)
        groupToEdit.tasks.push({ ...task })
        setBoard({ ...board })
    }

    function onIncomingNewGroup(group) {
        board.groups.push(group)
        setBoard(board)
    }

    async function onDeleteBoard() {
        const isWantDelete = window.confirm('Are you sure?')
        if (!isWantDelete) return
        try {
            await boardService.removeBoard(boardId)
            navigate('/workspace')
        } catch (err) {
            console.error('somthing went wrong', err)
        }
    }

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            socketService.emit(SOCKET_EMIT_SET_BOARD, board._id)
            setSocketListeners()
            setBoard(board)
        } catch (err) {
            navigate('/workspace')
            console.error('No Board!', err)
        }
    }

    function onCloseModal(ev = null) {
        if (ev) ev.stopPropagation()

        if (!modal?.id) return
        closeModal(modals, modal.id)
    }

    function onToggleModal(ev, modalType, { board, groupId, task, member, onRemoveGroup, onCopyGroup }) {
        if (!modal) return
        let element
        if (ev) {
            ev.stopPropagation()
            element = ev.target
        }
        if (ev?.target.dataset?.type === 'icon' || modalType === MODAL_MEMBER_OPEN) element = ev.target.parentNode

        let props
        let pos = utilService.getElementPosition(element)

        switch (modalType) {
            case MODAL_LABELS:
            case MODAL_MEMBERS:
                props = { groupId, task }
                elModal.current.style.top = pos.top + 'px'
                elModal.current.style.left = pos.left + 'px'
                break
            case MODAL_MEMBER_OPEN:
                props = { member, user, boardId, groupId }
                elModal.current.style.top = pos.bottom + 'px'
                elModal.current.style.right = '4px'
                break
            case MODAL_TASK_COVER:
            case MODAL_TASK_DATE:
                props = { user, boardId, groupId, task }
                elModal.current.style.top = pos.top + 'px'
                elModal.current.style.left = pos.left + 'px'
                break
            case MODAL_GROUP_QUICK_EDIT:
                props = { board, groupId, onRemoveGroup, onCopyGroup }
                elModal.current.style.top = pos.bottom + 'px'
                elModal.current.style.left = pos.left + 'px'
                break
            default:
                break
        }

        if (window.visualViewport.width < 550 && modalType !== MODAL_MEMBER_OPEN) {
            elModal.current.style.left = '0px'
            elModal.current.style.top = '0px'
            elModal.current.style.right = '0px'
            elModal.current.style.bottom = '0px'
        }

        if (window.visualViewport.height - pos.top < 500) {
            elModal.current.style.top = 'unset'
            elModal.current.style.bottom = '14px'
        }

        setModal(modalService.setModalData(modals, modal.id, modalType, props))
        console.log('modal:', modal, "props", props)
        toggleModal(modals, modal.id)
    }

    if (!board || !board._id) return <Spinner />
    else return <div className="board-container">
        <main
            className="board flex column"
            ref={elBoard}
        >
            <BoardHeader
                board={board}
                onDeleteBoard={onDeleteBoard}
                onToggleModal={onToggleModal}
            />
            <GroupList
                onToggleModal={onToggleModal}
            />
            <>
                <Outlet />
            </>

            {taskQuickEdit && <TaskQuickEdit
                task={taskQuickEdit.task}
                groupId={taskQuickEdit.groupId}
                pos={taskQuickEdit.pos}
                onToggleModal={onToggleModal}
                onCloseModal={onCloseModal}
            />}


            <div ref={elModal} className='modal-container'>
                {
                    modal?.isOpen && <>
                        <Modal
                            modal={modal}
                            cmpProps={modal.modalData.props}
                            cmpType={modal.modalData.cmpType}
                            className={modal.modalData.className}
                        />
                        <div className="all-screen-modal" onClick={() => closeModal(modals, modal.id)}>
                        </div>
                    </>
                }
            </div>
        </main>
        {/* <section className="board-menu">

        </section> */}
    </div>
}