import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { utilService } from "../services/util.service";
import { TaskPreview } from "./task-preview";

export function TaskList({ group, boardId }) {

    return <Droppable droppableId={group.id} direction="vertical" type="task-list">
        {(provided, snapshot) =>
            <ul
                className="task-list"
                ref={provided.innerRef}
            >

                {group.tasks.map((task, idx) =>
                    <Draggable
                        draggableId={task.id}
                        key={task.id}
                        index={idx}
                    >
                        {(provided, snapshot) =>
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <TaskPreview
                                    boardId={boardId}
                                    task={task}
                                    group={group}
                                    isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                                />
                            </div>
                        }
                    </Draggable>
                )}
                {provided.placeholder}
                {(snapshot.isDraggingOver) &&
                    <div
                        className="task-preview-container"
                    />}
            </ul>
        }
    </Droppable >

}