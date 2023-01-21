import { LabelsPicker } from "./labels-picker"
import { AttachmentModal } from "./attachment-modal"

import { useSelector } from "react-redux"
import { BoardCreator } from "./board-creator"

export const MODAL_LABELS = 'MODAL_LABELS'
export const MODAL_ATTACH = 'MODAL_ATTACH'
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
        default:
            return ''
    }
    return ''
}