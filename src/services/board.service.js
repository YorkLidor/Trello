import { store } from '../store/store.js'
import { jBoards } from './jsons/board.js'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import { saveBoard, saveTask } from '../store/actions/board.actions.js'
import { SET_ACTIVE_BOARD } from '../store/reducers/board.reducer.js'

const STORAGE_KEY = 'boardDB'

_createBoards()

export const boardService = {
    query,
    save,
    grtDefaultFilter,
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
    getAttachment,
    getGroupById,
    addComment,
    getCoverColorStyle,
    getCoverAttachStyle
}

async function query(filterBy = grtDefaultFilter()) {
    return await storageService.query(STORAGE_KEY)

}

function save(board) {
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

function getLabelsById(boardLabels, labelIds) {
    if (boardLabels && labelIds?.length) {
        return boardLabels.filter(label => labelIds.includes(label.id))
    } else return null
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        title: ""
    }
}

function grtDefaultFilter() {
    return { boardId: '', isStarred: false }
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

    saveBoard(board)
    store.dispatch({ type: SET_ACTIVE_BOARD, board })

}

async function removeBoardLabel(board, labelId) {
    board = { ...board, labels: board.labels.filter(label => label.id !== labelId) }
    board.groups.forEach(group => group.tasks.forEach(task => task.labelIds = task.labelIds?.filter(id => id !== labelId)))
    store.dispatch({ type: SET_ACTIVE_BOARD, board })
    saveBoard(board)
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

function getGroupById(board, groupId) {
    return board.groups.find(group => group.id === groupId)
}

async function addComment(user, boardId, groupId, task, text) {
    const comment = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        txt: text,
        byMember: {
            id: user._id,
            fullName: user.fullname,
            imgUrl: user.imgUrl
        }

    }
    task.comments = task.comments ? [...task.comments, comment] : [comment]
    await saveTask(boardId, groupId, task, boardService.getActivity(user, task, `User ${user.fullname} posted comment on task ${task.title}`))
}

function getCoverColorStyle(color) {
    return { backgroundColor: color }
}

function getCoverAttachStyle(url) {
    return { backgroundImage: `url(${url})` }
}