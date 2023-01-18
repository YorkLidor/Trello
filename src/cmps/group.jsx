import { useState } from "react";
import { GroupFooter } from "./group-footer";
import { GroupHeader } from "./group-header";
import { TaskList } from "./task-list";

export function Group() {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    return <li className="group-item-container">
        <div className="group-item">

            <GroupHeader />

            <TaskList />

            {isAddCardOpen && <textarea className="add-card-textarea" placeholder="Enter a title for this card..."></textarea>}

            <GroupFooter isAddCardOpen={isAddCardOpen} setIsAddCardOpen={setIsAddCardOpen}/>
        </div>
    </li>
}