import { boardService } from '../../services/board.service'
import { store } from '../store.js'
import { SET_BOARDS, ADD_BOARD, REMOVE_BOARD, EDIT_BOARD, SET_ACTIVE_BOARD } from '../reducers/board.reducer'

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
        const savedBoard = await boardService.save(board)
        store.dispatch({ type: actionType, board: savedBoard })
        return savedBoard
    }
    catch {
        console.error('Cannot save board')
        throw new Error('Cannot save board')
    }
}

export async function setBoard(board) {
    store.dispatch({ type: SET_ACTIVE_BOARD, board })
}

export async function addNewTask(boardId, groupId, newTask) {
    try {
        const board = await boardService.getById(boardId)
        board.groups.forEach(group => {
            if (group.id === groupId) {
                group.push(newTask)
                return group
            }
        })
        return store.dispatch({ type: SET_ACTIVE_BOARD, board })
    } catch (error) {

    }
}

export async function saveTask(boardId, groupId, task, activity) {
    const board = await boardService.getById(boardId)
    if (!board) throw new Error('No such board with this id')
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    const group = board.groups.find(group => group.id === groupId)
    if (!group) throw new Error('No such a group in board')

    const tasks = group.tasks.map(t => t.id === task.id ? task : t)
    group.tasks = tasks

    board.activities.unshift(activity)
    await saveBoard(board)
    store.dispatch({ type: SET_ACTIVE_BOARD, board })
}

export async function onRemoveAttachment(user, boardId, groupId, task, attachment) {
    task.attachments = [...task.attachments?.filter(attach => attach.id !== attachment.id)]
    let action = `Removed attachment ${attachment.filename} from card ${task.title}.`

    const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)
    await saveTask(boardId, groupId, task, activity)
}

export async function onRemoveFromCard(user, task, boardId, groupId) {
    let action = 'Removed member ' + user.fullname + ' from board members.'
    task.memberIds = task.memberIds?.filter(memberId => memberId !== user._id)

    const activity = boardService.getActivity(user, { id: task.id, title: task.title }, action)
    await saveTask(boardId, groupId, task, activity)
}

export async function saveDescription(task, boardId, groupId, text) {
    if (!task.description && !text.length) return
    console.log(text, boardId, groupId, task.description)

    task = ({ ...task, description: text })
    await saveTask(boardId, groupId, task, {})
}