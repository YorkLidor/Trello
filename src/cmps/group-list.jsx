import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Group } from "./group";
import { boardService } from "../services/board.service";
import { saveBoard, setBoard } from "../store/board.actions";
import { GroupAdd } from "./group-add";
import { utilService } from "../services/util.service";
import { useSelector } from "react-redux";

export function GroupList() {
    const board = useSelector(state => state.boardModule.board)
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())

    async function onAddGroup(ev) {
        ev.preventDefault()
        try {
            board.groups.push(groupToEdit)
            await saveBoard({ ...board })
            setBoard({ ...board })
            setGroupToEdit(boardService.getEmptyGroup())
        } catch (err) {
            console.log('err', err)
        }
    }

    async function onRemoveGroup(groupId) {
        try {
            board.groups = board.groups.filter((group) => group.id !== groupId)
            await saveBoard({ ...board })
        } catch (err) {
            console.error('Cannot remove group', err)
        }
    }

    function handleChange(ev) {
        const { value } = ev.target
        setGroupToEdit({ ...groupToEdit, title: value })
    }

    function onDragEnd({ source, destination, type }) {
        if (!destination) return

        if (type === 'task-list') {
            const groupToEdit = board.groups.find(group => group.id === destination.droppableId)
            const groupFrom = board.groups.find(group => group.id === source.droppableId)
            const tasks = groupToEdit.tasks

            if (source.droppableId === destination.droppableId) {
                groupToEdit.tasks = utilService.reorder(tasks, source.index, destination.index)
            } else {
                const deletedTask = groupFrom.tasks.splice(source.index, 1)
                groupToEdit.tasks.push(...deletedTask)
                groupToEdit.tasks = utilService.reorder(tasks, tasks.length - 1, destination.index)
            }
        } else {
            board.groups = utilService.reorder(board.groups, source.index, destination.index)
        }
        setBoard({ ...board })
        saveBoard({ ...board })
    }

    return <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId={board._id} direction='horizontal' type="grooup-list">
            {provided =>
                <ul className="group-list-container" ref={provided.innerRef}>
                    {
                        board.groups.map((group, idx) =>
                            <Draggable
                                draggableId={group.id}
                                key={group.id}
                                index={idx}
                            >
                                {provided =>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <Group
                                            provided={provided}
                                            key={group.id}
                                            group={group}
                                            board={board}
                                            onRemoveGroup={onRemoveGroup}
                                            idx={idx}
                                        />
                                    </div>
                                }
                            </Draggable >
                        )}
                    {provided.placeholder}
                    <GroupAdd onAddGroup={onAddGroup} handleChange={handleChange} groupToEdit={groupToEdit} />
                </ul>
            }
        </Droppable >
    </DragDropContext>
}