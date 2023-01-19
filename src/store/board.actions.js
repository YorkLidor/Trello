import { boardService } from '../services/board.service'
import { store } from '../store/store.js'
import { SET_BOARDS, ADD_BOARD, REMOVE_BOARD, EDIT_BOARD } from './board.reducer'

export async function loadBoards() {
    try {

        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    }
    catch {
        console.log('Had issues loading boards')
        throw new Error('Had issues loading boards')
    }
}

// Example for Optimistic mutation:
export async function removeBoard(boardId) {
    try {

        store.dispatch({ type: REMOVE_BOARD, boardId })
        await boardService.remove(boardId)
    }
    catch {
        console.log('Had issues Removing board')
        throw new Error('Had issues Removing board')
    }
}

export async function saveBoard(board) {
    try {

        const actionType = (board._id) ? EDIT_BOARD : ADD_BOARD
        const savedBoard = await boardService.saveBoard(board)
        store.dispatch({ type: actionType, board: savedBoard })
        return savedBoard
    }
    catch {
        console.error('Cannot save board')
        throw new Error('Cannot save board')
    }
}