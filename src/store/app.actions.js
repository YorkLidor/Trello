import { SET_MODAL_DATA } from "./app.reducer"
import { store } from "./store"
import {MODAL_ATTACH, MODAL_LABELS, MODAL_ATTACH_EDIT} from '../cmps/modal.jsx'

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
    }
    store.dispatch({ type: SET_MODAL_DATA, modalData: newModalData })
}