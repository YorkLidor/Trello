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
import { Modal, MODAL_LABELS } from "../cmps/modal/modal";
import { utilService } from "../services/util.service";
import { closeModal, toggleModal } from "../store/actions/app.actions";

export function Board() {
    const user = useSelector(state => state.userModule.user)
    const board = useSelector(state => state.boardModule.board)
    const taskQuickEdit = useSelector((storeState) => storeState.appModule.taskQuickEdit)

    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const [modal, setModal] = useState(null)
    const elModal = useRef()

    const { boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/')
        loadBoard()
        setModal(modalService.addNewModal(modals))

        return async () => {
            await board && saveBoard(board)
            setBoard(null)
        }
    }, [])

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

    function onToggleModal(element, modalType, groupId, task, extras = null) {
        if (!modal) return

        let props
        if (modalType === MODAL_LABELS) props = { groupId, task }

        const pos = utilService.getElementPosition(element.current)
        elModal.current.style.top = pos.top + 'px'
        elModal.current.style.left = pos.right + 'px'

        if (window.visualViewport.width < 550) {
            elModal.current.style.left = '0px'
            elModal.current.style.top = '0px'
        }

        setModal(modalService.setModalData(modals, modal.id, modalType, props))
        toggleModal(modals, modal.id)

    }

    if (!board || !board._id) return <Loader />
    else return <main
        className="board flex column"
        style={board.style}
    >
        <BoardHeader
            board={board}
            onDeleteBoard={onDeleteBoard}
        />
        <GroupList
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
}