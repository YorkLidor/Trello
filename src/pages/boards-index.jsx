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

    function onBoardClick(boardId){
        navigate(`/board/${boardId}`)
    }

    return <main className="boards-index flex column">
        <header className="main-header">
            <h3>Recently viewed</h3>
        </header>
        <section
            className="recently-boards-container"
        >
            {boards?.map(board =>
                <ul
                    key={board._id}
                    className="boards-preview-list clean-list"
                    onClick={() => onBoardClick(board._id)}
                >
                    <li
                        className="board-preview"
                        style={{ backgroundImage: `url(${board.style.bg})` }}
                    >
                        <h4 className="board-title">{board.title}</h4>
                    </li>
                </ul>
            )}
        </section>
    </main >
}