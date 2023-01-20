import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Group } from "./group";
import { boardService } from "../services/board.service";
import { loadBoards, saveBoard, setBoard as setset } from "../store/board.actions";
import { GroupAdd } from "./group-add";
import { utilService } from "../services/util.service";

export function GroupList({ groups, board }) {
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
    const setBoard = []

    async function onAddGroup(ev) {
        ev.preventDefault()
        try {
            board.groups.push(groupToEdit)
            await saveBoard({ ...board })
            setset({ ...board })
            setGroupToEdit(boardService.getEmptyGroup())
        } catch (err) {
            console.log('err', err)
        }
    }

    function handleChange(ev) {
        const { value } = ev.target
        setGroupToEdit({ ...groupToEdit, title: value })
    }

    function onDragEnd({ source, destination, type }) {
        if (type === 'task-list') {
            const groupToEdit = board.groups.find(group => group.id === destination.droppableId)
            const groupFrom = board.groups.find(group => group.id === source.droppableId)
            const tasks = groupToEdit.tasks

            if (source.droppableId === destination.droppableId) {
                groupToEdit.tasks = utilService.reorder(tasks, source.index, destination.index)
                setset({ ...board })
                saveBoard({ ...board })
            } else {
                const deletedTask = groupFrom.tasks.splice(source.index, 1)
                groupToEdit.tasks.push(...deletedTask)
                groupToEdit.tasks = utilService.reorder(tasks, tasks.length - 1, destination.index)
                setset({ ...board })
                saveBoard({ ...board })
            }
        } else {
            board.groups = utilService.reorder(board.groups, source.index, destination.index)
            setset({ ...board })
            saveBoard({ ...board })
        }
    }

    return <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId={board._id} direction='horizontal' type="grooup-list">
            {provided =>
                <ul className="group-list-container" ref={provided.innerRef}>
                    {
                        groups.map((group, idx) =>
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
                                            setBoard={setBoard}
                                            board={board}
                                            idx={idx}
                                        />
                                    </div>
                                }
                            </Draggable >
                        )}
                    {provided.placeholder}
                    <GroupAdd
                        onAddGroup={onAddGroup}
                        handleChange={handleChange}
                        groupToEdit={groupToEdit}
                    />
                </ul>
            }
        </Droppable >
    </DragDropContext>
}