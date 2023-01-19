import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { utilService } from "../services/util.service";
import { TaskPreview } from "./task-preview";

export function TaskList({ group, boardId }) {
    const [tasks, setTasks] = useState(group.tasks)

    function onEnd({ source, destination }) {
        setTasks(utilService.reorder(tasks, source.index, destination.index))

    }

    return <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="group-container">
            {provided =>
                <ul
                    className="task-list"
                    ref={provided.innerRef}
                >
                    {tasks.map((task, idx) =>
                        <Draggable
                            draggableId={task.id}
                            key={task.id}
                            index={idx}
                        >
                            {provided =>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >

                                    {console.log('task:', task, idx)}
                                    <TaskPreview
                                        boardId={boardId}
                                        task={task}
                                        group={group}

                                    />
                                </div>
                            }
                        </Draggable>
                    )}
                    {provided.placeholder}
                </ul>
            }
        </Droppable >
    </DragDropContext>
}