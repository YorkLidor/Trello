import { useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BoardPreview } from "../cmps/board-preview";
import { Audio } from 'react-loader-spinner'

import { utilService } from "../services/util.service";

import { loadBoards, saveBoard } from "../store/actions/board.actions";
// import { closeModal, setModalData, toggleModal } from "../store/actions/app.actions"

import { BOARD_CREATOR, Modal } from "../cmps/modal/modal";

import { TiStarOutline } from "react-icons/ti";
import { BsPerson } from 'react-icons/bs'

export function BoardIndex() {
    const boards = useSelector(state => state.boardModule.boards)
    const modalData = useSelector((storeState) => storeState.appModule.app.modalData)
    const elModal = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        onLoadBoards()
        // return closeModal
    }, [])

    function onToggleStaredBoard(ev, board, isStared) {
        ev.stopPropagation()
        board.isStared = !isStared
        onSaveBoard({ ...board })
    }

    function getStaredBoards() {
        return boards.filter(board => board.isStared)
    }

    async function onLoadBoards() {
        try {
            await loadBoards()
        } catch (err) {
            console.error('something went wrong!', err)
        }
    }

    function onBoardClick(ev, boardId) {
        if (boardId) navigate(`/${boardId}`)
        else onToggleModal(ev)
    }

    function onCreateBoard(board) {
        onSaveBoard(board)
    }

    async function onSaveBoard(board) {
        try {
            // closeModal()
            await saveBoard(board)
            console.log('Board Saved successesfuly')
        } catch (err) {
            console.error('Can\'t save board!', err)
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
        const props = { onBoardClick, onCreateBoard }
        // setModalData(BOARD_CREATOR, props)
        const pos = utilService.getElementPosition(target)
        elModal.current.style.top = pos.top + 'px'
        elModal.current.style.left = pos.right + 'px'

        // toggleModal()
    }

    if (!boards && !boards.length) return <Loader />
    else return <main className="boards-index-container">
        <section className="boards-index flex column">

            {!!getStaredBoards()?.length && <header className="main-header">
                <TiStarOutline />
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
                        isStared={board.isStared}
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
                            isStared={board.isStared}
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
                modalData && <Modal
                    cmpProps={modalData.props}
                    cmpType={modalData.cmpType}
                    className={modalData.className}
                />
            }
        </div>
    </main >
}