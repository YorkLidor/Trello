import { store } from "../store";
import { SET_USER } from "../reducers/user.reducer";

export async function setUser(user) {
    store.dispatch({ type: SET_USER, user })
}