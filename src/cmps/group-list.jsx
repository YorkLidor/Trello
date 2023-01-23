import { useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";

import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { dndService } from "../services/dnd.service";

import { saveBoard, setBoard } from "../store/actions/board.actions"

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GroupAdd } from "./group-add";
import { Group } from "./group";

export function GroupList() {
    const board = useSelector(state => state.boardModule.board)
    const [groupToEdit, setGroupToEdit, handleChange] = useForm(boardService.getEmptyGroup())

    async function onAddGroup(ev) {
        ev.preventDefault()
        if (!groupToEdit.title) throw new Error('Must enter title!')
        try {
            board.groups.push(groupToEdit)
            await saveBoard(board)
            setGroupToEdit(boardService.getEmptyGroup())
        } catch (err) {
            console.log('err', err)
            throw err
        }
    }

    async function onRemoveGroup(groupId) {
        if (window.confirm("Are you sure?") === false) return
        try {
            board.groups = board.groups.filter((group) => group.id !== groupId)
            await saveBoard(board)
        } catch (err) {
            console.error('Cannot remove group', err)
        }
    }

    function onDragEnd({ source, destination, type }) {
        if (!destination) return
        const { droppableId: destinationId, index: destinationIdx } = destination
        const { droppableId: sourceId, index: sourceIdx } = source


        if (type === 'task-list') {
            const sourceGroups = boardService.getGroupById(board, destinationId)
            const destinationGroups = boardService.getGroupById(board, sourceId)
            const tasks = sourceGroups.tasks

            if (sourceId === destinationId) {
                sourceGroups.tasks = utilService.reorder(tasks, sourceIdx, destinationIdx)
            } else {
                sourceGroups.tasks = dndService.swapItemBetweenLists(destinationGroups, sourceGroups, sourceIdx, destinationIdx)
            }
        } else if (type === 'group-list') {
            board.groups = utilService.reorder(board.groups, sourceIdx, destinationIdx)
        }
        setBoard(board)
        saveBoard(board)
    }

    return <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId={board._id} direction='horizontal' type="group-list">
            {provided =>
                <ul className="group-list-container" ref={provided.innerRef}>
                    {
                        board.groups.map((group, idx) =>
                            <Draggable
                                draggableId={group.id}
                                key={group.id}
                                index={idx}
                            >
                                {(provided, snapshot) =>
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
                                            isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
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