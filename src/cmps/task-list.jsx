import { TaskPreview } from "./task-preview";

export function TaskList({ tasks }) {


    return <ul className="task-list">
        {
            tasks.map((task) => <TaskPreview task={task} key={task.id} />)
        }
    </ul>
}