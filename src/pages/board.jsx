import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { boardService } from "../services/board.service";

export function Board() {
    const [board, setBoard] = useState(null)
    const {boardId} = useParams()

    useEffect(() => {
        loadBoard()
    }, [])

    async function loadBoard() {
        try{
            const board = await boardService.getById(boardId)
            console.log('board',board);
            setBoard(board)
        }catch (err){
            console.error('No Board!', err)
        }
    }

    return <main className="board flex column">
        <BoardHeader board={board} />
        <GroupList />
    </main>
}