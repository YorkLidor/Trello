import { boardService } from '../../../services/board.service'

import { getActivityText, saveTask, REMOVE_COVER, CHANGE_COVER_ATTACH, CHANGE_TASK_LOCATION } from '../../../store/actions/board.actions'

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { AttachmentPreview } from "./attachment-preview"
import { onRemoveAttachment } from '../../../store/actions/board.actions'
import { utilService } from '../../../services/util.service'

export function AttachmentList({ task, toggleModal, user, boardId, groupId }) {


    function removeAttachment(ev, attachment) {
        try {
            ev.stopPropagation()
            onRemoveAttachment(user, boardId, groupId, task, attachment)
        }
        catch (err) {
            console.error('Failed remove attachment')
        }
    }

    async function onTaskUpdateCover(attachment) {
        try {
            task = boardService.setCoverImage(task, attachment)
            const action = attachment ? `${getActivityText(CHANGE_COVER_ATTACH)} ${attachment?.filename}` : `${getActivityText(REMOVE_COVER)}`
            await saveTask(groupId, task, boardService.getActivity(user, task, action))
        }
        catch (error) {
            console.error('Failed update task cover')
        }
    }

    async function onDragEnd({ source, destination }) {
        try {
            if (!destination) return
            const { index: destinationIdx } = destination
            const { index: sourceIdx } = source
            const attachments = utilService.reorder(task.attachments, sourceIdx, destinationIdx)
            task.attachments = attachments

            const action = `${getActivityText(CHANGE_TASK_LOCATION)} ${task.title}`
            saveTask(groupId, { ...task }, boardService.getActivity(user, task, action))
        }
        catch (err) {
            console.error('Failed drag attachment')
        }
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
