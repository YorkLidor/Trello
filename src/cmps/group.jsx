import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, setBoard, board }) {


    return <li className="group-item-container">
        <div className="group-item">

            <GroupHeader group={group} setBoard={setBoard} board={board} />

            <TaskList boardId={board._id} group={group} />

            <GroupFooter boardId={board._id} group={group} setBoard={setBoard}/>
        </div>
    </li>
}