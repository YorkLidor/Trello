import { SET_ACTIVE_BOARD } from '../store/board.reducer.js'
import { store } from '../store/store.js'
import { storageService } from './async-storage.service.js'
import { jBoard, jBoards } from './jsons/board.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDB'

_createBoards()

export const boardService = {
    query,
    saveBoard,
    grtDefaultFilter,
    saveTask,
    removeBoard,
    getById,
    getLabelsById,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    getActivity,
    getEmptyLabel,
    getLabelDeaultColor,
    saveBoardLabel,
    removeBoardLabel,
    getAttachment
}

async function query(filterBy = grtDefaultFilter()) {
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
    return storageService.remove(STORAGE_KEY, boardId)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function saveTask(boardId, groupId, task, activity) {
    const board = await getById(boardId)
    if (!board) throw new Error('No such board with this id')
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    const group = board.groups.find(group => group.id === groupId)
    if (!group) throw new Error('No such a group in board')

    const tasks = group.tasks.map(t => t.id === task.id ? task : t)
    group.tasks = tasks

    board.activities.unshift(activity)
    saveBoard(board)
    store.dispatch({ type: SET_ACTIVE_BOARD, board })
    // return board
    // return task
}


async function getLabelsById(boardId, labelIds) {
    const board = await getById(boardId)
    return board.labels.filter(label => labelIds.includes(label.id))
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        title: ""
    }
}

function grtDefaultFilter() {
    return { boardId: '' }
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
            backgroundImage: "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg)"
        },
        labels: [],
        groups: [],
    }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = jBoards
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}

function getActivity(member, task, txt) {
    return {
        id: 'a' + utilService.makeId(),
        txt,
        createdAt: Date.now(),
        byMember: {
            _id: member._id,
            fullname: member.fullname,
            imgUrl: member.imgUrl
        },
        task: {
            id: task.id,
            title: task.title
        }
    }
}

function getEmptyLabel() {
    return {
        title: '',
        color: '#DFE1E6'
    }
}

async function saveBoardLabel(board, newLabel) {
    const labelId = newLabel.id ? newLabel.id : 'l' + utilService.makeId()

    board = newLabel.id ?
        { ...board, labels: board.labels.map(label => label.id === labelId ? newLabel : label) }
        : { ...board, labels: [...board.labels, { ...newLabel, id: labelId }] }
    await saveBoard(board)
    store.dispatch({ type: SET_ACTIVE_BOARD, board })

}

async function removeBoardLabel(board, labelId) {
    board = { ...board, labels: board.labels.filter(label => label.id !== labelId) }
    board.groups.forEach(group => group.tasks.forEach(task => task.labelIds = task.labelIds?.filter(id => id !== labelId)))
    await saveBoard(board)
    store.dispatch({ type: SET_ACTIVE_BOARD, board })
}

function getLabelDeaultColor() {
    return '#DFE1E6'
}

function getAttachment(url, filename) {
    return {
        id: 'att' + utilService.makeId(),
        url,
        filename,
        createdAt: Date.now()
    }
}