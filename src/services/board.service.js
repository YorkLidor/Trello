import { func } from 'prop-types'
import { async } from 'q'
import { SET_ACTIVE_BOARD } from '../store/board.reducer.js'
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
    getEmptyGroup,
    getEmptyTask,
    getActivity,
    getEmptyLabel,
    getLabelDeaultColor,
    saveBoardLabel,
    removeBoardLabel
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
    console.log('board:', board)
    console.log('labelIdssssss:', labelIds)
    return board.labels.filter(label => labelIds.includes(label.id))
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        title: ""
    }
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