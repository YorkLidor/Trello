const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoard, getBoards, removeBoard, updateBoard, addBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.get('/:boardId', getBoard)

// for no valdiations
// router.put('/', updateBoard)
// router.post('/', addBoard)
// router.delete('/:boardId', removeBoard)

// Only admin can do edit, add and delete!
router.post('/', requireAuth, requireAdmin, addBoard)
router.put('/', requireAuth, requireAdmin, updateBoard)
router.delete('/:boardId', requireAuth, requireAdmin, removeBoard)


module.exports = router