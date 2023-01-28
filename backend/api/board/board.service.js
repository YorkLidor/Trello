
const fs = require('fs')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const boards = require('../../data/board.json')

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    addMsgToChat
}

const collectionName = 'board'

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection(collectionName)
        const boards = await collection.find(criteria).toArray();
        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function getById(boardId) {
    console.log('boardId', boardId)

    try {
        const collection = await dbService.getCollection(collectionName)
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        return board
    } catch (err) {
        console.log(`ERROR: while finding board ${boardId}`)
        throw err;
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const deleted = await collection.deleteOne({ "_id": ObjectId(boardId) })
        return deleted
        // return await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}

async function update(board) {
    board._id = ObjectId(board._id);

    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.replaceOne({ '_id': board._id }, board)
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(board)
        return board
    } catch (err) {
        console.log(`ERROR: cannot insert board`)
        throw err;
    }
}

async function addMsgToChat(msg, boardId) {
    try {
        console.log('boardId', boardId);
        const collection = await dbService.getCollection(collectionName)
        // const board = await collection.findOne({ "_id": ObjectId(boardId) })
        // board.chatHistory = board.chatHistory ? [...board.chatHistory, msg] : [msg]
        // await collection.replaceOne({ '_id': ObjectId(boardId) }, board)
        // Can be done with $push!
        await collection.updateOne({ '_id': ObjectId(boardId) }, { $push: { chatHistory: msg } })
    } catch (err) {
        console.log(`ERROR: cannot add message to board`)
        throw err;
    }
}


function _buildCriteria(filterBy = {}) {
    const criteria = {};

    console.log("function_buildCriteria -> filterBy", filterBy)
    if (filterBy.title) {
        criteria.title = { $regex: new RegExp(filterBy.title, 'ig') }
    }
    if (filterBy.type !== 'All' && filterBy.type) {
        criteria.labels = filterBy.type
    }
    if (filterBy.inStock) {
        criteria.inStock = true
    }
    if (filterBy.minPrice || filterBy.maxPrice) {
        criteria.price = {
            $gte: +filterBy.minPrice || 0,
            $lte: +filterBy.maxPrice || Infinity
        }
    }

    return criteria;
}
