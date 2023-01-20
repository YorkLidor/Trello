import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import { Blocks } from 'react-loader-spinner'

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { boardService } from "../services/board.service";
import { useSelector } from "react-redux";
import { setBoard } from "../store/board.actions";

export function Board() {
    const board = useSelector(state =>state.boardModule.board)
    const { boardId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBoard()
    }, [])

    async function onDeleteBoard() {
        const isWantDelete = window.confirm('Are you sure?')
        if (!isWantDelete) return
        try {
            await boardService.removeBoard(boardId)
            navigate('/workspace')
        } catch (err) {
            console.error('somthing went wrong', err)
        }
    }

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            setBoard(board)
            document.body.style.backgroundImage = `url(${board.style.bg})`

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
        <BoardHeader
            board={board}
            onDeleteBoard={onDeleteBoard}
        />
        <GroupList
            groups={board.groups}
            setBoard={setBoard}
            board={board}
        />
    </main>
}