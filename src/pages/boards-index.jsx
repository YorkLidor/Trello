import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BoardPreview } from "../cmps/board-preview";
import { Bars } from 'react-loader-spinner'


import { boardService } from "../services/board.service"

export function BoardsIndex() {
    const [boards, setBoards] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        loadBoards()
    }, [])

    async function loadBoards() {
        const boards = await boardService.query()
        setBoards(boards)
    }

    function onBoardClick(boardId) {
        if (boardId) navigate(`/board/${boardId}`)
        else onCreateBoard()
    }

    function onCreateBoard() {
        const boardToEdit = boardService.getEmptyBoard()
        boardToEdit.title = prompt("Enter Title:")
        if (boardToEdit.title) saveBoard(boardToEdit)
    }

    async function saveBoard(board) {
        try {
            const savedBoard = await boardService.saveBoard(board)
            setBoards(prevBoards => [...prevBoards, savedBoard])
        } catch (err) {
            console.error('Can\'t save board!', err)
        }
    }

    function getLoader() {
        return <main className="boards-index-container">
            <Bars
                height="80"
                width="80"
                color="#026AA7"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </main>
    }

    if (!boards) return getLoader()
    else return <main className="boards-index-container">
        <section className="boards-index flex column">
            <header className="main-header">
                <h3>Recently viewed</h3>
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