import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, setBoard, board, provided }) {


    return <Droppable droppableId={group.id} direction="vertical" type="task-list">
        {prov =>
            <li className="group-item-container" ref={prov.innerRef}>
                <div className="group-item">
                    <div {...provided.dragHandleProps}>
                        <GroupHeader group={group} setBoard={setBoard} board={board} />
                    </div>
                    <TaskList boardId={board._id} group={group} provided={prov} />
                    <GroupFooter boardId={board._id} group={group} setBoard={setBoard} />

                </div>

            </li>
        }
    </Droppable >
}