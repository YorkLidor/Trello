import { useSelector } from 'react-redux'
import { boardService } from '../../../services/board.service'
import { saveTask } from '../../../store/actions/board.actions'
import { Checklist } from './checklist-box'

export function Checklists({ user, groupId, task }) {
    const board = useSelector((storeState) => storeState.boardModule.board)

    async function onSaveChecklist(checklist) {
        console.log(task, checklist)
        await saveTask(board._id, groupId, task, boardService.getActivity(user, task, `${user.fullname} has edited the checklist ${checklist.title} title`))
    }

    return task.checklists?.map(checklist => <Checklist key={checklist.id} task={task} checklist={checklist} onSaveChecklist={onSaveChecklist} />)
}