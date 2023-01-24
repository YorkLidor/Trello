import { store } from "../store/store"
import { utilService } from "./util.service"
import { SET_MODALS, SET_MODAL } from "../store/reducers/app.reducer"
import { useSelector } from "react-redux"

import {
    MODAL_LABELS, MODAL_ATTACH, MODAL_ATTACH_EDIT, MODAL_ATTACH_OPEN,
    MODAL_MEMBERS, MODAL_MEMBER_OPEN, MODAL_TASK_QUICK_EDIT, BOARD_CREATOR
} from '../cmps/modal/modal'

const modals = []

export const modalService = {
    addNewModal,
    getModalById,
    openModal,
    closeModal,
    toggleModal,
    setModalData,
    removeModal
}

function addNewModal() {
    const newModal = {
        id: 'modal-' + utilService.makeId(),
        isOpen: false,
        modalData: null
    }
    modals.unshift(newModal)
    _updateModalsInStore()
    return newModal
}

function getModalById(id) {
    return modals.find(modal => modal.id === id)
}

function openModal(id) {
    const modal = modals.find(modal => modal.id === id)
    if(!modal) throw new Error('Modal not found')

    modal.isOpen = true
    _updateStore(modal)
}

function closeModal(id) {
    const modal = modals.find(modal => modal.id === id)
    if(!modal) throw new Error('Modal not found')

    modal.isOpen = false
    _updateStore(modal)
}

function toggleModal(id) {
    const modal = modals.find(modal => modal.id === id)
    if(!modal) throw new Error('Modal not found')

    modal.isOpen = !modal.isOpen
    _updateStore(modal)
}

function setModalData(id, modalType, props) {
    const modal = modals.find(modal => modal.id === id)
    if(!modal) throw new Error('Modal not found')

    const data = getModalData(id, modalType, props)

    modal.modalData = data
    _updateStore(modal)
    return modal
}

function removeModal(id) {
    modals = modals.filter(modal => modal.id !== id)
    _updateModalsInStore(modals)
}

function _updateStore(modal) {
    store.dispatch({type: SET_MODAL, modal })
}

function _updateModalsInStore() {
    store.dispatch({type: SET_MODALS, modals })
}

function getModalData(id, modalType, props) {
    try {
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
        return newModalData
    }
    catch {
        console.error('Can\'t update modal data')
    }
}