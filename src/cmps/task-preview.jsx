import { useNavigate } from "react-router-dom"
import { LabelPicker } from "./lable-picker"

export function TaskPreview({ task, group, boardId }) {
    const groupId = group.id
    const coverColor = task?.style?.bgColor
    const navigate = useNavigate()

    return <li className="task-preview-container" onClick={() => navigate(`/card/${boardId}/${groupId}/${task.id}`)}>

        {coverColor &&
            <header className="cover-color" style={{ background: coverColor }}></header>
        }

        {task?.labelIds?.length &&
            <LabelPicker labelIds={task.labelIds} onUpdate={''} />
        }

        <section className="task-body">
            <p>{task.title}</p>
        </section>

    </li>
}