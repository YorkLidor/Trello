import { useState } from "react"
import { GroupFooter } from "./group-footer"
import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"

export function Group({ group, setBoard, board }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    return <li className="group-item-container">
        <div className="group-item">

            <GroupHeader group={group} setBoard={setBoard} board={board} />

            <TaskList boardId={board._id} group={group} />

            {isAddCardOpen && <textarea
                className="add-card-textarea"
                placeholder="Enter a title for this card..." 
                />}

            <GroupFooter isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen} />
        </div>
    </li>
}