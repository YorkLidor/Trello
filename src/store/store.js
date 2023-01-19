import { combineReducers, legacy_createStore as createStore } from "redux"

import { boardReducer } from './board.reducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    boardModule: boardReducer
})

export const store = createStore(rootReducer, middleware)


// For debug 
store.subscribe(() => {

})
