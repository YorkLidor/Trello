import { CLOSE_MODAL, SET_MODAL_DATA, TOGGLE_MODAL } from "./app.reducer"
import { store } from "./store"
import {
    MODAL_ATTACH,
    MODAL_LABELS,
    MODAL_ATTACH_EDIT,
    MODAL_ATTACH_OPEN,
    MODAL_MEMBERS,
    MODAL_MEMBER_OPEN,
    BOARD_CREATOR,
    MODAL_TASK_QUICK_EDIT
} from '../cmps/modal/modal.jsx'

export function closeModal() {
    store.dispatch({ type: CLOSE_MODAL })
}

export function toggleModal(){
    store.dispatch({ type: TOGGLE_MODAL })
}

export function setModalData(modalType, props) {
    let newModalData

    switch (modalType) {
        case MODAL_LABELS:
            newModalData = {
                className: 'modal',
                cmpType: MODAL_LABELS,
                props
            }
            break
        case MODAL_ATTACH:
            newModalData = {
                className: 'modal',
                cmpType: MODAL_ATTACH,
                props
            }
            break
        case MODAL_ATTACH_EDIT:
            newModalData = {
                className: 'modal',
                cmpType: MODAL_ATTACH_EDIT,
                props
            }
            break
        case MODAL_ATTACH_OPEN:
            newModalData = {
                className: 'attach-viewer-modal',
                cmpType: MODAL_ATTACH_OPEN,
                props
            }
            break
        case MODAL_MEMBERS:
            newModalData = {
                className: 'modal',
                cmpType: MODAL_MEMBERS,
                props
            }
            break
        case MODAL_MEMBER_OPEN:
            newModalData = {
                className: 'modal',
                cmpType: MODAL_MEMBER_OPEN,
                props
            }
            break;
        case BOARD_CREATOR:
            newModalData = {
                className: 'modal',
                cmpType: BOARD_CREATOR,
                props
            }
            break;
        case MODAL_TASK_QUICK_EDIT:
            newModalData = {
                className: 'task-quick-edit-container',
                cmpType: MODAL_TASK_QUICK_EDIT,
                props
            }
            break;
        default:
            break;
    }
    store.dispatch({ type: SET_MODAL_DATA, modalData: newModalData })
}