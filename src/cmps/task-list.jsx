import { TaskPreview } from "./task-preview";

export function TaskList({ group , boardId}) {

    return <ul className="task-list">
        {
            group.tasks.map((task) => <TaskPreview boardId={boardId} task={task} key={task.id} group={group} />)
        }
    </ul>
}