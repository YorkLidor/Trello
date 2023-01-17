import { GroupFooter } from "./group-footer";
import { GroupHeader } from "./group-header";
import { TaskList } from "./task-list";

export function Group() {

    return <li className="group-item clean-list">
        <GroupHeader />

        <TaskList />

        <GroupFooter />
    </li>
}