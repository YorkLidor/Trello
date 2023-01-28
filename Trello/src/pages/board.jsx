import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { boardService } from "../services/board.service";

import { saveBoard, setBoard } from "../store/actions/board.actions";

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";

import { Audio } from 'react-loader-spinner'
import { useSelector } from "react-redux";
import { TaskQuickEdit } from "../cmps/task-quick-edit";
import { modalService } from "../services/modal.service";
import { Modal, MODAL_GROUP_QUICK_EDIT, MODAL_LABELS, MODAL_MEMBERS, MODAL_MEMBER_OPEN, MODAL_TASK_COVER, MODAL_TASK_DATE } from "../cmps/modal/modal";
import { utilService } from "../services/util.service";
import { closeModal, toggleModal } from "../store/actions/app.actions";
import { FastAverageColor } from "fast-average-color";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { Spinner } from "../cmps/spinner";

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
            await board && saveBoard(board)
            setBoard(null)
            document.body.style.backgroundColor = "unset"
            document.body.style.backgroundImage = "unset"
        }
    }, [])

    useEffectUpdate(() => {
        document.body.style.backgroundColor = board?.style?.backgroundColor
        document.body.style.backgroundImage = board?.style?.backgroundImage
    }, [board])

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
            saveBoard(board)
        } catch (err) {
            navigate('/workspace')
            console.error('No Board!', err)
        }
    }

    function Loader() {
        return <main className="board flex column justify-center">
            <Audio
                height="100"
                width="100"
                color="#091e4214"
                ariaLabel="audio-loading"
                wrapperStyle={{ margin: '0 auto' }}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </main >
    }

    function onCloseModal(ev = null) {
        if (ev) ev.stopPropagation()

        if (!modal?.id) return
        closeModal(modals, modal.id)
    }

    function onToggleModal(ev, modalType, { groupId, task, member }) {
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
                break;
            case MODAL_MEMBER_OPEN:
                props = { member, user, boardId, groupId }
                elModal.current.style.top = pos.bottom - 6 + 'px'
                elModal.current.style.right = '4px'
                break;
            case MODAL_TASK_COVER:
                props = { user, boardId, groupId, task }
                elModal.current.style.top = pos.top + 'px'
                elModal.current.style.left = pos.left + 'px'
                break;
            case MODAL_TASK_DATE:
                props = { user, boardId, groupId, task }
                elModal.current.style.top = pos.top + 'px'
                elModal.current.style.left = pos.left + 'px'
                break;
            case MODAL_GROUP_QUICK_EDIT:
                props = { groupId }
                elModal.current.style.top = pos.top + 'px'
                elModal.current.style.left = pos.left + 'px'
                console.log('props:', props)
                break;
            default:
                break;
        }




        if (window.visualViewport.width < 550) {
            elModal.current.style.left = '0px'
            elModal.current.style.top = '0px'
        }

        setModal(modalService.setModalData(modals, modal.id, modalType, props))
        console.log('modal:', modal,"props", props)
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
                    modal?.isOpen && <Modal
                        modal={modal}
                        cmpProps={modal.modalData.props}
                        cmpType={modal.modalData.cmpType}
                        className={modal.modalData.className}
                    />
                }
            </div>
        </main>
        {/* <section className="board-menu">

        </section> */}
    </div>
}