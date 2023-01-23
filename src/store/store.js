import { combineReducers, legacy_createStore as createStore } from "redux"

import { boardReducer } from './reducers/board.reducer'
import { appReducer } from './reducers/app.reducer'
import { userReducer } from "./reducers/user.reducer"

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    appModule: appReducer,
    boardModule: boardReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, middleware)


// For debug 
store.subscribe(() => {

})
