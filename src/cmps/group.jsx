import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { saveBoard } from "../store/board.actions"
import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, board, provided, onRemoveGroup }) {

    return <Droppable droppableId={group.id} direction="vertical" type="task-list">
        {prov =>
            <li className="group-item-container" ref={prov.innerRef}>
                <div className="group-item">
                    <div {...provided.dragHandleProps}>
                        <GroupHeader group={group} board={board} onRemoveGroup={onRemoveGroup} />
                    </div>
                    <TaskList boardId={board._id} group={group} provided={prov} />
                    <GroupFooter boardId={board._id} group={group} />

                </div>

            </li>
        }
    </Droppable >
}