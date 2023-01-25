import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { boardService } from "../services/board.service";

import { saveBoard, setBoard } from "../store/actions/board.actions";

import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";

import { Audio } from 'react-loader-spinner'
import { useSelector } from "react-redux";

export function Board() {
    const board = useSelector(state => state.boardModule.board)
    const { boardId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBoard()
        return async () => {
            await board && saveBoard(board)
            setBoard(null)
        }
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
            saveBoard(board)
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

    if (!board || !board._id) return <Loader />
    else return <main className="board flex column" style={board.style}>
        <BoardHeader
            board={board}
            onDeleteBoard={onDeleteBoard}
        />
        <GroupList
        />
        <>
            <Outlet />
        </>
    </main>
}