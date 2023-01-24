export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_MODAL = 'SET_MODAL'
export const SET_MODALS = 'SET_MODALS'


const initialState = {
    app: {
        isLoading: false,
        modals: []
    }
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_LOADING:
            return { ...state, app: { ...state.app, isLoading: action.isLoading } }
        case SET_MODAL:
            return { ...state, app: { ...state.app, modals: state.app.modals.map(modal => modal.id === action.modal.id ? action.modal : modal) } }
        case SET_MODALS:
            return { ...state, app: { ...state.app, modals: action.modals } }
    
        default:
            return state
    }
}