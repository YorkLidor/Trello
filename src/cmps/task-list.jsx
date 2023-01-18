import { TaskPreview } from "./task-preview";

export function TaskList() {

    return <ul className="task-list">
        <TaskPreview />
        <TaskPreview />
    </ul>
}