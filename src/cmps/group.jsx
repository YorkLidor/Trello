import { GroupFooter } from "./group-footer";
import { GroupHeader } from "./group-header";
import { TaskList } from "./task-list";

export function Group() {

    return <li className="group-item-container">
        <div className="group-item">
            <GroupHeader />
            <TaskList />
            <GroupFooter />
        </div>
    </li>
}