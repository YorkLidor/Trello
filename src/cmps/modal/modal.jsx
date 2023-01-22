import { LabelsPicker } from "./labels-picker"
import { AttachmentModal } from "./attachment-modal"

import { useSelector } from "react-redux"
import { BoardCreator } from "../board-creator"

import { AttachmentEditModal } from "./attachment-edit-modal"
import { AttachmentView } from "../task-details/attachment/attachment-view"
import { MemberPicker } from "./member-picker-modal"

export const MODAL_LABELS = 'MODAL_LABELS'
export const MODAL_ATTACH = 'MODAL_ATTACH'
export const MODAL_ATTACH_EDIT = 'MODAL_ATTACH_EDIT'
export const MODAL_ATTACH_OPEN = 'MODAL_ATTACH_OPEN'
export const BOARD_CREATOR = 'BOARD_CREATOR'
export const MODAL_MEMBERS = 'MODAL_MEMBERS'
export const MODAL_MEMBER_OPEN = 'MODAL_MEMBER_OPEN'

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
        case MODAL_ATTACH_OPEN:
            return <AttachmentView cmpProps={cmpProps} />
        case MODAL_MEMBERS:
            return <MemberPicker cmpProps={cmpProps} />
        default:
            return ''
    }
    return ''
}