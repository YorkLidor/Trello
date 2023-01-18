import { async } from 'q'
import { storageService } from './async-storage.service.js'
import { jBoard } from './jsons/board.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDB'

_createBoards()

export const boardService = {
    query,
    saveBoard,
    saveTask,
    removeBoard,
    getById,
    getLabelsById,
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

function removeBoard(boardId) {
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

async function getLabelsById(boardId, labelIds) {
    const board = await getById(boardId)
    console.log('board:', board)
    console.log('board.labels:', board.labels)
    const allLabels = board.labels.reduce((labelId, idx) => labelId.id === labelIds[idx])
    console.log('*********allLabels:', allLabels)
    return 5
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = []
        boards.push({ ...jBoard })
        jBoard._id = 'b102'
        jBoard.title = 'Lidorush'
        const bg = "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/540x960/31e71464ca152e3c9518a3d1242361ed/photo-1669651567608-6a5ceb13845b.jpg"
        boards.push({ ...jBoard, style: { bg } })

        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}

