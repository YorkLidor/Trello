import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BoardPreview } from "../cmps/board-preview";
import { Bars } from 'react-loader-spinner'

import { RxPerson } from 'react-icons/rx'

import { boardService } from "../services/board.service"
import { loadBoards, saveBoard } from "../store/board.actions";
import { setModalData } from "../store/app.actions"
import { BOARD_CREATOR, Modal } from "../cmps/modal/modal";
import { utilService } from "../services/util.service";
import { store } from "../store/store";
import { CLOSE_MODAL, TOGGLE_MODAL } from "../store/app.reducer";

export function BoardIndex() {
    const boards = useSelector(state => state.boardModule.boards)
    const elModal = useRef()
    const navigate = useNavigate()
    const modalData = useSelector((storeState) => storeState.appModule.app.modalData)


    useEffect(() => {
        onLoadBoards()
    }, [])

    async function onLoadBoards() {
        try {
            await loadBoards()
        } catch (err) {
            console.error('something went wrong!', err)
        }
    }

    function onBoardClick(ev, boardId) {
        if (boardId) navigate(`/board/${boardId}`)
        else onToggleModal(ev)
    }

    function onCreateBoard(ev, board) {
        if (board.title) onSaveBoard(board)
    }

    async function onSaveBoard(board) {
        try {
            store.dispatch({ type: CLOSE_MODAL })
            await saveBoard(board)
            console.log('Board Saved successesfuly')
        } catch (err) {
            console.error('Can\'t save board!', err)
        }
    }

    function getLoader() {
        return <main className="boards-index-container flex column justify-center">
            <Bars
                height="100"
                width="100"
                color="#026AA7"
                ariaLabel="bars-loading"
                wrapperStyle={{ margin: '0 auto' }}
                wrapperClass=""
                visible={true}
            />
        </main>
    }

    function onToggleModal({ target }) {
        const props = { onBoardClick, onCreateBoard }
        setModalData(BOARD_CREATOR, props)
        const pos = utilService.getElementPosition(target)
        elModal.current.style.top = pos.top + 'px'
        elModal.current.style.left = pos.right + 'px'

        store.dispatch({ type: TOGGLE_MODAL })
        console.log('toggle', modalData)
    }

    if (!boards) return getLoader()
    else return <main className="boards-index-container">
        <section className="boards-index flex column">
            <header className="main-header">
                <RxPerson />
                <h3>Your Boards</h3>
            </header>
            <section
                className="recently-boards-container"
            >
                <ul
                    className="boards-preview-list clean-list"
                >
                    {boards?.map(board =>
                        <BoardPreview key={board._id} board={board} onBoardClick={onBoardClick} />
                    )}
                    <BoardPreview key={'new'} board={null} onBoardClick={onBoardClick} />
                </ul>
            </section>
        </section>
        <div className="modal-container" ref={elModal}>
            {
                modalData && <Modal cmpProps={modalData.props} cmpType={modalData.cmpType} className={modalData.className} />
            }
        </div>
    </main >
}