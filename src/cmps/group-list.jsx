import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Group } from "./group";
import { boardService } from "../services/board.service";
import { loadBoards, saveBoard, setBoard as setset } from "../store/board.actions";
import { GroupAdd } from "./group-add";
import { utilService } from "../services/util.service";

export function GroupList({ groups, board }) {
    const [stateGroups, setGroups] = useState(groups)
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
    const setBoard = []

    console.log('render')

    async function onAddGroup(ev) {
        ev.preventDefault()
        try {
            board.groups.push(groupToEdit)
            await saveBoard({ ...board })
        } catch (err) {
            console.log('err', err)
        }
    }

    function handleChange(ev) {
        const { value } = ev.target
        setGroupToEdit({ ...groupToEdit, title: value })
    }

    function onEnd({ source, destination }) {
        console.log('source:', source)
        console.log('destination:', destination)
        const groupToEdit = board.groups.find((group, idx) => group.id === destination.droppableId)
        const groupFrom = board.groups.find((group)=> group.id === source.droppableId)
        const tasks = groupToEdit.tasks

        if (source.droppableId === destination.droppableId) {
            groupToEdit.tasks = utilService.reorder(tasks, source.index, destination.index)
            setGroups([...board.groups])
            setset({ ...board })
            saveBoard({ ...board })
        } else {
            const deletedTask = groupFrom.tasks.splice(source.index, 1)
            groupToEdit.tasks.push(...deletedTask)
            groupToEdit.tasks = utilService.reorder(tasks, tasks.length -1, destination.index)
            console.log('deletedTask:', deletedTask)
            console.log('groupToEdit.tasks:', groupToEdit.tasks)
            setset({ ...board })
            saveBoard({ ...board })
        }

    }

    return <DragDropContext onDragEnd={onEnd}>
        <ul className="group-list-container">
            {
                stateGroups.map((group) =>
                    <Group
                        key={group.id}
                        group={group}
                        setBoard={setBoard}
                        board={board}
                    />)
            }

            <GroupAdd onAddGroup={onAddGroup} handleChange={handleChange} />
        </ul>
    </DragDropContext>
}