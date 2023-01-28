import { boardService } from '../../services/board.service'
import { store } from '../store.js'
import { SET_BOARDS, ADD_BOARD, REMOVE_BOARD, EDIT_BOARD, SET_ACTIVE_BOARD, UNDO_EDIT_BOARD } from '../reducers/board.reducer'

export const ADD_CHECKLIST = 'ADD_CHECKLIST'
export const EDIT_ATTACH = 'EDIT_ATTACH'
export const ADD_ATTACH = 'ADD_ATTACH'
export const REMOVE_ATTACH = 'REMOVE_ATTACH'
export const REMOVE_CHECKLIST = 'REMOVE_CHECKLIST'
export const REMOVE_TODO_A = 'REMOVE_TODO_A'
export const REMOVE_TODO_B = 'REMOVE_TODO_B'
export const REMOVE_COVER = 'REMOVE_COVER'
export const CHANGE_COVER_COLOR = 'CHANGE_COVER_COLOR'
export const CHANGE_COVER_SIZE = 'CHANGE_COVER_SIZE'
export const CHANGE_COVER_ATTACH = 'CHANGE_COVER_ATTACH'
export const CHANGE_COVER_TEXT_COLOR = 'CHANGE_COVER_TEXT_COLOR'
export const CHANGE_DUE_DATE = 'CHANGE_DUE_DATE'
export const REMOVE_DUE_DATE = 'REMOVE_DUE_DATE'
export const ADD_MEMBER_A = 'ADD_MEMBER_A'
export const ADD_MEMBER_B = 'ADD_MEMBER_B'
export const REMOVE_MEMBER_A = 'REMOVE_MEMBER_A'
export const REMOVE_MEMBER_B = 'REMOVE_MEMBER_B'
export const ADD_LABEL = 'ADD_LABEL'
export const REMOVE_LABEL = 'REMOVE_LABEL'
export const CHANGE_TASK_LOCATION = 'CHANGE_TASK_LOCATION'
export const SET_CHECKLIST_TITLE = 'SET_CHECKLIST_TITLE'
export const POST_COMMENT = 'POST_COMMENT'

export async function loadBoards() {
    try {

        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    }
    catch (error) {
        console.log('Had issues loading boards', error)
        throw new Error('Had issues loading boards')
    }
}

export async function removeBoard(boardId) {
    try {

        store.dispatch({ type: REMOVE_BOARD, boardId })
        await boardService.remove(boardId)
    }
    catch (error) {
        console.log('Had issues Removing board', error)
        throw new Error('Had issues Removing board')
    }
}

export async function saveBoard(board) {
    let actionType
    let savedBoard
    try {
        if (board._id) {
            actionType = EDIT_BOARD
            store.dispatch({ type: actionType, board: { ...board } })
            savedBoard = await boardService.save(board)
        } else {
            actionType = ADD_BOARD
            savedBoard = await boardService.save({ ...board })
            store.dispatch({ type: actionType, board: savedBoard })
        }
        return savedBoard
    }
    catch (err) {
        if (actionType === EDIT_BOARD) store.dispatch({ type: UNDO_EDIT_BOARD })
        console.error('Cannot save board')
        throw err
    }
}

export async function setBoard(board) {
    store.dispatch({ type: SET_ACTIVE_BOARD, board })
}

export async function addNewTask(groupId, newTask) {
    try {
        const board = store.getState().boardModule.board

        const group = board.groups?.find(group => group.id === groupId)
        if (!group) throw new Error('No such a group in board')

        if (!group.tasks) group.tasks = []
        group.tasks.push(newTask)
        await saveBoard(board)

    } catch (error) {
        console.error('ERROR: Failed to add task', error)
        throw new Error('ERROR: Failed to add task')
    }
}

export async function saveTask(groupId, task, activity) {
    try {
        console.log(activity)
        const board = store.getState().boardModule.board
        if (!board) throw new Error('No such board with this id')
        // PUT /api/board/b123/task/t678

        // TODO: find the task, and update
        const group = board.groups?.find(group => group.id === groupId)
        if (!group) throw new Error('No such a group in board')

        const tasks = group.tasks?.map(t => t.id === task.id ? task : t)
        group.tasks = tasks

        board.activities.unshift(activity)
        await saveBoard(board)
    }
    catch (error) {
        console.error('ERROR: Failed to save task', error)
        throw new Error('ERROR: Failed to save task')
    }
}

export async function onRemoveAttachment(user, boardId, groupId, task, attachment) {
    try {
        task.attachments = [...task.attachments?.filter(attach => attach.id !== attachment.id)]
        if (task.cover?.attachmentId === attachment.id) task.cover = null
        const action = `${getActivityText(REMOVE_ATTACH)} ${attachment.filename}`

        const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)
        await saveTask(groupId, task, activity)
    }
    catch (error) {
        console.error('ERROR: Failed to remove attachment', error)
        throw new Error('ERROR: Failed to remove attachment')
    }
}

export async function onRemoveFromCard(user, task, boardId, groupId) {
    try {
        const action = `${getActivityText(REMOVE_MEMBER_A)} ${user.fullname} ${REMOVE_MEMBER_B}`
        task.memberIds = task.memberIds?.filter(memberId => memberId !== user._id)

        const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)
        await saveTask(groupId, task, activity)
    }
    catch (error) {
        console.error('ERROR: Failed to remove card', error)
        throw new Error('ERROR: Failed to remove card')
    }
}

export async function saveDescription(task, boardId, groupId, text) {
    try {
        if (!task.description && !text.length) return
        console.log(text, boardId, groupId, task.description)

        task = ({ ...task, description: text })
        await saveTask(groupId, task, {})
    }
    catch (error) {
        console.error('ERROR: Failed to save description', error)
        throw new Error('ERROR: Failed to save description')
    }
}

export function getActivityText(action) {
    switch(action) {
        case ADD_CHECKLIST:
            return 'added Checklist'
        case EDIT_ATTACH:
            return 'edited attachment'
        case ADD_ATTACH:
            return 'added attachment'
        case REMOVE_ATTACH:
            return 'removed attachment'
        case REMOVE_CHECKLIST:
            return `removed checklist`
        case REMOVE_TODO_A:
            return `has removed the checklist-item`
        case REMOVE_TODO_B:
            return `from checklist`
        case REMOVE_COVER:
            return `removed cover from task`
        case CHANGE_COVER_COLOR:
            return `changed task cover color`
        case CHANGE_COVER_SIZE:
            return `changed cover size of task`
        case CHANGE_COVER_ATTACH:
            return `set as cover attachment`
        case CHANGE_COVER_TEXT_COLOR:
            return `changed task cover font color to`
        case CHANGE_DUE_DATE:
            return `changed task due date to`
        case REMOVE_DUE_DATE:
            return `removed task due date`
        case ADD_MEMBER_A:
            return `added member`
        case ADD_MEMBER_B:
            return `to board members`
        case REMOVE_MEMBER_A:
            return `removed member`
        case REMOVE_MEMBER_B:
            return `from board members`
        case ADD_LABEL:
            return `added label`
        case REMOVE_LABEL:
            return `removed label`
        case CHANGE_TASK_LOCATION:
            return `changed location of task`
        case SET_CHECKLIST_TITLE:
            return `has set the title of checklist`
        case POST_COMMENT:
            return `added comment`
    }
}