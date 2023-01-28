import { store } from '../store/store.js'
import { jBoards } from './jsons/board.js'

import { utilService } from './util.service.js'

import { getActivityText, saveBoard, saveTask, POST_COMMENT } from '../store/actions/board.actions.js'
import { SET_ACTIVE_BOARD } from '../store/reducers/board.reducer.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'boardDB'

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
    removeTask,
    copyTask,
    getCoverAttachStyle,
    getCoverColorStyle,
    saveTaskTitle,
    getNewChecklist,
    sortChecklistTodos,
    setCoverImage,
    getTodoEmpty,
    removeChecklist,
    removeTodo,
    removeComment,
    copyGroup
}

const ROUTE = 'board'

function query(filterBy = {}) {
    return httpService.get(ROUTE, { filterBy })
}

async function saveTaskTitle(board, groupId, task) {
    const group = board.groups.find(g => g.id === groupId)
    const taskIndex = group.tasks.findIndex(t => t.id === task.id)
    const groupIndex = board.groups.findIndex(g => g.id === groupId)
    board.groups[groupIndex].tasks[taskIndex] = task
    return board
}

async function copyGroup(board, groupId) {
    const group = board.groups.find(g => g.id === groupId)
    const groupIndex = board.groups.findIndex(g => g.id === groupId)
    const newGroup = { ...group }
    newGroup.id = utilService.makeId()
    board.groups.splice(groupIndex + 1, 0, newGroup)
    board.groups[groupIndex] = group
    return board
}

async function copyTask(board, groupId, task) {
    const group = board.groups.find(g => g.id === groupId)
    const taskIndex = group.tasks.findIndex(t => t.id === task.id)
    const newTask = { ...task }
    newTask.id = utilService.makeId()
    group.tasks.splice(taskIndex + 1, 0, newTask)
    const groupIndex = board.groups.findIndex(g => g.id === groupId)
    board.groups[groupIndex] = group
    return board
}

async function removeTask(board, groupId, taskId) {
    const group = board.groups.find(g => g.id === groupId)
    const taskIndex = group.tasks.findIndex(t => t.id === taskId)
    group.tasks.splice(taskIndex, 1)
    const groupIndex = board.groups.findIndex(g => g.id === groupId)
    board.groups[groupIndex] = group
    return board
}

function save(board) {
    if (board._id) {
        return httpService.put(ROUTE, board)
    } else {
        return httpService.post(ROUTE, board)
    }
}

function removeBoard(boardId) {
    return httpService.delete(`${ROUTE}/${boardId}`)
}

function getById(boardId) {
    return httpService.get(`${ROUTE}/${boardId}`)
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
            backgroundColor: '#0079bf'
        },
        labels: [],
        groups: [],
        members: []
    }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = jBoards
        utilService.saveToStorage(STORAGE_KEY, boards)
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
    return '#c1c7d0'
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

async function addComment(user, groupId, task, text) {
    const comment = {
        isComment: true,
        id: 'cm' + utilService.makeId(),
        createdAt: Date.now(),
        txt: text,
        byMember: {
            id: user._id,
            fullName: user.fullname,
            imgUrl: user.imgUrl
        }

    }
    task.comments = task.comments ? [...task.comments, comment] : [comment]

    comment.task = {
        id: task.id,
        title: task.title
    }

    await saveTask(groupId, task, comment)
}

function getCoverColorStyle(color) {
    return { backgroundColor: color }
}

function getCoverAttachStyle(url) {
    return { backgroundImage: `url(${url})` }
}

function getNewChecklist(title) {
    return {
        id: 'ck' + utilService.makeId(),
        title,
        todos: []
    }
}

function setCoverImage(task, attachment) {
    if (attachment) task.cover = { style: getCoverAttachStyle(attachment.url), fullSize: task.cover?.fullSize ? task.cover.fullSize : false, attachmentId: attachment.id }
    else task.cover = null
    return task
}

function sortChecklistTodos(checklist) {
    if (!checklist.todos) return null
    const unDone = checklist.todos.filter(todo => !todo.isDone)
    const done = checklist.todos.filter(todo => todo.isDone)
    done.push(...unDone)
    return unDone
}

function getTodoEmpty() {
    return {
        id: 'td' + utilService.makeId(),
        title: '',
        isDone: false
    }
}

function removeChecklist(task, checklist) {
    task.checklists = task.checklists.filter(list => list.id !== checklist.id)
    return task
}

function removeComment(task, comment) {
    const board = store.getState().boardModule.board
    board.activities = board.activities.filter(a => a.id !== comment.id)
    task.comments = task.comments.filter(c => c.id !== comment.id)
    return task
}

function removeTodo(checklist, todo) {
    checklist.todos = checklist.todos.filter(t => t.id !== todo.id)
    return checklist
}

function getActivity(member, task, txt) {
    return {
        isComment: false,
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