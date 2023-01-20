import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BoardPreview } from "../cmps/board-preview";
import { Bars } from 'react-loader-spinner'

import { RxPerson } from 'react-icons/rx'

import { boardService } from "../services/board.service"
import { loadBoards, saveBoard } from "../store/board.actions";

export function BoardIndex() {
    const boards = useSelector(state => state.boardModule.boards)
    const navigate = useNavigate()


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

    function onBoardClick(boardId) {
        if (boardId) navigate(`/board/${boardId}`)
        else onCreateBoard()
    }

    function onCreateBoard() {
        const boardToEdit = boardService.getEmptyBoard()
        boardToEdit.title = prompt("Enter Title:")
        if (boardToEdit.title) onSaveBoard(boardToEdit)
    }

    async function onSaveBoard(board) {
        try {
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

    if (!boards) return getLoader()
    else return <main className="boards-index-container">
        <section className="boards-index flex column">
            <header className="main-header">
                <RxPerson/>
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
    </main >
}