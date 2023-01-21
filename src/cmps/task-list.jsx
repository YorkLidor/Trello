import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { utilService } from "../services/util.service";
import { TaskPreview } from "./task-preview";

export function TaskList({ group, boardId }) {

    function getStyle(style, snapshot) {
        console.log('snapshot:', snapshot)
        if (!snapshot.isDraggingAnimation) {
            return style;
        }
        const { moveTo, curve, duration } = snapshot.isDraggingAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
        // add a bit of turn for fun
        const rotate = 'rotate(0.5turn)';

        // patching the existing style
        return {
            ...style,
            transform: `${translate} ${rotate}`,
            // slowing down the drop because we can
            transition: `all ${curve} ${duration + 1}s`,
        };
    }

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
                                className={`task-preview-drag-container ${snapshot.isDragging && 'is-dragging'}`}
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
                        className="placeholder"
                    />}
            </ul>
        }
    </Droppable >

}