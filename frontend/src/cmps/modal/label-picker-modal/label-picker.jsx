import { useSelector } from 'react-redux'
import { useState } from 'react'

import { boardService } from '../../../services/board.service'

import { ModalHeader } from '../modal-header'
import { LabelPickerEditor } from './label-picker-editor'
import { LabelPickerDelete } from './label-picker-delete'
import { LabelPickerList } from './label-picker-list'
import { useRef } from 'react'

export const PAGE_LIST = 'PAGE_LIST'
export const PAGE_EDIT = 'PAGE_EDIT'
export const PAGE_DELETE = 'PAGE_DELETE'

export function LabelsPicker({ id, cmpProps }) {
    const { groupId, task } = cmpProps

    const board = useSelector((storeState) => storeState.boardModule.board)
    const member = useSelector((storeState) => storeState.userModule.user)
    const [modalPage, setModalPage] = useState(PAGE_LIST)

    let labelToEdit = useRef()
    const allowBack = modalPage !== PAGE_LIST

    // Triggers when modal header 'Back' button is clicked
    function modalGoBack() {
        if (modalPage === PAGE_EDIT) setModalPage(PAGE_LIST)
        if (modalPage === PAGE_DELETE) setModalPage(PAGE_EDIT)
    }

    // Triggers when label edit button is clicked on labels list CMP
    function onEditLabel(label = null) {
        try {
            labelToEdit.current = label ? label : boardService.getEmptyLabel()
            setModalPage(PAGE_EDIT)
        }
        catch (err) {
            console.error('Failed set label to edit')
        }
    }

    // Saving the label in board service
    async function onSaveLabel(label) {
        try {
            await boardService.saveBoardLabel(board, label)
        }
        catch {
            console.error('failed save label')
        }
        labelToEdit.current = boardService.getEmptyLabel()
        setModalPage(PAGE_LIST)
    }

    // Returns the header text of the modal, in according to cuurent modal page
    function _getPickerHeaderText() {
        try {
            switch (modalPage) {
                case PAGE_LIST:
                    return 'Labels'
                case PAGE_EDIT:
                    return labelToEdit.current?.id ? 'Edit label' : 'Create label'
                case PAGE_DELETE:
                    return 'Delete label'
                default:
                    break
            }
        }
        catch (err) {
            console.error('Failed resolve header text')
        }
    }

    // Returns props relevant to current modal page
    function _getProps() {
        try {
            switch (modalPage) {
                case PAGE_LIST:
                    return { member, boardId: board._id, task, groupId, onEditLabel, labels: board.labels, setModalPage }
                case PAGE_EDIT:
                    return { editorLabel: labelToEdit.current, onSaveLabel, setModalPage }
                case PAGE_DELETE:
                    return { board, labelId: labelToEdit.current.id, setModalPage, setModalPage }
                default:
                    break
            }
        }
        catch (err) {
            console.error('Failed resolve propls')
        }

    }

    return board.labels && <div className='modal-label-picker'>
        <ModalHeader id={id} onModalClickBack={modalGoBack} allowBack={allowBack} header={_getPickerHeaderText()} />

        <div className='label-picker-page'>
            {getDynamicModalPage(modalPage, _getProps())}
        </div>
    </div>
}


function getDynamicModalPage(modalPage, props) {
    try {
        switch (modalPage) {
            case PAGE_LIST:
                return <LabelPickerList {...props} />
            case PAGE_EDIT:
                return <LabelPickerEditor {...props} />
            case PAGE_DELETE:
                return <LabelPickerDelete {...props} />
            default:
                break
        }
    }
    catch (err) {
        console.error('Failed resolve page componnent')
    }
}