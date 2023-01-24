
import { boardService } from '../../../services/board.service'
import { PAGE_LIST } from './label-picker'

export function LabelPickerDelete({ board, labelId , setModalPage}) {

    // Delete label from board labels
    async function deleteLabel() {
        await boardService.removeBoardLabel(board, labelId)
        setModalPage(PAGE_LIST)
    }

    return <>
        <p className='delete-msg'>
            This will remove this label from all cards.
            There is no undo.
        </p>
        <button className='delete-label delete-page-btn' onClick={deleteLabel}>Delete</button>
    </>
}