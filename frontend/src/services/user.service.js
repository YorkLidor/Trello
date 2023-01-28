import { func } from "prop-types"
import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { jUser } from "./jsons/board"
import { utilService } from "./util.service"

<<<<<<< HEAD
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
_createUsers()
=======
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
>>>>>>> 8f4802919445605b72d930c87a7613a08bf252c6

export const userService = {
    login,
    logout,
    signup,
    update,
    getLoggedinUser,
    getById,
    getEmptyCredentials
}
const ROUTE = 'user'

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

<<<<<<< HEAD
async function login(userCred) {
    try {
        console.log('user', userCred);
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            return saveLocalUser(user)
        }
    } catch (err) {
        console.log('Error with login', err)
=======
async function getById(userId) {
    try {
        return httpService.get(`${ROUTE}/${userId}`)
    } catch (err) {
        console.log('Couldnt get user', err)
>>>>>>> 8f4802919445605b72d930c87a7613a08bf252c6
        throw err
    }
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function signup({ username, password, fullname, imgUrl = "http://some-img.jpg", mentions = [] }) {
    const userCred = { username, password, fullname, imgUrl, mentions }
    try {
        const user = await httpService.post('auth/signup', userCred)
        return saveLocalUser(user)
    } catch (err) {
        console.log('Error with login', err)
        throw err
    }
}

<<<<<<< HEAD
function logout() {
    return sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
=======
async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        return await httpService.post('auth/logout')
    } catch (err) {
        console.log('Error with login', err)
        throw err
    }
>>>>>>> 8f4802919445605b72d930c87a7613a08bf252c6
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
<<<<<<< HEAD
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, email: user.email, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
=======
>>>>>>> 8f4802919445605b72d930c87a7613a08bf252c6
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

async function update(user) {
    try {
        user = await httpService.put(`${ROUTE}/${user._id}`, user)
        if (getLoggedinUser()._id === user._id) saveLocalUser(user)
        return user;
    } catch (err) {
        console.log('Couldnt update users', err)
        throw err
    }
}
