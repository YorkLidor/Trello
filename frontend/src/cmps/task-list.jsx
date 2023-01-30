import { Draggable } from "react-beautiful-dnd";
import { TaskAdd } from "./task-add";
import { TaskPreview } from "./task-preview";

export function TaskList({ group, provided, isAddCardOpen, setIsAddCardOpen }) {

    return <ul
        className="task-list"

    >
        {group?.tasks?.map((task, idx) =>
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
                            task={task}
                            groupId={group.id}
                            isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                        />
                    </div>
                }

            </Draggable>
        )}
        {provided.placeholder}


        {<TaskAdd group={group} isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen} />}
    </ul>


}