import { SET_TASK_QUICK_EDIT } from "../store/reducers/app.reducer";
import { store } from "../store/store";
import { TaskPreview } from "./task-preview";


export function TaskQuickEdit({ task, groupId, pos }) {
    console.log('pos:', pos)
    const taskPos = { top: pos.top + 'px', left: pos.left + 'px' }

    function onCloseQuickEdit(ev) {
        store.dispatch({ type: SET_TASK_QUICK_EDIT, taskQuickEdit: null })
    }


    return <div className="quick-edit-container " onClick={onCloseQuickEdit} >
        <div className="task-preview-container quick-edit-task" style={taskPos}>
            <TaskPreview
                task={task}
                groupId={groupId}
            />
        </div>

    </div>

}
