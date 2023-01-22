import { SET_MODAL_DATA } from "./app.reducer"
import { store } from "./store"
import {
    MODAL_ATTACH,
    MODAL_LABELS,
    MODAL_ATTACH_EDIT,
    MODAL_ATTACH_OPEN,
    MODAL_MEMBERS,
    MODAL_MEMBER_OPEN,
    BOARD_CREATOR
} from '../cmps/modal/modal.jsx'

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
        default:
            break;
    }
    store.dispatch({ type: SET_MODAL_DATA, modalData: newModalData })
}