import { LabelsPicker } from "./labels-picker"
import { AttachmentModal } from "./attachment-modal"

import { useSelector } from "react-redux"
import { BoardCreator } from "./board-creator"
import { AttachmentEditModal } from "./attachment-edit-modal"

export const MODAL_LABELS = 'MODAL_LABELS'
export const MODAL_ATTACH = 'MODAL_ATTACH'
export const MODAL_ATTACH_EDIT = 'MODAL_ATTACH_EDIT'
export const BOARD_CREATOR = 'BOARD_CREATOR'

export function Modal({ cmpProps, cmpType, className }) {
    const isModalOpen = useSelector((storeState) => storeState.appModule.app.isModalOpen)

    return isModalOpen && <div className={className ? className : 'modal'}>
        <GetCmp cmpProps={cmpProps} cmpType={cmpType} />
    </div>
}

function GetCmp({ cmpProps, cmpType }) {
    switch (cmpType) {
        case MODAL_LABELS:
            return <LabelsPicker cmpProps={cmpProps} />
        case MODAL_ATTACH:
            return <AttachmentModal cmpProps={cmpProps} />
        case BOARD_CREATOR:
            return <BoardCreator {...cmpProps} />
        case MODAL_ATTACH_EDIT:
            return <AttachmentEditModal cmpProps={cmpProps} />
        default:
            return ''
    }
    return ''
}