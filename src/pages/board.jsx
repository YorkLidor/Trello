import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import { Blocks } from 'react-loader-spinner'

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { boardService } from "../services/board.service";
import { useSelector } from "react-redux";
import { setBoard } from "../store/board.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function Board() {
    const elBoard = useRef()
    const [board, setCurrBoard] = useState(null)
    const { boardId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBoard()

        //TODO: when task preview be in nested route we need to set board to null in cmp return state
        // return () => setBoard(null)
    }, [])

    useEffectUpdate(() => {
        if (board.style.backgroundImage && board.style.backgroundImage !== elBoard.current.style.backgroundImage)
            elBoard.current.style.backgroundImage = board.style.backgroundImage
    }, [board])

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
            console.log('board:', board)
            setCurrBoard(board)
            setBoard(board)
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
    else return <main className="board flex column" ref={elBoard}>
        <BoardHeader
            board={board}
            onDeleteBoard={onDeleteBoard}
        />
        <GroupList
            groups={board.groups}
            setBoard={setCurrBoard}
            board={board}
        />
    </main>
}