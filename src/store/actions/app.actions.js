import {
    MODAL_ATTACH,
    MODAL_LABELS,
    MODAL_ATTACH_EDIT,
    MODAL_ATTACH_OPEN,
    MODAL_MEMBERS,
    MODAL_MEMBER_OPEN,
    BOARD_CREATOR,
    MODAL_TASK_QUICK_EDIT
} from "../../cmps/modal/modal"
import { modalService } from "../../services/modal.service"


export function closeModal(id) {
    modalService.toggleModal(id)
}

export function toggleModal(id) {
    modalService.toggleModal(id)
}