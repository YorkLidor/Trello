import { store } from "../store/store"
import { utilService } from "./util.service"
import { SET_MODALS, SET_MODAL } from "../store/reducers/app.reducer"

import { MODAL_ATTACH_OPEN, MODAL_TASK_QUICK_EDIT, MODAL_TASK_DATE } from '../cmps/modal/modal'

export const modalService = {
    addNewModal,
    getModalById,
    openModal,
    closeModal,
    toggleModal,
    setModalData,
    removeModal
}

function addNewModal(modals) {
    try {

        const newModal = {
            id: 'modal-' + utilService.makeId(),
            isOpen: false,
            modalData: null
        }
        modals.unshift(newModal)
        _updateModalsInStore(modals)
        return newModal
    }
    catch (error) {
        console.error('Failed to add modal')
    }
}

function getModalById(modals, id) {
    try {
        return modals.find(modal => modal.id === id)
    }
    catch (error) {
        console.error('Failed find modal')
    }
}

function openModal(modals, id) {
    try {

        const modal = modals.find(modal => modal.id === id)
        if (!modal) throw new Error('Modal not found')

        modal.isOpen = true
        _updateStore(modal)
    }
    catch (error) {
        console.error('Failed to open modal')
    }
}

function closeModal(modals, id) {
    try {
        const modal = modals.find(modal => modal.id === id)
        if (!modal) throw new Error('Modal not found')

        modal.isOpen = false
        _updateStore(modal)
    }
    catch (err) {
        console.error('Failed close modal')
    }
}

function toggleModal(modals, id) {
    try {

        const modal = modals.find(modal => modal.id === id)
        if (!modal) throw new Error('Modal not found')

        modal.isOpen = !modal.isOpen
        _updateStore(modal)
    }
    catch (err) {
        console.error('Cannot toggle modal')
    }
}


function removeModal(modals, id) {
    try {

        modals = modals.filter(modal => modal.id !== id)
        _updateModalsInStore(modals)
    }
    catch (err) {
        console.error('Cannot remove modal')
    }
}

function _updateStore(modal) {
    try {
        store.dispatch({ type: SET_MODAL, modal })
    }
    catch(err) {
        console.error('Cannot update store')
    }
}

function _updateModalsInStore(modals) {
    try {
        store.dispatch({ type: SET_MODALS, modals })
    }
    catch(err) {
        console.error('Cannot update modal in store')
    }
}

function setModalData(modals, id, modalType, props) {
    try {
        const modal = modals.find(modal => modal.id === id)
        if (!modal) throw new Error('Modal not found')

        const data = _getModalData(modalType, props)

        modal.modalData = data
        _updateStore(modal)
        return modal
    }
    catch (err) {
        console.error('Cannot set modal data')
    }
}

function _getModalData(modalType, props) {
    try {
        let newModalData

        switch (modalType) {
            case MODAL_ATTACH_OPEN:
                newModalData = {
                    className: 'attach-viewer-modal',
                    cmpType: MODAL_ATTACH_OPEN,
                    props
                }
                break
            case MODAL_TASK_QUICK_EDIT:
                newModalData = {
                    className: 'task-quick-edit-container',
                    cmpType: MODAL_TASK_QUICK_EDIT,
                    props
                }
                break;
            case MODAL_TASK_DATE:
                newModalData = {
                    className: 'modal date-modal',
                    cmpType: MODAL_TASK_DATE,
                    props
                }
                break;
            default:
                newModalData = {
                    className: 'modal',
                    cmpType: modalType,
                    props
                }
                break;
        }
        return newModalData
    }
    catch {
        console.error('Can\'t update modal data')
    }
}