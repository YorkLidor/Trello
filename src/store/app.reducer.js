
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

const initialState = {
    app: {
        isLoading: false,
        isModalOpen: false
    }
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_LOADING:
            return { ...state, app: { ...state.app, isLoading: action.isLoading } }
        case TOGGLE_MODAL:
            return { ...state, app: { ...state.app, isModalOpen: !state.app.isModalOpen } }
        case CLOSE_MODAL:
            return { ...state, app: { ...state.app, isModalOpen: false } }
        default:
            return state
    }
}