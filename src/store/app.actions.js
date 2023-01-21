import { SET_MODAL_DATA } from "./app.reducer"
import { store } from "./store"
import {MODAL_ATTACH, MODAL_LABELS} from '../cmps/modal.jsx'

export function setModalData(modalType, props) {
    let newModalData

    switch (modalType) {
        case 'labels':
            newModalData = {
                className: 'modal',
                cmpType: MODAL_LABELS,
                props
            }
            break
        case 'attach':
            newModalData = {
                className: 'modal',
                cmpType: MODAL_ATTACH,
                props
            }
            break
    }
    store.dispatch({ type: SET_MODAL_DATA, modalData: newModalData })
}