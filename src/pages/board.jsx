import { useState, useEffect } from "react";

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { boardService } from "../services/board.service";

export function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        loadBoard()
    }, [])

    async function loadBoard() {
        const boards = await boardService.query()
        setBoard(boards[0])
    }

    return <main className="board flex column">
        <BoardHeader board={board}/>
        <GroupList board={board}/>
    </main>
}