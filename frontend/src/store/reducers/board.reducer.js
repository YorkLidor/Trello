export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const EDIT_BOARD = 'EDIT_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const SET_ACTIVE_BOARD = 'SET_ACTIVE_BOARD'
export const UNDO_EDIT_BOARD = 'UNDO_EDIT_BOARD'

const initialState = {
    boards: [],
    board: null,
    lastEditedBoard: null
}

export function boardReducer(state = initialState, action) {
    let boards
    let lastEditedBoard

    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case REMOVE_BOARD:
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }

        case EDIT_BOARD:
            lastEditedBoard = state.boards.find(board => board._id === action.board._id)
            lastEditedBoard = JSON.stringify(lastEditedBoard)
            return {

                ...state,
                boards: state.boards.map(board => board._id === action.board._id ? action.board : board),
                board: action.board,
                lastEditedBoard
            }

        case SET_ACTIVE_BOARD:
            return { ...state, board: action.board }

        case ADD_BOARD:
            return {
                ...state,
                boards: [...state.boards, action.board],
                board: action.board
            }

        case UNDO_EDIT_BOARD:
            lastEditedBoard = JSON.parse(state.lastEditedBoard)
            boards = state.boards.filter(board => board._id !== lastEditedBoard._id)
            boards = [lastEditedBoard, ...boards]
            return { ...state, boards, board: { ...lastEditedBoard }, lastEditedBoard: null }

        default:
            return state
    }
}