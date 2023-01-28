import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { jUser } from "./jsons/board"
import { utilService } from "./util.service"

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
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

async function login(userCred) {
    try {
        console.log('user', userCred);
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            return saveLocalUser(user)
        }
    } catch (err) {
        console.log('Error with login', err)
        throw err
    }
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
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
    return sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, email: user.email, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
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
        users = [{ ...jUser, _id: utilService.makeId() }]
        users.push({
            _id: utilService.makeId(),
            fullname: 'Shauli',
            username: 'shauli',
            email: 'shauli@gmail.com',
            password: 'pitaAlHagaz',
            imgUrl: "http://res.cloudinary.com/dk2geeubr/image/upload/v1674746367/qvbgfpwpobofvl5f6ocr.jpg",
            mentions: []
        })
        users.push({
            fullname: "Kochava Shavit",
            imgUrl: "https://res.cloudinary.com/dk2geeubr/image/upload/v1674765132/latest_c40bvk.png",
            mentions: [],
            password: "123",
            username: "kocavha",
            _id: "2OQJU"
      
         })
        utilService.saveToStorage(STORAGE_KEY, users)
    }
}