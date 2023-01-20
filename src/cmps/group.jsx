import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, setBoard, board, provided }) {


    return <li className="group-item-container">
        
                    <div className="group-item">
                        <div {...provided.dragHandleProps}>
                            <GroupHeader group={group} setBoard={setBoard} board={board} />
                        </div>
                        <TaskList boardId={board._id} group={group} />
                        <GroupFooter boardId={board._id} group={group} setBoard={setBoard} />
                    </div>
                
    </li>
}