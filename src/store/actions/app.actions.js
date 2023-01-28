import { modalService } from "../../services/modal.service"

export function closeModal(modals, id) {
    modalService.closeModal(modals, id)
}

export function toggleModal(modals, id) {

    modalService.toggleModal(modals, id)
}