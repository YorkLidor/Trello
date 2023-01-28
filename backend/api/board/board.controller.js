const boardService = require("./board.service.js")
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')
const asyncLocalStorage = require("../../services/als.service.js")

async function getBoards(req, res) {
    logger.debug(' to get boards', req.query.filterBy)
    try {

        // const filterBy = JSON.parse(req.query.filterBy)
        const boards = await boardService.query({})
        res.send(boards)
    } catch (err) {
        logger.error('Failed to get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getBoard(req, res) {
    try {
        const { boardId } = req.params
        const board = await boardService.getById(boardId)
        res.send(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function removeBoard(req, res) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        const { deletedCount } = await boardService.remove(req.params.boardId)
        if (deletedCount === 1) {
            socketService.broadcast({
                type: 'admin-update',
                data: 'adming removed a board',
                userId: loggedinUser._id
            })
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove board' })
        }
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}

async function addBoard(req, res) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        const board = req.body
        const savedBoard = await boardService.add(board)
        socketService.broadcast({
            type: 'admin-update',
            data: 'admin added a board',
            userId: loggedinUser._id
        })
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function updateBoard(req, res) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        const board = req.body
        const savedBoard = await boardService.update(board)
        socketService.broadcast({
            type: 'admin-update',
            data: 'adming updated a board',
            userId: loggedinUser._id
        })
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

module.exports = {
    getBoards,
    getBoard,
    addBoard,
    updateBoard,
    removeBoard
}


