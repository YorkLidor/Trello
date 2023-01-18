import { storageService } from './async-storage.service.js'
import { jBoard } from './jsons/board.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDB'

_createBoards()

export const boardService = {
    query,
    saveBoard,
    saveTask,
    remove,
    getById
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function saveBoard(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        return storageService.post(STORAGE_KEY, board)
    }
}

function remove(boardId) {
    return storageService.delete(STORAGE_KEY, boardId)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    // return board
    // return task
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = []
        boards.push(
            jBoard
        )
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}