import { TaskPreview } from "./task-preview";

export function TaskList({ group }) {

    return <ul className="task-list">
        {
            group.tasks.map((task) => <TaskPreview task={task} key={task.id} group={group} />)
        }
    </ul>
}