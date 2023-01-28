import { LabelsPicker } from "./label-picker-modal/label-picker"
import { AttachmentModal } from "./attachment-modal"
import { BoardCreator } from "./board-creator"
import { AttachmentEditModal } from "./attachment-edit-modal"
import { AttachmentView } from "../task-details/attachment/attachment-view"
import { MemberPicker } from "./member-picker-modal"
import { MemberModal } from "./member-modal"
import { TaskQuickEdit } from "./task-quick-edit-modal"
import { DateModal } from "./date-modal"
import { CoverModal } from "./cover-modal"
import { ChecklistModal } from "./checklist-modal"
import { DeleteChecklistModal } from './checklist-delete-modal'
import { TodoModal } from './checklist-todo-modal'
import { GroupQuickEdit } from "../group-quick-edit"
import { UserQuickMenu } from "../user-quick-menu"
import { DeleteCommentModal } from "./comment-delete-modal"

export const MODAL_LABELS = 'MODAL_LABELS'
export const MODAL_ATTACH = 'MODAL_ATTACH'
export const MODAL_ATTACH_EDIT = 'MODAL_ATTACH_EDIT'
export const MODAL_ATTACH_OPEN = 'MODAL_ATTACH_OPEN'
export const BOARD_CREATOR = 'BOARD_CREATOR'
export const MODAL_MEMBERS = 'MODAL_MEMBERS'
export const MODAL_MEMBER_OPEN = 'MODAL_MEMBER_OPEN'
export const MODAL_TASK_QUICK_EDIT = 'MODAL_TASK_QUICK_EDIT'
export const MODAL_TASK_DATE = 'MODAL_TASK_DATE'
export const MODAL_TASK_COVER = 'MODAL_TASK_COVER'
export const MODAL_CHECKLIST = 'MODAL_CHECKLIST'
export const MODAL_CHECKLIST_DELETE = 'MODAL_CHECKLIST_DELETE'
export const MODAL_TODO = 'MODAL_TODO'
export const MODAL_GROUP_QUICK_EDIT = 'MODAL_GROUP_QUICK_EDIT'
export const USER_QUICK_MENU = 'USER_QUICK_MENU'
export const MODAL_REMOVE_COMMENT = 'MODAL_REMOVE_COMMENT'


export function Modal({ modal, cmpProps, cmpType, className }) {
    console.log('cmpProps:', cmpProps)
    return modal.isOpen && <div className={className ? className : 'modal'}>
        <ModalCmp id={modal.id} cmpProps={cmpProps} cmpType={cmpType} />
    </div>
}

function ModalCmp({ id, cmpProps, cmpType }) {
    switch (cmpType) {
        case MODAL_LABELS:
            return <LabelsPicker cmpProps={cmpProps} id={id} />
        case MODAL_ATTACH:
            return <AttachmentModal cmpProps={cmpProps} id={id} />
        case BOARD_CREATOR:
            return <BoardCreator cmpProps={cmpProps} id={id} />
        case MODAL_ATTACH_EDIT:
            return <AttachmentEditModal cmpProps={cmpProps} id={id} />
        case MODAL_ATTACH_OPEN:
            return <AttachmentView cmpProps={cmpProps} id={id} />
        case MODAL_MEMBERS:
            return <MemberPicker cmpProps={cmpProps} id={id} />
        case MODAL_MEMBER_OPEN:
            return <MemberModal cmpProps={cmpProps} id={id} />
        case MODAL_TASK_QUICK_EDIT:
            return <TaskQuickEdit cmpProps={cmpProps} id={id} />
        case MODAL_TASK_DATE:
            return <DateModal cmpProps={cmpProps} id={id} />
        case MODAL_TASK_COVER:
            return <CoverModal cmpProps={cmpProps} id={id} />
        case MODAL_CHECKLIST:
            return <ChecklistModal cmpProps={cmpProps} id={id} />
        case MODAL_CHECKLIST_DELETE:
            return <DeleteChecklistModal cmpProps={cmpProps} id={id} />
        case MODAL_TODO:
            return <TodoModal cmpProps={cmpProps} id={id} />
        case MODAL_GROUP_QUICK_EDIT:
            return <GroupQuickEdit {...cmpProps} id={id} />
        case USER_QUICK_MENU:
            return <UserQuickMenu {...cmpProps} id={id}/>
        case MODAL_REMOVE_COMMENT:
            return <DeleteCommentModal {...cmpProps} id={id} />
        default:
            return ''
    }
}