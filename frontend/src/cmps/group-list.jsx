import { useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";

import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { dndService } from "../services/dnd.service";

import { saveBoard, setBoard } from "../store/actions/board.actions"

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { GroupAdd } from "./group-add";
import { Group } from "./group";
import { socketService, SOCKET_EMIT_SEND_GROUP, SOCKET_EMIT_UPDATE_GROUP, SOCKET_EVENT_UPDATE_GROUP } from "../services/socket.service";
import { useEffect } from "react";

export function GroupList({ onToggleModal }) {
    const board = useSelector(state => state.boardModule.board)
    const [groupToEdit, setGroupToEdit, handleChange] = useForm(boardService.getEmptyGroup())

    useEffect(() => {
        socketService.on(SOCKET_EVENT_UPDATE_GROUP, onUpdateGroup)

        return () => socketService.off(SOCKET_EVENT_UPDATE_GROUP, onUpdateGroup)
    }, [])

    function onUpdateGroup(group) {
        board.groups = group
        setBoard({ ...board })
    }

    async function onAddGroup(ev) {
        ev.preventDefault()
        if (!groupToEdit.title) throw new Error('Must enter title!')
        try {
            board.groups.push(groupToEdit)
            await setBoard(board)
            socketService.emit(SOCKET_EMIT_SEND_GROUP, groupToEdit)
            setGroupToEdit(boardService.getEmptyGroup())
        } catch (err) {
            console.log('err', err)
            throw err
        }
    }

    async function onRemoveGroup(groupId) {
        try {

            board.groups = board.groups.filter((group) => group.id !== groupId)
            await saveBoard(board)
        } catch (err) {
            console.error('Cannot remove group', err)
        }
    }

    async function onCopyGroup(board, groupId) {
        if (window.confirm("Are you sure?") === false) return
        try {
            const boardToSave = await boardService.copyGroup(board, groupId)
            await saveBoard(boardToSave)
        } catch (err) {
            console.error('Cannot copy group', err)
        }
    }

    function onDragEnd({ source, destination, type }) {
        if (!destination) return
        const { droppableId: destinationId, index: destinationIdx } = destination
        const { droppableId: sourceId, index: sourceIdx } = source


        if (type === 'task-list') {
            const sourceGroup = boardService.getGroupById(board, destinationId)
            const destinationGroup = boardService.getGroupById(board, sourceId)
            const tasks = sourceGroup.tasks

            if (sourceId === destinationId) {
                sourceGroup.tasks = utilService.reorder(tasks, sourceIdx, destinationIdx)
            } else {
                sourceGroup.tasks = dndService.swapItemBetweenLists(destinationGroup, sourceGroup, sourceIdx, destinationIdx)
            }
        } else if (type === 'group-list') {
            board.groups = utilService.reorder(board.groups, sourceIdx, destinationIdx)
        }
        socketService.emit(SOCKET_EMIT_UPDATE_GROUP, board.groups)
        setBoard(board)
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
                                            onToggleModal={onToggleModal}
                                            provided={provided}
                                            key={group.id}
                                            group={group}
                                            board={board}
                                            onRemoveGroup={onRemoveGroup}
                                            onCopyGroup={onCopyGroup}
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