import { async } from 'q'
import { SET_BOARDS } from '../store/board.reducer.js'
import { store } from '../store/store.js'
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
    getEmptyBoard,
    getEmptyGroup
}

function query() {
    return storageService.query(STORAGE_KEY)
}

async function saveBoard(board) {
    if (board._id) {
        const boards = await query()
        store.dispatch({ type: SET_BOARDS, boards: boards.map(b => b._id === board._id ? board : b) })
        return storageService.put(STORAGE_KEY, board)
    } else {
        return storageService.post(STORAGE_KEY, board)
    }
}

function removeBoard(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
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
    return board.labels.filter(label => labelIds.includes(label.id))

}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: "",
        archivedAt: null,
        tasks: [],
    }
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        createdBy: {},
        style: {
            bg: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg"
        },
        labels: [],
        groups: [],
    }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = []
        boards.push({ ...jBoard })
        jBoard._id = 'b102'
        jBoard.title = 'Lidorush'
        const bg = "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/18cb4dc9d683e8775a107e41e54108c2/photo-1672821337870-2180f5223865.jpg"
        boards.push({ ...jBoard, style: { bg } })

        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}