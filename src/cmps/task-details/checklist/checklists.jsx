import { boardService } from '../../../services/board.service'
import { getActivityText, saveTask, SET_CHECKLIST_TITLE } from '../../../store/actions/board.actions'
import { Checklist } from './checklist-box'

export function Checklists({ user, groupId, task , onToggleModal }) {

    async function onSaveChecklist(checklist) {
        await saveTask(groupId, task, boardService.getActivity(user, task, `${getActivityText(SET_CHECKLIST_TITLE)} ${checklist.title} `))
    }

    return task.checklists?.map(checklist => <Checklist key={checklist.id} task={task} checklist={checklist} onSaveChecklist={onSaveChecklist} onToggleModal={onToggleModal} />)
}