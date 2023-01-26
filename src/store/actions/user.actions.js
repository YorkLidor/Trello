import { store } from "../store";
import { LOGIN_USER, SET_USER } from "../reducers/user.reducer";
import { userService } from "../../services/user.service";

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}

export async function login(user) {
    try {
        const logedInUser = await userService.login(user)
        store.dispatch({ type: LOGIN_USER, user: logedInUser })
        return logedInUser
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function logout() {
    try {
        userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    }
    catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}