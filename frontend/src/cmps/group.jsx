import { useState } from "react"
import { Droppable } from "react-beautiful-dnd"
import { SOCKET_EVENT_ADD_TASK } from "../services/socket.service"

import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, board, provided, onRemoveGroup, isDragging, onToggleModal, onCopyGroup }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)
    const so = SOCKET_EVENT_ADD_TASK

    return <Droppable droppableId={group.id} direction="vertical" type="task-list">
        {prov =>
            <li className={`group-item-container ${isDragging && 'is-dragging'}`} ref={prov.innerRef} >
                <div className="group-item">
                    <div {...provided.dragHandleProps}>
                        <GroupHeader group={group} board={board} onRemoveGroup={onRemoveGroup} onToggleModal={onToggleModal} onCopyGroup={onCopyGroup} />
                    </div>
                    <TaskList boardId={board._id} group={group} provided={prov} isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen} />
                    {<GroupFooter boardId={board._id} group={group} isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen} />}
                </div>
            </li>
        }
    </Droppable >
}