import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

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
        navigate(`/board/${boardId}`)
    }

    return <main className="boards-index flex column">
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
                    <li
                        key={board._id}
                        className="board-preview"
                        onClick={() => onBoardClick(board._id)}
                        style={{ backgroundImage: `url(${board.style.bg})` }}
                    >
                        <span className="board-preview-fade">
                        <h4 className="board-title">{board.title}</h4>
                        </span>
                    </li>
                )}
            </ul>
        </section>
    </main >
}