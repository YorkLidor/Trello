import { useEffect, useRef, useState } from "react"
import { Droppable } from "react-beautiful-dnd"
import { SOCKET_EVENT_ADD_TASK } from "../services/socket.service"

import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, board, provided, onRemoveGroup, isDragging, onToggleModal, onCopyGroup }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)
<<<<<<< HEAD

=======
    const groupRef = useRef(null)
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    const handleClickOutside = (event) => {
        if (groupRef.current && !groupRef.current.contains(event.target)) {
            setIsAddCardOpen(false)
        }
    }

    const so = SOCKET_EVENT_ADD_TASK
>>>>>>> 606c5d3a2ff62f3857165df0c497425b2e5b67b6

    return <Droppable droppableId={group.id} direction="vertical" type="task-list">
        {prov =>
            <li className={`group-item-container ${isDragging && 'is-dragging'}`} ref={prov.innerRef} >
                <div className="group-item" ref={groupRef}>
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