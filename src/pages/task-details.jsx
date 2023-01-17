import { useState } from "react"

export function TaskDetails(){
    const task = {
        "id": "c103",
        "title": "Do that",
        "archivedAt": 1589983468418,
    }

    const [taskToEdit, setTaskToEdit] = useState(task)
    


    return taskToEdit && <div className="task-details">
        <div className="task-header">
            <h2 className="task-title">{task.title}</h2>
        </div>
        <div className="task-main-col flex">

        </div>
        <div className="window-sidebar flex">

        </div>
        
    </div>
}