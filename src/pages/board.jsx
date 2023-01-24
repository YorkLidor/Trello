import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

import { boardService } from "../services/board.service";

import { setBoard } from "../store/actions/board.actions";

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";

import { Audio } from 'react-loader-spinner'

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
            setCurrBoard(board)
            setBoard(board)
        } catch (err) {
            console.error('No Board!', err)
        }
    }

    function Loader() {
        return <main className="board flex column justify-center">
            <Audio
                height="100"
                width="100"
                color="#091e4214"
                ariaLabel="audio-loading"
                wrapperStyle={{ margin: '0 auto' }}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </main >
    }

    if (!board) return <Loader/>
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