import { useState } from "react"
import { Droppable } from "react-beautiful-dnd"

import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, board, provided, onRemoveGroup, isDragging,onToggleModal }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    return <Droppable droppableId={group.id} direction="vertical" type="task-list">
        {prov =>
            <li className={`group-item-container ${isDragging && 'is-dragging'}`} ref={prov.innerRef} >
                <div className="group-item">
                    <div {...provided.dragHandleProps}>
                        <GroupHeader group={group} board={board} onRemoveGroup={onRemoveGroup} onToggleModal={onToggleModal} />
                    </div>
                    <TaskList boardId={board._id} group={group} provided={prov} isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen} />
                    {<GroupFooter boardId={board._id} group={group} isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen} />}
                </div>
            </li>
        }
    </Droppable >
}