import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BoardPreview } from "../cmps/board-preview";
import { Audio } from 'react-loader-spinner'

import { loadBoards, saveBoard, setBoard } from "../store/actions/board.actions"

import { BOARD_CREATOR, Modal } from "../cmps/modal/modal"
import { useEffectInit } from "../customHooks/useEffectInit"
import { modalService } from "../services/modal.service"
import { utilService } from "../services/util.service"
import { closeModal, toggleModal } from "../store/actions/app.actions"
import { boardService } from "../services/board.service"
import { userService } from "../services/user.service"

import { FaRegStar } from "react-icons/fa"
import { BsPerson } from 'react-icons/bs'

export function BoardIndex() {
    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.user)
    const modals = useSelector((storeState) => storeState.appModule.app.modals)
    const boards = useSelector(state => state.boardModule.boards)
    const [modal, setModal] = useState(null)
    const elModal = useRef()

    useEffectInit(() => {
        setModal(modalService.addNewModal(modals))
    }, [])

    useEffect(() => {
        if (!user) navigate('/')
        onLoadBoards()
        return onCloseModal
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
        onSaveBoard(board)
    }

    async function onSaveBoard(board) {
        try {
            if (!board._id) {
                board.members.push(board.createdBy)
                board.createdBy = userService.getLoggedinUser()
            }
            const savedBoard = await saveBoard(board)
            console.info('Board Saved successesfuly')
            onCloseModal()
            if (board._id) setBoard(null)
            else navigate(`/${savedBoard._id}`)
        } catch (err) {
            console.error(err.name, err.message)
        }
    }

    function Loader() {
        console.log('loader');
        return <main className="boards-index-container flex column justify-center">
            <Audio
                height="100"
                width="100"
                color="#091e4214"
                ariaLabel="audio-loading"
                wrapperStyle={{ margin: '0 auto' }}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </main>
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

        // if (window.visualViewport.width < 1000) {
        //     elModal.current.style.left = '0'
        //     elModal.current.style.top = '0'
        //     elModal.current.style.bottom = '0'
        //     elModal.current.style.right = '0'
        // }
        // if (window.visualViewport.width < 800) {
        //     elModal.current.style.left = '0px'
        //     elModal.current.style.top = '0px'
        // }

        setModal(modalService.setModalData(modals, modal.id, BOARD_CREATOR, props))
        toggleModal(modals, modal.id)
    }

    if (!boards && !boards.length) return <Loader />
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
                modal?.isOpen && <Modal
                    modal={modal}
                    cmpProps={modal.modalData.props}
                    cmpType={modal.modalData.cmpType}
                    className={modal.modalData.className}
                />
            }
        </div>
    </main >
}