import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import { Blocks } from 'react-loader-spinner'

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { boardService } from "../services/board.service";

export function Board() {
    const [board, setBoard] = useState(null)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard()
    }, [])

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            setBoard(board)
            document.body.style.backgroundImage  = `url(${board.style.bg})`
        } catch (err) {
            console.error('No Board!', err)
        }
    }

    function getLoader() {
        return <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
        />
    }

    if (!board) return getLoader()
    else return <main className="board flex column">
        <BoardHeader board={board} />
        <GroupList groups={board.groups} setBoard={setBoard} board={board} />
    </main>
}