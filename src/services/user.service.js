import { func } from "prop-types"
import { storageService } from "./async-storage.service"
import { jUser } from "./jsons/board"
import { utilService } from "./util.service"

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
_createUsers()

export const userService = {
    getById,
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    let user
    try {
        const users = await storageService.query(STORAGE_KEY)
        user = users.find(user => user.username === username)
        if (!user) throw new Error('Invalid login')
        if (user.password !== password) throw new Error('Invalid password')
        _setLoggedinUser(user)
        return user
    } catch (err) {
        throw err
    }

}

async function signup({ username, password, fullname, imgUrl = "http://some-img.jpg", mentions = [] }) {
    const user = { username, password, fullname, imgUrl, mentions }
    try {
        const signedUser = await storageService.post(STORAGE_KEY, user)
        _setLoggedinUser(signedUser)
    } catch (err) {
        return err
    }
}

function logout() {
    return sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
        imgUrl: "http://some-img.jpg",
        mentions: []
    }
}

function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [jUser]
        users.push({
            _id: utilService.makeId(),
            fullname: 'Shauli',
            username: 'shauli',
            password: 'pitaAlHagaz',
            imgUrl: "http://res.cloudinary.com/dk2geeubr/image/upload/v1674746367/qvbgfpwpobofvl5f6ocr.jpg",
            mentions: []
        })
        utilService.saveToStorage(STORAGE_KEY, users)
    }
}