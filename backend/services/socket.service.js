const logger = require('./logger.service');
const boardService = require("../api/board/board.service")
var gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        // Join socket to a room
        socket.on('set-chat-topic', boardId => {
            console.log('got new topic', boardId);
            if (socket.boardId === boardId) return;
            if (socket.boardId) {
                // When visiting another board, remove the prev "room"
                socket.leave(socket.boardId)
                logger.info(`Socket is leaving topic ${socket.boardId} [id: ${socket.id}]`)
            }
            socket.join(boardId)
            // save the boardId on this specific user socket for later use.
            socket.boardId = boardId
        })

        // Join socket to a room
        socket.on('chat-new-msg', msg => {
            logger.info(`New chat msg from socket [id: ${socket.id}], emitting to topic ${socket.boardId}`)

            // BONUS
            boardService.addMsgToChat(msg, socket.boardId)

            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            gIo.to(socket.boardId).emit('chat-add-msg', msg)
        })

        socket.on('chat-user-typing', user => {
            logger.info(`User is typing from socket [id: ${socket.id}], emitting to topic ${socket.boardId}`)
            socket.broadcast.to(socket.boardId).emit('chat-add-typing', user)
            // broadcast({ type: 'chat typing', data: user, room: socket.boardId, userId: socket.userId })
        })
        
        socket.on('chat-stop-typing', user => {
            logger.info(`User has stopped typing from socket [id: ${socket.id}], emitting to topic ${socket.boardId}`)
            socket.broadcast.to(socket.boardId).emit('chat-remove-typing', user)
            // broadcast({ type: 'chat stop-typing', data: user, room: socket.boardId, userId: socket.userId })
        })


        // For specific user
        socket.on('user-watch', userId => {
            logger.info(`user-watch from socket [id: ${socket.id}], on user ${userId}`)
            socket.join('watching:' + userId)
        })

        socket.on('set-user-socket', userId => {
            logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
            socket.userId = userId
        })

        socket.on('unset-user-socket', () => {
            logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            delete socket.userId
        })
    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    userId = userId.toString()
    const socket = await _getUserSocket(userId)

    if (socket) {
        logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
        socket.emit(type, data)
    } else {
        logger.info(`No active socket for user: ${userId}`)
        // _printSockets();
    }
}

// If possible, send to all sockets BUT not the current socket 
// Optionally, broadcast to a room / to all
async function broadcast({ type, data, room = null, userId }) {
    logger.info(`Broadcasting event: ${type}`)
    const excludedSocket = await _getUserSocket(userId)
    if (room && excludedSocket) {
        logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
        excludedSocket.broadcast.to(room).emit(type, data)
    } else if (excludedSocket) {
        logger.info(`Broadcast to all excluding user: ${userId}`)
        excludedSocket.broadcast.emit(type, data)
    } else if (room) {
        logger.info(`Emit to room: ${room}`)
        gIo.to(room).emit(type, data)
    } else {
        logger.info(`Emit to all`)
        gIo.emit(type, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets()
    const socket = sockets.find(s => s.userId === userId)
    return socket;
}
async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets();
    return sockets;
}

async function _printSockets() {
    const sockets = await _getAllSockets()
    console.log(`Sockets: (count: ${sockets.length}):`)
    sockets.forEach(_printSocket)
}
function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
    // set up the sockets service and define the API
    setupSocketAPI,
    // emit to everyone / everyone in a specific room (label)
    emitTo,
    // emit to a specific user (if currently active in system)
    emitToUser,
    // Send to all sockets BUT not the current socket - if found
    // (otherwise broadcast to a room / to all)
    broadcast,
}
