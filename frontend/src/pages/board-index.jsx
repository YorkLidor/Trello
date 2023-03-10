import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BoardPreview } from "../cmps/board-preview"
import { Audio } from 'react-loader-spinner'

import { loadBoards, saveBoard, setBoard, addBoard } from "../store/actions/board.actions"

import { BOARD_CREATOR, Modal } from "../cmps/modal/modal"
import { useEffectInit } from "../customHooks/useEffectInit"
import { modalService } from "../services/modal.service"
import { utilService } from "../services/util.service"
import { closeModal, toggleModal } from "../store/actions/app.actions"
import { boardService } from "../services/board.service"
import { userService } from "../services/user.service"

import { FaRegStar } from "react-icons/fa"
import { BsPerson } from 'react-icons/bs'
import { Spinner } from "../cmps/spinner"
import { setThemeColor } from "../services/color.service"
import { socketService, SOCKET_EMIT_SET_BOARD, SOCKET_EVENT_ADD_BOARD } from "../services/socket.service"

export function BoardIndex() {
    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.user)
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const boards = useSelector(state => state.boardModule.boards)
    const [modal, setModal] = useState(null)
    const elModal = useRef()

    useEffectInit(() => {
        socketService.emit(SOCKET_EMIT_SET_BOARD, 'workspace')
        socketService.on(SOCKET_EVENT_ADD_BOARD, addBoard)
        setThemeColor()
        setModal(modalService.addNewModal(modals))

        return () => { socketService.off(SOCKET_EVENT_ADD_BOARD, addBoard) }
    }, [])

    useEffect(() => {
        if (!user) navigate('/')
        onLoadBoards()
        return onCloseModal
    }, [])

    useEffect(() => {

    }, [])


    function onToggleStaredBoard(ev, board) {
        ev.stopPropagation()
        const boardToSave = { ...board, isStarred: !board.isStarred }
        onSaveBoard(boardToSave)
    }

    function getStaredBoards() {
        return boards.filter(board => board.isStarred)
    }

    async function onLoadBoards() {
        try {
            await loadBoards()
        } catch (err) {
            console.error('something went wrong!', err.message)
        }
    }

    function onCloseModal(ev = null) {
        if (ev) ev.stopPropagation()

        if (!modal?.id) return
        closeModal(modals, modal.id)
    }

    async function loadBoard(boardId) {
        try {
            const board = await boardService.getById(boardId)
            saveBoard(board)
            navigate(`/${boardId}`)
        } catch (err) {
            console.error('No Board!', err)
        }
    }

    function onBoardClick(ev, boardId) {
        if (boardId) loadBoard(boardId)
        else onToggleModal(ev)
    }

    function onCreateBoard(board) {
        board.createdBy = userService.getLoggedinUser()
        board.members.push(board.createdBy)
        onSaveBoard(board)
    }

    async function onSaveBoard(board) {
        try {
            const savedBoard = await saveBoard(board)
            console.info('Board Saved successesfuly')
            onCloseModal()
            if (board._id) setBoard(null)
            else navigate(`/${savedBoard._id}`)
        } catch (err) {
            console.error(err.name, err.message)
        }
    }

    function onToggleModal({ target }) {
        if (!modal) return
        if (target.dataset?.type === 'icon') target = target.parentNode
        const props = { onBoardClick, onCreateBoard, id: modal.id }
        const pos = utilService.getElementPosition(target)
        elModal.current.style.top = pos.top + 'px'
        elModal.current.style.left = pos.right + 4 + 'px'

        if (308 + pos.right > window.visualViewport.width) {
            elModal.current.style.left = pos.left - (308) + 'px'
        }

        if (window.visualViewport.width < 550) {
            elModal.current.style.left = '0px'
            elModal.current.style.top = '0px'
            elModal.current.style.right = '0px'
            elModal.current.style.bottom = '0px'
        }
        if (window.visualViewport.height - pos.top < 500) {
            elModal.current.style.top = 'unset'
            elModal.current.style.bottom = '14px'
        }
        setModal(modalService.setModalData(modals, modal.id, BOARD_CREATOR, props))
        toggleModal(modals, modal.id)
    }

    if (!boards || !boards.length) return <Spinner />
    else return <main className="boards-index-container">
        <section className="boards-index flex column">

            {!!getStaredBoards()?.length && <header className="main-header">
                <FaRegStar />
                <h3>Starred boards</h3>
            </header>}
            <ul
                className="boards-preview-list clean-list"
            >
                {getStaredBoards()?.map(board =>
                    < BoardPreview
                        key={board._id + 'fav'}
                        boardId={board._id}
                        board={board}
                        isStarred={board.isStarred}
                        onBoardClick={onBoardClick}
                        onToggleStaredBoard={onToggleStaredBoard}
                    />
                )}
            </ul>

            <header className="main-header">
                <BsPerson />
                <h3>Your boards</h3>
            </header>
            <section
                className="recently-boards-container"
            >

                <ul
                    className="boards-preview-list clean-list"
                >
                    {boards?.map(board =>
                        <BoardPreview
                            key={board._id}
                            boardId={board._id}
                            board={board}
                            onToggleStaredBoard={onToggleStaredBoard}
                            isStarred={board.isStarred}
                            onBoardClick={onBoardClick}
                        />
                    )}
                    <BoardPreview
                        key={'new'}
                        board={null}
                        onBoardClick={onBoardClick} />
                </ul>
            </section>
        </section>
        <div className="modal-container" ref={elModal}>
            {
                modal?.isOpen && <>
                    <Modal
                        modal={modal}
                        cmpProps={modal.modalData.props}
                        cmpType={modal.modalData.cmpType}
                        className={modal.modalData.className}
                    />
                    <div className="all-screen-modal" onClick={() => closeModal(modals, modal.id)} />
                </>
            }
        </div>
    </main >
}