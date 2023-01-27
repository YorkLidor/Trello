import { boardService } from '../../../services/board.service'

import { saveTask } from '../../../store/actions/board.actions'

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { AttachmentPreview } from "./attachment-preview"
import { onRemoveAttachment } from '../../../store/actions/board.actions'
import { utilService } from '../../../services/util.service'

export function AttachmentList({ task, toggleModal, user, boardId, groupId }) {


    function removeAttachment(ev, attachment) {
        ev.stopPropagation()
        onRemoveAttachment(user, boardId, groupId, task, attachment)
    }

    async function onTaskUpdateCover(attachment) {
        task = boardService.setCoverImage(task, attachment)
        const action = attachment ? `${user.fullname} changed task ${task.title} cover to attachment ${attachment?.filename}` : `${user.fullname} removed task ${task.title} cover`
        await saveTask(boardId, groupId, task, boardService.getActivity(user, task, action))
    }

    async function onDragEnd({ source, destination }) {
        if (!destination) return
        const { index: destinationIdx } = destination
        const { index: sourceIdx } = source
        console.log('sourceIdx:', sourceIdx, destinationIdx)
        const attachments = utilService.reorder(task.attachments, sourceIdx, destinationIdx)
        task.attachments = attachments
        console.log('task.:', attachments)
        const action = `${user.fullname} changed task ${task.title} location`
        saveTask(boardId, groupId, { ...task }, boardService.getActivity(user, task, action))
    }

    return task?.attachments?.length > 0 && <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={task.id} type="attachment">
            {provided =>
                <ul className="attachment-list" ref={provided.innerRef}>
                    {task.attachments.map((attachment, idx) =>
                        <Draggable
                            draggableId={attachment.id + 30}
                            key={attachment.id}
                            index={idx}
                        >
                            {provided =>
                                <li
                                    className="attachment-preview-list"
                                    key={attachment.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <AttachmentPreview task={task} attachment={attachment} toggleModal={toggleModal} removeAttachment={removeAttachment} onTaskUpdateCover={onTaskUpdateCover} />
                                </li>}
                        </Draggable >
                    )}
                    {provided.placeholder}
                </ul>}
        </Droppable>
    </DragDropContext >
}
