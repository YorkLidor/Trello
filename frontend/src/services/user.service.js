import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

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
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            return saveLocalUser(user)
        }
    } catch (err) {
        console.error('Error with login', err)
        throw err
    }
}

async function getById(userId) {
    try {
        return httpService.get(`${ROUTE}/${userId}`)
    } catch (err) {
        console.error('Couldnt get user', err)
        throw err
    }
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

async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        return await httpService.post('auth/logout')
    } catch (err) {
        console.log('Error with login', err)
        throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
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
